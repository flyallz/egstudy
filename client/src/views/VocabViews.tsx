import { useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { speak, todayStr } from "../lib";
import { VOCAB_XP, type QuizQuestion, type VocabSet, type Word } from "../data/content";
import { buildVocabPractice } from "../data/catalog";
import { TimedQuiz, type AnswerDetail } from "./Quiz";
import { ResultPanel } from "./LessonViews";

type Mode = "cards" | "practice" | "dictation" | "pronounce" | "result";

interface ResultState {
  score: number;
  correct: number;
  total: number;
  xpGained: number | null;
  passed: boolean;
  interrupted: boolean;
  stars: number;
}

function maskWord(sentence: string, word: string): string {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return sentence.replace(new RegExp(`\\b${escaped}\\b`, "gi"), "____");
}

export function VocabSetView({
  set,
  cardsDone,
  deckKeys,
  onBack,
  initialMode = "cards",
  componentPassed,
}: {
  set: VocabSet;
  cardsDone: boolean;
  deckKeys: Set<string>;
  onBack: () => void;
  initialMode?: Mode;
  // 原站提取课的环节通过状态（练习 / 听写分别记在分项课时上，由 App 按完成记录算出）
  componentPassed?: { practice: boolean; dictation: boolean };
}) {
  const queryClient = useQueryClient();
  const ex = set.extracted;
  const [mode, setMode] = useState<Mode>(() => {
    if (initialMode === "cards" || !cardsDone) return "cards";
    if (ex && initialMode === "pronounce") return "cards"; // 发音待补，不直接进入
    if (ex && initialMode === "practice" && ex.practiceEasy.length === 0) return "cards";
    if (ex && initialMode === "dictation" && ex.dictationWords.length === 0) return "cards";
    if (ex && initialMode === "dictation" && !componentPassed?.practice) return "cards";
    return initialMode;
  });
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [localPracticePassed, setLocalPracticePassed] = useState(false);
  const [localDictPassed, setLocalDictPassed] = useState(false);
  const [resultFrom, setResultFrom] = useState<"practice" | "dictation">("practice");
  const [resultMaxXp, setResultMaxXp] = useState(VOCAB_XP);
  const practicePassed = (componentPassed?.practice ?? false) || localPracticePassed;
  const dictPassed = (componentPassed?.dictation ?? false) || localDictPassed;
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [frontCn, setFrontCn] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [recall, setRecall] = useState("");
  const [recallShown, setRecallShown] = useState(false);
  const [hint, setHint] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [video, setVideo] = useState(false);
  const [result, setResult] = useState<ResultState | null>(null);
  const [quizKey, setQuizKey] = useState(0);
  const completedRef = useRef(false);

  const card = set.words[cardIndex];
  const inDeck = card ? deckKeys.has(card.word.toLowerCase()) : false;

  const record = useMutation({
    mutationFn: async (args: {
      difficulty: string;
      total: number;
      correct: number;
      interrupted: boolean;
      detail: AnswerDetail[];
      maxXp: number;
      lessonId?: string; // 原站提取课的练习 / 听写记到分项课时上，XP 才能分项相加
      title?: string;
    }) =>
      await api.recordAttempt({
        lessonId: args.lessonId ?? set.id,
        kind: set.kind,
        title: args.title ?? set.titleCn,
        difficulty: args.difficulty,
        total: args.total,
        correct: args.correct,
        interrupted: args.interrupted,
        detail: args.detail,
        maxXp: args.maxXp,
        today: todayStr(),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });
  const mark = useMutation({
    mutationFn: async (status: "known" | "learning") =>
      await api.markWord({ wordKey: card?.word.toLowerCase() ?? "", status, today: todayStr() }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });
  const logCards = useMutation({
    mutationFn: async (amount: number) => await api.logActivity({ type: "cards", amount, today: todayStr() }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });
  const deckToggle = useMutation({
    mutationFn: async () => {
      if (!card) return;
      if (inDeck) return await api.removeFromReview({ wordKey: card.word.toLowerCase() });
      return await api.addToReview({
        word: card.word,
        phonetic: card.phonetic,
        pos: card.pos,
        meaning: card.meaning,
        example: card.example,
        exampleCn: card.exampleCn,
        source: "added",
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });

  const practiceQuestions = useMemo(() => buildVocabPractice(set), [set]);
  // 原站提取课听写：只用原站给定的 10 个词、按原顺序，不带文字解析
  const extractedDictation = useMemo<QuizQuestion[]>(
    () =>
      (ex?.dictationWords ?? []).map((w) => {
        const wd = set.words.find((x) => x.word.toLowerCase() === w.toLowerCase());
        return {
          q: "听发音，拼写单词。",
          options: [],
          answer: 0,
          answerText: wd?.word ?? w,
          explain: "",
          difficulty: "简单" as const,
          kind: "dictation" as const,
          noExplain: true,
        };
      }),
    [ex, set],
  );
  const dictationQuestions = useMemo(
    () =>
      set.words.map((wd) => ({
        q: `听发音并看提示，拼写单词（${wd.pos} ${wd.meaning}）`,
        options: [],
        answer: 0,
        answerText: wd.word,
        explain: `${wd.word} ${wd.phonetic} = ${wd.meaning}`,
        difficulty: "中等" as const,
        kind: "dictation" as const,
      })),
    [set],
  );

  const flip = () => {
    setFlipped((f) => {
      if (!f) {
        setSeen((prev) => {
          const next = new Set(prev);
          next.add(cardIndex);
          if (next.size >= set.words.length && !cardsDone && !completedRef.current) {
            completedRef.current = true;
            record.mutate({
              difficulty: "词卡",
              total: set.words.length,
              correct: set.words.length,
              interrupted: false,
              detail: [],
              maxXp: ex ? ex.cardsXp : VOCAB_XP,
            });
            logCards.mutate(set.words.length);
          }
          return next;
        });
      }
      return !f;
    });
  };

  const gotoCard = (i: number) => {
    setCardIndex(Math.max(0, Math.min(set.words.length - 1, i)));
    setFlipped(false);
    setRecall("");
    setRecallShown(false);
    setHint(false);
  };

  const markAndNext = (status: "known" | "learning") => {
    mark.mutate(status);
    if (cardIndex < set.words.length - 1) gotoCard(cardIndex + 1);
    else setFlipped(false);
  };

  const finishQuiz = (
    difficulty: string,
    maxXp: number,
    opts?: { lessonId?: string; title?: string; starOnPass?: boolean; from?: "practice" | "dictation" },
  ) => (correct: number, detail: AnswerDetail[], interrupted: boolean, total: number) => {
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passedNow = !interrupted && score >= 80;
    setResult({
      score,
      correct,
      total,
      xpGained: null,
      passed: passedNow,
      interrupted,
      stars: passedNow && opts?.starOnPass ? 1 : 0,
    });
    setResultFrom(opts?.from ?? "practice");
    setResultMaxXp(maxXp > 0 ? maxXp : VOCAB_XP);
    setMode("result");
    record.mutate(
      { difficulty, total, correct, interrupted, detail, maxXp, lessonId: opts?.lessonId, title: opts?.title },
      { onSuccess: (r) => setResult((prev) => (prev ? { ...prev, xpGained: r.xpGained } : prev)) },
    );
  };

  // 原站提取课：练习（简单档）与听写分别记账、分别给星，通过状态驱动下一步解锁
  const finishExtractedPractice = (correct: number, detail: AnswerDetail[], interrupted: boolean) => {
    if (!ex) return;
    const total = ex.practiceEasy.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    if (!interrupted && score >= 80) setLocalPracticePassed(true);
    finishQuiz("简单", ex.practiceXp, { lessonId: `${set.id}#practice`, starOnPass: true, from: "practice" })(
      correct,
      detail,
      interrupted,
      total,
    );
  };
  const finishExtractedDictation = (correct: number, detail: AnswerDetail[], interrupted: boolean) => {
    if (!ex) return;
    const total = extractedDictation.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    if (!interrupted && score >= 80) setLocalDictPassed(true);
    finishQuiz("简单", ex.dictationXp, {
      lessonId: `${set.id}#dictation`,
      title: `${set.titleCn} · 听写`,
      starOnPass: true,
      from: "dictation",
    })(correct, detail, interrupted, total);
  };

  const cardsUnlocked = cardsDone || completedRef.current;
  const modes: { key: Mode; label: string; locked: boolean }[] = ex
    ? [
        { key: "cards", label: "学卡片", locked: false },
        { key: "practice", label: ex.practiceEasy.length ? "练习" : "练习（待补）", locked: !cardsUnlocked || ex.practiceEasy.length === 0 },
        { key: "dictation", label: ex.dictationWords.length ? "听写" : "听写（待补）", locked: !practicePassed || ex.dictationWords.length === 0 },
        { key: "pronounce", label: "发音（待补）", locked: true },
      ]
    : [
        { key: "cards", label: "学卡片", locked: false },
        { key: "practice", label: "练习", locked: !cardsDone && !completedRef.current },
        { key: "dictation", label: "听写", locked: !cardsDone && !completedRef.current },
        { key: "pronounce", label: "发音", locked: !cardsDone && !completedRef.current },
      ];
  const earnedStars = ex ? (cardsUnlocked ? 1 : 0) + (practicePassed ? 1 : 0) + (dictPassed ? 1 : 0) : 0;

  return (
    <div className="mx-auto max-w-3xl">
      <button type="button" onClick={onBack} className="min-h-10 font-bold text-[var(--teal-dark)]">
        ← 返回学习路径
      </button>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {set.level ? (
          <span className="rounded-full bg-[var(--ink)] px-3 py-1 text-sm font-black text-white">{set.level}</span>
        ) : (
          <span className="rounded-full bg-[var(--ink)] px-3 py-1 text-sm font-black text-white">主题词汇</span>
        )}
        {ex ? (
          <span className="rounded-full bg-[#fdf0cd] px-3 py-1 text-sm font-bold text-[#8a6100]">
            {ex.practiceEasy.length === 0
              ? `词卡 +${ex.cardsXp} XP · 练习和听写题目待补 · 已获 ${earnedStars}/${ex.totalStars} 星`
              : `词卡 +${ex.cardsXp} XP · 练习 +${ex.practiceXp} XP · 听写 +${ex.dictationXp} XP · 本课共 +${ex.cardsXp + ex.practiceXp + ex.dictationXp} XP · 已获 ${earnedStars}/${ex.totalStars} 星`}
          </span>
        ) : (
          <span className="rounded-full bg-[#fdf0cd] px-3 py-1 text-sm font-bold text-[#8a6100]">
            学完卡片即通过 · 最高 +{VOCAB_XP} XP
          </span>
        )}
        <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-sm font-bold text-[var(--teal-dark)]">
          已翻看 {Math.min(seen.size + (cardsDone ? set.words.length : 0), set.words.length)} / {set.words.length} 张
        </span>
      </div>
      <h1 className="font-display mt-3 text-3xl text-[var(--ink)] sm:text-4xl">
        {set.titleCn}
      </h1>
      <p className="mt-1 text-[var(--dim)]">{set.titleEn} · {set.blurb}</p>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="词汇学习模式">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            role="tab"
            aria-selected={mode === m.key}
            disabled={m.locked}
            onClick={() => setMode(m.key)}
            className={`min-h-11 rounded-full px-5 py-2 font-bold ${
              mode === m.key
                ? "bg-[var(--ink)] text-white"
                : m.locked
                  ? "cursor-not-allowed bg-[#e8e6da] text-[var(--dim)]"
                  : "border-2 border-[var(--border)] bg-white text-[var(--ink)]"
            }`}
          >
            {m.locked ? "🔒 " : ""}{m.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setFrontCn((v) => !v)}
          aria-pressed={frontCn}
          className="min-h-11 rounded-full bg-[var(--mint)] px-4 py-2 text-sm font-bold text-[var(--teal-dark)]"
        >
          卡片正面：{frontCn ? "中文" : "英文"}（点我切换）
        </button>
      </div>
      {modes.some((m) => m.locked) ? (
        <p className="mt-2 text-sm text-[var(--dim)]">
          {ex
            ? ex.practiceEasy.length === 0
              ? "词卡按原站收录；练习、听写和发音题目待补。"
              : !cardsUnlocked
              ? "先学完本课全部卡片，练习随即解锁；做完练习后听写解锁。发音内容待补。"
              : !practicePassed
                ? "做完练习（简单档）并达到 80 分后，听写解锁。发音内容待补。"
                : "发音内容待补，其余环节都已解锁。"
            : "练习、听写、发音会在学完本课全部卡片后解锁。"}
        </p>
      ) : null}

      {mode === "cards" && card ? (
        <div className="mt-5">
          <div key={cardIndex} className="animate-card-in">
          <div
            role="button"
            tabIndex={0}
            aria-label={flipped ? `词卡背面：${card.word}，${card.meaning}。点卡片翻回正面` : `词卡正面：${frontCn ? card.meaning : card.word}。点卡片翻面`}
            onClick={flip}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                flip();
              }
            }}
            className="flip-scene w-full cursor-pointer"
          >
            <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
              <div className="flip-face min-h-72 rounded-[2rem] bg-[var(--ink)] p-6 text-center text-white sm:p-8" aria-hidden={flipped}>
              {frontCn ? (
                <>
                  {card.collocation ? (
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#9fb8b0]">搭配：{card.collocation}</span>
                  ) : null}
                  <p className="font-display mt-6 text-4xl sm:text-5xl">{card.meaning}</p>
                  <p className="mt-3 inline-block rounded-full bg-[var(--mustard)] px-3 py-1 text-sm font-black text-[var(--ink)]">{card.pos}</p>
                  <p className="mt-8 text-sm text-[#9fb8b0]">先想英文怎么说，再点卡片翻面确认</p>
                </>
              ) : (
                <>
                  {card.collocation ? (
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#9fb8b0]">常见搭配 · {card.collocation}</span>
                  ) : (
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#9fb8b0]">{set.titleCn}</span>
                  )}
                  <p className="font-display mt-6 text-5xl sm:text-6xl">{card.word}</p>
                  <p className="mt-3 text-xl text-[#c8d8d2]">{card.phonetic}</p>
                  <p className="mt-3 inline-block rounded-full bg-[var(--mustard)] px-3 py-1 text-sm font-black text-[var(--ink)]">{card.pos}</p>
                  <p className="mt-8 text-sm text-[#9fb8b0]">点卡片翻面看中文释义与例句</p>
                </>
              )}
              </div>
              <div className="flip-face flip-back min-h-72 rounded-[2rem] border-2 border-[var(--teal)] bg-[var(--surface)] p-6 sm:p-8" aria-hidden={!flipped}>
              <div className="text-left">
                <p className="text-center">
                  <span className="font-display text-3xl text-[var(--teal-dark)]">{frontCn ? card.word : card.meaning}</span>
                  <span className="ml-2 text-[var(--dim)]">{frontCn ? `${card.phonetic} · ${card.pos}` : ""}</span>
                </p>
                <label className="mt-5 block">
                  <span className="text-sm font-bold text-[var(--ink)]">主动回忆：{frontCn ? "写出这个词的中文意思" : "写出这个词的英文拼写"}</span>
                  <span className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={recall}
                      onChange={(e) => setRecall(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      placeholder={frontCn ? "输入英文单词…" : "输入中文意思…"}
                      aria-label="主动回忆输入框"
                      className="min-h-11 min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--teal)]"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRecallShown(true);
                      }}
                      className="min-h-11 shrink-0 rounded-full bg-[var(--ink)] px-4 py-2 font-bold text-white"
                    >
                      查看答案
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHint(true);
                      }}
                      className="min-h-11 shrink-0 rounded-full bg-[var(--mint)] px-4 py-2 font-bold text-[var(--teal-dark)]"
                    >
                      提示
                    </button>
                  </span>
                </label>
                {hint ? (
                  <p className="mt-2 text-sm text-[var(--dim)]">
                    提示：{frontCn ? `中文是「${card.meaning}」` : `开头字母 ${card.word.charAt(0).toUpperCase()}，音标 ${card.phonetic}`}
                  </p>
                ) : null}
                {recallShown ? (
                  <p className="mt-2 text-sm font-bold text-[var(--teal-dark)]">
                    答案：{frontCn ? card.word : card.meaning}
                    {recall.trim()
                      ? (frontCn ? recall.trim().toLowerCase() === card.word.toLowerCase() : card.meaning.includes(recall.trim()))
                        ? " · 你写对了！"
                        : " · 和答案对一对，再记一遍。"
                      : ""}
                  </p>
                ) : null}
                <p className="mt-4">
                  <span className="inline-block rounded-2xl bg-[var(--mint)] px-3 py-1 text-sm font-bold text-[var(--teal-dark)]">
                    {card.usage ? `用法：${card.usage}` : `用法：${maskWord(card.collocation ?? card.example, card.word)}`}
                  </span>
                </p>
                <ul className="mt-3 grid gap-2">
                  <li className="rounded-2xl bg-[var(--mint)] px-4 py-3">
                    <span className="block font-bold text-[var(--ink)]">{maskWord(card.example, card.word)}</span>
                    {card.exampleCn ? <span className="block text-sm text-[var(--dim)]">{card.exampleCn}</span> : null}
                  </li>
                  {card.example2 ? (
                    <li className="rounded-2xl bg-[var(--mint)] px-4 py-3">
                      <span className="block font-bold text-[var(--ink)]">{maskWord(card.example2, card.word)}</span>
                      {card.example2Cn ? <span className="block text-sm text-[var(--dim)]">{card.example2Cn}</span> : null}
                    </li>
                  ) : null}
                  {card.example3 ? (
                    <li className="rounded-2xl bg-[var(--mint)] px-4 py-3">
                      <span className="block font-bold text-[var(--ink)]">{maskWord(card.example3, card.word)}</span>
                      {card.example3Cn ? <span className="block text-sm text-[var(--dim)]">{card.example3Cn}</span> : null}
                    </li>
                  ) : null}
                </ul>
                <p className="mt-4 text-center text-sm text-[var(--dim)]">点卡片翻回正面</p>
              </div>
              </div>
            </div>
          </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            <button type="button" onClick={() => speak(card.word)} className="min-h-11 rounded-2xl border-2 border-[var(--border)] bg-white px-2 py-2 font-bold text-[var(--ink)]" aria-label={`听 ${card.word} 的发音`}>
              🔊 听
            </button>
            <button
              type="button"
              onClick={() => deckToggle.mutate()}
              aria-pressed={inDeck}
              className={`min-h-11 rounded-2xl border-2 px-2 py-2 font-bold ${inDeck ? "border-[var(--teal)] bg-[var(--mint)] text-[var(--teal-dark)]" : "border-[var(--border)] bg-white text-[var(--ink)]"}`}
            >
              {inDeck ? "✓ 已加入复习" : "＋ 加入复习"}
            </button>
            <button type="button" onClick={() => setVideo(true)} className="min-h-11 rounded-2xl border-2 border-[var(--border)] bg-white px-2 py-2 font-bold text-[var(--ink)]" aria-label={`打开 ${card.word} 的视频讲解`}>
              🎬 视频
            </button>
            <button type="button" onClick={() => setZoom(true)} className="min-h-11 rounded-2xl border-2 border-[var(--border)] bg-white px-2 py-2 font-bold text-[var(--ink)]" aria-label={`放大查看 ${card.word}`}>
              ⛶ 放大
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={!flipped}
              onClick={() => markAndNext("learning")}
              className="min-h-12 rounded-full border-2 border-[var(--coral)] bg-white px-4 py-2 font-bold text-[var(--coral)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              需复习
            </button>
            <button
              type="button"
              disabled={!flipped}
              onClick={() => markAndNext("known")}
              className="min-h-12 rounded-full bg-[var(--teal)] px-4 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              已记住 ✓
            </button>
          </div>
          {!flipped ? <p className="mt-2 text-center text-sm text-[var(--dim)]">翻到背面后，才能点「需复习 / 已记住」。</p> : null}

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={cardIndex === 0}
              onClick={() => gotoCard(cardIndex - 1)}
              className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-5 py-2 font-bold text-[var(--ink)] disabled:opacity-40"
            >
              ← 上一张
            </button>
            <span className="text-sm font-bold text-[var(--dim)]">
              {cardIndex + 1} / {set.words.length}
            </span>
            <button
              type="button"
              disabled={cardIndex >= set.words.length - 1}
              onClick={() => gotoCard(cardIndex + 1)}
              className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-5 py-2 font-bold text-[var(--ink)] disabled:opacity-40"
            >
              下一张 →
            </button>
          </div>
        </div>
      ) : null}

      {mode === "practice" && ex ? (
        practiceStarted ? (
          <div className="mt-3">
            <p className="text-sm font-bold text-[var(--dim)]">
              {set.titleCn} · 练习（简单）· 选择题 45 秒 / 填空题 60 秒 / 连线题不计时
            </p>
            <div className="mt-2">
              <TimedQuiz
                key={`ep-${quizKey}`}
                questions={ex.practiceEasy}
                onFinish={(correct, detail) => finishExtractedPractice(correct, detail, false)}
                onExit={(correct, detail) => finishExtractedPractice(correct, detail, true)}
              />
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <h2 className="font-display text-xl text-[var(--ink)]">{set.titleCn} · 练习</h2>
            <p className="mt-1 text-sm text-[var(--dim)]">
              计时：选择题每题 45 秒，填空题每题 60 秒，连线配对题不计时。得分达到 80% 算通过。
            </p>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={() => setPracticeStarted(true)}
                className="min-h-12 rounded-2xl bg-[var(--ink)] px-4 py-2 text-left font-bold text-white"
              >
                简单 · {ex.practiceEasy.length} 题 · 通过 +{ex.practiceXp} XP · 1 星 →
              </button>
              <button
                type="button"
                disabled
                className="min-h-12 cursor-not-allowed rounded-2xl bg-[#e8e6da] px-4 py-2 text-left font-bold text-[var(--dim)]"
              >
                中等 · 原站题目待补
              </button>
              <button
                type="button"
                disabled
                className="min-h-12 cursor-not-allowed rounded-2xl bg-[#e8e6da] px-4 py-2 text-left font-bold text-[var(--dim)]"
              >
                困难 · 原站题目待补
              </button>
            </div>
          </div>
        )
      ) : null}

      {mode === "practice" && !ex && (
        <div className="mt-3">
          <p className="text-sm font-bold text-[var(--dim)]">{set.titleCn} · 练习</p>
          <div className="mt-2">
            <TimedQuiz
              key={`p-${quizKey}`}
              questions={practiceQuestions}
              onFinish={(correct, detail) => finishQuiz("练习", VOCAB_XP)(correct, detail, false, practiceQuestions.length)}
              onExit={(correct, detail) => finishQuiz("练习", VOCAB_XP)(correct, detail, true, practiceQuestions.length)}
            />
          </div>
        </div>
      )}

      {mode === "dictation" && ex ? (
        <div className="mt-3">
          <p className="text-sm font-bold text-[var(--dim)]">
            {set.titleCn} · 听写 · 共 {extractedDictation.length} 个词 · 每题 30 秒 · 最多听 3 遍 · 通过 +{ex.dictationXp} XP · 1 星
          </p>
          <div className="mt-2">
            <TimedQuiz
              key={`ed-${quizKey}`}
              questions={extractedDictation}
              dictationSeconds={30}
              maxListens={3}
              onFinish={(correct, detail) => finishExtractedDictation(correct, detail, false)}
              onExit={(correct, detail) => finishExtractedDictation(correct, detail, true)}
            />
          </div>
        </div>
      ) : null}

      {mode === "dictation" && !ex && (
        <div className="mt-3">
          <p className="text-sm font-bold text-[var(--dim)]">{set.titleCn} · 听写 · 本课共 {dictationQuestions.length} 个词</p>
          <div className="mt-2">
            <TimedQuiz
              key={`d-${quizKey}`}
              questions={dictationQuestions}
              onFinish={(correct, detail) => finishQuiz("听写", 0)(correct, detail, false, dictationQuestions.length)}
              onExit={(correct, detail) => finishQuiz("听写", 0)(correct, detail, true, dictationQuestions.length)}
            />
          </div>
        </div>
      )}

      {mode === "pronounce" && ex ? (
        <div className="mt-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <h2 className="font-display text-xl text-[var(--ink)]">{set.titleCn} · 发音</h2>
          <p className="mt-1 leading-relaxed text-[var(--dim)]">
            发音内容尚未提取（原站录音受限），先标待补，提取回来后开放。可以先在词卡上点「🔊 听」听每个词的发音。
          </p>
        </div>
      ) : null}

      {mode === "pronounce" && !ex && (
        <div className="mt-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <h2 className="font-display text-xl text-[var(--ink)]">{set.titleCn} · 发音</h2>
          <p className="mt-1 text-sm text-[var(--dim)]">先听标准发音，再大声跟读；读完点「读对了」给自己确认，或点「再练练」留待下轮。</p>
          <ul className="mt-4 grid gap-2">
            {set.words.map((wd) => (
              <PronounceRow key={wd.word} wd={wd} />
            ))}
          </ul>
        </div>
      )}

      {mode === "result" && result && (
        <div className="mt-5">
          <ResultPanel
            result={result}
            maxXp={resultMaxXp}
            retryLabel="再来一次"
            onRetry={() => {
              setResult(null);
              setQuizKey((k) => k + 1);
              if (ex && resultFrom === "dictation") {
                setMode("dictation");
              } else {
                if (ex) setPracticeStarted(true);
                setMode("practice");
              }
            }}
            onBack={onBack}
          />
        </div>
      )}

      {zoom && card ? (
        <div className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label={`放大词卡 ${card.word}`}>
          <div className="animate-modal-in w-full max-w-lg rounded-[2rem] bg-[var(--ink)] p-8 text-center text-white">
            <p className="font-display text-6xl">{card.word}</p>
            <p className="mt-3 text-2xl text-[#c8d8d2]">{card.phonetic}</p>
            <p className="mt-2 font-bold text-[#2dd4bf]">{card.pos} · {card.meaning}</p>
            <p className="mt-4 font-bold">{card.example}</p>
            {card.exampleCn ? <p className="text-[#9fb8b0]">{card.exampleCn}</p> : null}
            {card.example2 ? <p className="mt-3 font-bold">{card.example2}</p> : null}
            {card.example2Cn ? <p className="text-[#9fb8b0]">{card.example2Cn}</p> : null}
            {card.example3 ? <p className="mt-3 font-bold">{card.example3}</p> : null}
            {card.example3Cn ? <p className="text-[#9fb8b0]">{card.example3Cn}</p> : null}
            <button type="button" onClick={() => setZoom(false)} className="mt-6 min-h-11 rounded-full bg-white px-6 py-2 font-bold text-[var(--ink)]">
              关闭
            </button>
          </div>
        </div>
      ) : null}

      {video && card ? (
        <div className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label={`${card.word} 视频讲解`}>
          <div className="animate-modal-in w-full max-w-lg rounded-[2rem] bg-[var(--ink)] p-8 text-center text-white">
            <p className="text-sm font-bold text-[#9fb8b0]">视频讲解 · 跟读一遍</p>
            <p className="font-display mt-4 text-5xl">{card.word}</p>
            <p className="mt-2 text-xl text-[#c8d8d2]">{card.phonetic}</p>
            <p className="mt-4 text-lg font-bold">{card.example}</p>
            <p className="text-[#9fb8b0]">{card.exampleCn}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  speak(card.word);
                  window.setTimeout(() => speak(card.example), 900);
                }}
                className="min-h-11 rounded-full bg-[var(--mustard)] px-6 py-2 font-bold text-[var(--ink)]"
              >
                ▶ 播放讲解
              </button>
              <button type="button" onClick={() => setVideo(false)} className="min-h-11 rounded-full bg-white px-6 py-2 font-bold text-[var(--ink)]">
                关闭
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PronounceRow({ wd }: { wd: Word }) {
  const [state, setState] = useState<"idle" | "ok" | "again">("idle");
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-3">
      <button
        type="button"
        onClick={() => speak(wd.word)}
        aria-label={`播放 ${wd.word} 的发音`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--teal)] text-white"
      >
        🔊
      </button>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-[var(--ink)]">
          {wd.word} <span className="text-sm font-medium text-[var(--dim)]">{wd.phonetic}</span>
        </span>
        <span className="block text-sm text-[var(--dim)]">{wd.meaning}</span>
      </span>
      <button
        type="button"
        onClick={() => setState("ok")}
        aria-pressed={state === "ok"}
        className={`min-h-10 rounded-full px-4 py-1.5 text-sm font-bold ${state === "ok" ? "bg-[var(--teal)] text-white" : "bg-[var(--mint)] text-[var(--teal-dark)]"}`}
      >
        读对了 ✓
      </button>
      <button
        type="button"
        onClick={() => setState("again")}
        aria-pressed={state === "again"}
        className={`min-h-10 rounded-full px-4 py-1.5 text-sm font-bold ${state === "again" ? "bg-[var(--coral)] text-white" : "bg-[#fbe3da] text-[var(--coral)]"}`}
      >
        再练练
      </button>
    </li>
  );
}
