import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { speak, todayStr } from "../lib";
import {
  GRAMMAR_XP,
  type GrammarLesson,
  type QuizQuestion,
  type TheorySection,
} from "../data/content";
import { buildGrammarQuiz, QUIZ_COUNTS, collectedCountFor, isDifficultyPartial, isDifficultyPending, quizCountFor } from "../data/catalog";
import { TimedQuiz, type AnswerDetail } from "./Quiz";

export interface CompletedInfo {
  bestScore: number;
  xpEarned: number;
}

export interface LessonStats {
  attempts: number;
  bestScore: number;
  recentScore: number;
  stars: number;
}

export type Difficulty3 = "简单" | "中等" | "困难";
export const DIFF_STARS: Record<Difficulty3, number> = { "简单": 1, "中等": 2, "困难": 3 };

interface ResultState {
  score: number;
  correct: number;
  total: number;
  xpGained: number | null;
  passed: boolean;
  interrupted: boolean;
  stars: number;
}

export function ResultPanel({
  result,
  maxXp,
  onRetry,
  onBack,
  retryLabel = "再测一次",
  passScore = 80,
}: {
  result: ResultState;
  maxXp: number;
  onRetry: () => void;
  onBack: () => void;
  retryLabel?: string;
  passScore?: number;
}) {
  return (
    <div className="animate-slide-up rounded-[2rem] bg-[var(--mint)] p-6 text-center">
      <div className="animate-grow-in text-5xl" aria-hidden>{result.interrupted ? "📌" : result.passed ? "🎉" : "💪"}</div>
      {result.passed && result.stars > 0 ? (
        <p className="mt-3 text-4xl text-[var(--mustard)]" role="img" aria-label={`获得 ${result.stars} 颗星`}>
          {Array.from({ length: result.stars }, (_, i) => (
            <span key={i} className="animate-star-pop" style={{ animationDelay: `${0.25 + i * 0.28}s` }} aria-hidden>
              ★
            </span>
          ))}
        </p>
      ) : null}
      <p className="font-display mt-3 text-3xl text-[var(--ink)]">
        {result.interrupted ? "本次尝试已中断" : `得分 ${result.score}`}
      </p>
      <p className="mt-2 text-sm text-[var(--dim)]">
        答对 {result.correct} / {result.total} 题
        {result.interrupted
          ? " · 中断的尝试已记入历史，可在历史页逐题回顾"
          : result.passed
            ? ` · 已通过（通过线 ${passScore}%）${result.stars > 0 ? ` · 获得 ${"★".repeat(result.stars)}` : ""}`
            : ` · 未达到 ${passScore}% 通过线`}
        {!result.interrupted && result.xpGained !== null
          ? result.xpGained > 0
            ? ` · 本次 +${result.xpGained} XP（本课上限 ${maxXp} XP）`
            : " · 本课 XP 已拿满，重练只巩固"
          : ""}
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="min-h-11 rounded-full border-2 border-[var(--ink)] bg-white px-6 py-2 font-bold text-[var(--ink)]"
        >
          {retryLabel}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 rounded-full bg-[var(--ink)] px-6 py-2 font-bold text-white"
        >
          回到学习路径
        </button>
      </div>
    </div>
  );
}

function useRecordAttempt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      lessonId: string;
      kind: "grammar" | "vocab-topic" | "vocab-cefr" | "placement";
      title: string;
      difficulty: string;
      total: number;
      correct: number;
      interrupted: boolean;
      detail: AnswerDetail[];
      maxXp: number;
    }) => await api.recordAttempt({ ...args, today: todayStr() }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });
}

// ---------------- 语法课 ----------------

type GrammarPhase = "theory" | "quizIntro" | "quiz" | "result";

export function GrammarLessonView({
  lesson,
  initialPhase,
  initialDifficulty,
  onBack,
}: {
  lesson: GrammarLesson;
  initialPhase: "theory" | "quizIntro";
  initialDifficulty: Difficulty3;
  onBack: () => void;
}) {
  const [phase, setPhase] = useState<GrammarPhase>(initialPhase);
  const [difficulty, setDifficulty] = useState<Difficulty3>(initialDifficulty);
  const [result, setResult] = useState<ResultState | null>(null);
  const [quizKey, setQuizKey] = useState(0);
  const record = useRecordAttempt();
  const questions = useMemo(
    () => (phase === "quiz" || phase === "result" ? buildGrammarQuiz(lesson, difficulty) : []),
    [lesson, difficulty, phase, quizKey],
  );

  const finish = (correct: number, detail: AnswerDetail[], interrupted: boolean) => {
    const total = buildGrammarQuiz(lesson, difficulty).length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passScore = difficulty === "困难" ? 100 : 80;
    setResult({
      score,
      correct,
      total,
      xpGained: null,
      passed: !interrupted && score >= passScore,
      interrupted,
      stars: !interrupted && score >= passScore ? DIFF_STARS[difficulty] : 0,
    });
    setPhase("result");
    record.mutate(
      {
        lessonId: lesson.id,
        kind: "grammar",
        title: `${lesson.level} · ${lesson.titleCn}`,
        difficulty,
        total,
        correct,
        interrupted,
        detail,
        maxXp: GRAMMAR_XP,
      },
      { onSuccess: (r) => setResult((prev) => (prev ? { ...prev, xpGained: r.xpGained } : prev)) },
    );
  };

  const theory: TheorySection[] =
    lesson.theory ?? lesson.rules.map((r, i) => ({ heading: `${i + 1} · ${r.heading}`, body: r.body, examples: r.examples }));
  const keyPoints = lesson.keyPoints ?? lesson.rules.map((r) => r.heading);
  const pilotOverview = ["g-a1-1", "g-a1-2", "g-a1-3", "g-a2-1", "g-a2-2", "g-a2-3", "g-a2-4"].includes(lesson.id);

  return (
    <div className={`mx-auto ${phase === "theory" ? "max-w-[1080px]" : "max-w-3xl"}`}>
      {phase === "theory" ? (
        <div className="ff-pilot-header">
          <button type="button" onClick={onBack}>× 返回</button>
          <div><h1 className="font-display">{lesson.titleCn}</h1><p>{lesson.titleEn}</p></div>
          <span>{lesson.level}</span>
        </div>
      ) : (
        <>
          <button type="button" onClick={onBack} className="min-h-10 font-bold text-[var(--teal-dark)]">← 返回学习路径</button>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--ink)] px-3 py-1 text-sm font-black text-white">{lesson.level}</span>
            <span className="rounded-full bg-[#fdf0cd] px-3 py-1 text-sm font-bold text-[#8a6100]">完成测验最高 +{GRAMMAR_XP} XP · 简单／中等通过线 80%，困难档 100%</span>
          </div>
          <h1 className="font-display mt-3 text-3xl text-[var(--ink)] sm:text-4xl">{lesson.titleCn}</h1>
          <p className="mt-1 text-base font-medium text-[var(--dim)]">{lesson.titleEn} · {lesson.intro}</p>
        </>
      )}

      {phase === "theory" && (
        <div className="ff-pilot-body">
          {pilotOverview ? (
            <>
              <div className="ff-pilot-overview">
                <article className="ff-pilot-purpose"><span>重点</span><p>{theory[0]?.body}</p></article>
                <article className="ff-pilot-formula"><span>核心结构</span><strong>{theory[1]?.body}</strong></article>
              </div>
              {lesson.openingExample?.en ? (
                <div className="ff-pilot-example">
                  <div><strong>开头例句</strong><small>先读例句，再看分析。</small></div>
                  <p>{lesson.openingExample.en}<small>{lesson.openingExample.cn}</small></p>
                  <button type="button" onClick={() => lesson.openingExample && speak(lesson.openingExample.en)} aria-label="朗读开场例句">🔊</button>
                </div>
              ) : null}
              <div className="ff-pilot-topics">{theory[2]?.body.split(" / ").map((part) => <span key={part}>{part}</span>)}</div>
            </>
          ) : null}
          {!pilotOverview && lesson.openingExample?.en ? (
            <section className="rounded-[2rem] bg-[var(--ink)] p-6 text-white">
              <p className="text-sm font-bold text-[#9fb8b0]">先看一句话</p>
              <p className="font-display mt-2 text-2xl leading-snug">{lesson.openingExample.en}</p>
              <p className="mt-1 text-[#c8d8d2]">{lesson.openingExample.cn}</p>
              <button
                type="button"
                onClick={() => lesson.openingExample && speak(lesson.openingExample.en)}
                className="mt-3 min-h-10 rounded-full bg-white/15 px-4 py-1.5 font-bold text-white"
                aria-label="朗读开场例句"
              >
                🔊 听一听
              </button>
            </section>
          ) : null}
          <div className="mt-4 grid gap-4">
            {theory.slice(pilotOverview ? 3 : 0).map((sec) => (
              <section key={sec.heading} className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                <h2 className="font-display text-xl text-[var(--ink)]">{sec.heading}</h2>
                {sec.body ? <p className="mt-2 leading-relaxed text-[var(--dim)]">{sec.body}</p> : null}
                {sec.examples && sec.examples.length > 0 ? (
                  <ul className="mt-4 grid gap-2.5">
                    {sec.examples.map((ex) => (
                      <li key={ex.en} className="flex items-start gap-3 rounded-2xl bg-[var(--mint)] px-4 py-3">
                        <button
                          type="button"
                          onClick={() => speak(ex.en)}
                          aria-label={`朗读例句：${ex.en}`}
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--teal)] text-base text-white"
                        >
                          🔊
                        </button>
                        <span>
                          <span className="block font-bold text-[var(--ink)]">{ex.en}</span>
                          <span className="block text-sm text-[var(--dim)]">{ex.cn}</span>
                          {ex.note ? <span className="block text-sm text-[var(--teal-dark)]">{ex.note}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {sec.table && sec.table.length > 0 ? (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {sec.table.map((row) => (
                      <div key={row.left} className="rounded-2xl border border-[var(--border)] p-4">
                        <p className="font-bold text-[var(--ink)]">{row.left}</p>
                        <p className="mt-1 text-sm text-[var(--teal-dark)]">{row.right}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {sec.errors && sec.errors.length > 0 ? (
                  <ul className="mt-4 grid gap-2.5">
                    {sec.errors.map((err) => (
                      <li key={err.wrong} className="rounded-2xl bg-[#fdf3ee] p-4">
                        <p className="font-bold text-[var(--coral)]">✗ {err.wrong}</p>
                        <p className="mt-1 font-bold text-[var(--teal-dark)]">✓ {err.right}</p>
                        <p className="mt-1 text-sm text-[var(--dim)]">{err.note}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <section className="mt-4 rounded-[2rem] border-2 border-[var(--teal)] bg-[var(--mint)] p-5 sm:p-6">
            <h2 className="font-display text-xl text-[var(--ink)]">要点清单</h2>
            <ul className="mt-3 grid gap-2">
              {keyPoints.map((kp) => (
                <li key={kp} className="flex items-start gap-2 font-medium text-[var(--ink)]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--teal)] text-xs font-black text-white">✓</span>
                  {kp}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setPhase("quizIntro")}
              className="hover-lift mt-5 min-h-12 w-full rounded-full bg-[var(--ink)] px-6 py-3 text-lg font-bold text-white"
            >
              继续去做题 →
            </button>
          </section>
        </div>
      )}

      {phase === "quizIntro" && (
        <div className="mt-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="font-display text-2xl text-[var(--ink)]">测验说明</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(Object.keys(QUIZ_COUNTS) as Difficulty3[]).map((d) => {
              const pending = isDifficultyPending(lesson, d);
              const partial = isDifficultyPartial(lesson, d);
              const total = quizCountFor(lesson, d);
              const collected = collectedCountFor(lesson, d);
              return (
                <button
                  key={d}
                  type="button"
                  disabled={pending}
                  onClick={() => setDifficulty(d)}
                  aria-pressed={difficulty === d}
                  aria-label={pending ? `${d}：原站题目待补，暂不可开始` : partial ? `${d}：已收 ${collected}/${total} 题，其余待补` : undefined}
                  className={`min-h-11 rounded-2xl border-2 px-4 py-2 font-bold ${
                    pending
                      ? "cursor-not-allowed border-dashed border-[var(--border)] bg-[#e8e6da] text-[var(--dim)] opacity-70"
                      : difficulty === d
                        ? "border-[var(--teal)] bg-[var(--mint)] text-[var(--ink)]"
                        : "border-[var(--border)] bg-white text-[var(--dim)]"
                  }`}
                >
                  {d} {"★".repeat(DIFF_STARS[d])} · {pending && lesson.quizCounts?.[d] == null ? "题数待核对" : `${partial ? collected : total} 题`}
                  {pending ? <span className="block text-xs font-bold">原站题目待补</span> : null}
                  {partial ? <span className="block text-xs font-bold">已收 {collected}/{total} 题 · 其余 {total - collected} 题待补</span> : null}
                </button>
              );
            })}
          </div>
          <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed text-[var(--dim)]">
            {isDifficultyPending(lesson, difficulty) ? (
              <li>「{difficulty}」这一档{lesson.quizCounts?.[difficulty] == null ? "的原站题数尚未核对" : `共 ${quizCountFor(lesson, difficulty)} 题`}，原站题目尚未提取，待补后再开放，不用旧题充数。</li>
            ) : isDifficultyPartial(lesson, difficulty) ? (
              <li>本次难度：{difficulty}，原站共 {quizCountFor(lesson, difficulty)} 题，目前只收录了已提取的 {collectedCountFor(lesson, difficulty)} 题，本次就练这 {collectedCountFor(lesson, difficulty)} 题；其余 {quizCountFor(lesson, difficulty) - collectedCountFor(lesson, difficulty)} 题尚未提取、待补。</li>
            ) : (
              <li>本次难度：{difficulty}，共 {quizCountFor(lesson, difficulty)} 题{lesson.ownBankOnly ? "，全部来自本课题库" : "（含本级前面课程的少量滚动复现题）"}。</li>
            )}
            <li>题型以选择题为主，混有填空题：看完整句和括号里的原形，写出这个词的正确形式（判分忽略大小写），难度越高填空越多。</li>
            <li>{difficulty === "困难" ? "困难档必须全部答对；答错一题返回理论。" : "通过线 80%。"}通过后点亮星级（{difficulty} {DIFF_STARS[difficulty]} 星）。</li>
            <li>
              {difficulty === "困难"
                ? "限时（困难档）：选择题每题 20 秒、填空题每题 30 秒。答题后计时不停，超时未答算答错，并继续到最后一题。"
                : difficulty === "中等"
                  ? "限时（中等档）：选择题每题 30 秒、填空题每题 45 秒。答题后计时不停，超时未答算答错，并继续到最后一题。"
                  : "限时（简单档）：选择题每题 45 秒、填空题每题 60 秒。答题后计时不停，超时未答算答错，并继续到最后一题。"}
            </li>
            <li>中途点「退出」不会弹确认框，本次尝试会直接记入历史。</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isDifficultyPending(lesson, difficulty)}
              onClick={() => {
                setResult(null);
                setQuizKey((k) => k + 1);
                setPhase("quiz");
              }}
              className="hover-lift min-h-12 rounded-full bg-[var(--ink)] px-7 py-3 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isDifficultyPending(lesson, difficulty) ? "原站题目待补" : "开始做题 →"}
            </button>
            <button
              type="button"
              onClick={() => setPhase("theory")}
              className="min-h-12 rounded-full border-2 border-[var(--border)] bg-white px-6 py-3 font-bold text-[var(--ink)]"
            >
              先看理论
            </button>
          </div>
        </div>
      )}

      {phase === "quiz" && (
        <div className="mt-2">
          <p className="text-sm font-bold text-[var(--dim)]">
            {lesson.titleCn} · {difficulty}测验 · 答题后计时不停，到点自动跳到下一题
          </p>
          <div className="mt-3">
            <TimedQuiz
              key={quizKey}
              questions={questions}
              tier={difficulty}
              onFinish={(correct, detail) => finish(correct, detail, false)}
              onExit={(correct, detail) => finish(correct, detail, true)}
              onMistake={difficulty === "困难" ? () => { setResult(null); setPhase("theory"); } : undefined}
            />
          </div>
        </div>
      )}

      {phase === "result" && result && (
        <div className="mt-6">
          <ResultPanel
            result={result}
            maxXp={GRAMMAR_XP}
            passScore={difficulty === "困难" ? 100 : 80}
            onRetry={() => {
              setResult(null);
              setPhase("quizIntro");
            }}
            onBack={onBack}
          />
        </div>
      )}
    </div>
  );
}

// ---------------- 越级考试 ----------------

export function PlacementView({
  title,
  subtitle,
  questions,
  passCount,
  unlockKey,
  onBack,
}: {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  passCount: number;
  unlockKey: string;
  onBack: () => void;
}) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [result, setResult] = useState<ResultState | null>(null);
  const [quizKey, setQuizKey] = useState(0);
  const record = useRecordAttempt();
  const queryClient = useQueryClient();
  const unlock = useMutation({
    mutationFn: async () => await api.unlockPlacement({ key: unlockKey, today: todayStr() }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });

  const finish = (correct: number, detail: AnswerDetail[], interrupted: boolean) => {
    const total = questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = !interrupted && correct >= passCount;
    setResult({ score, correct, total, xpGained: null, passed, interrupted, stars: 0 });
    setPhase("result");
    record.mutate({
      lessonId: `placement:${unlockKey}`,
      kind: "placement",
      title,
      difficulty: "越级考试",
      total,
      correct,
      interrupted,
      detail,
      maxXp: 0,
    });
    if (passed) unlock.mutate();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <button type="button" onClick={onBack} className="min-h-10 font-bold text-[var(--teal-dark)]">
        ← 返回学习路径
      </button>
      <h1 className="font-display mt-2 text-3xl text-[var(--ink)]">{title}</h1>
      <p className="mt-2 text-[var(--dim)]">{subtitle}</p>

      {phase === "intro" && (
        <div className="mt-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="font-display text-2xl text-[var(--ink)]">考试说明</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-[var(--dim)]">
            <li>共 {questions.length} 题，限时与普通测验相同：选择题每题 45 秒、填空题每题 60 秒。</li>
            <li>答对 {passCount} 题及以上即为通过，解锁对应范围的全部课程（越级解锁不点亮星级）。</li>
            <li>中途退出会记入历史，且不算通过。</li>
          </ul>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setQuizKey((k) => k + 1);
              setPhase("quiz");
            }}
            className="mt-6 min-h-12 rounded-full bg-[var(--ink)] px-7 py-3 text-lg font-bold text-white"
          >
            开始考试 →
          </button>
        </div>
      )}

      {phase === "quiz" && (
        <div className="mt-2">
          <TimedQuiz
            key={quizKey}
            questions={questions}
            onFinish={(correct, detail) => finish(correct, detail, false)}
            onExit={(correct, detail) => finish(correct, detail, true)}
          />
        </div>
      )}

      {phase === "result" && result && (
        <div className="mt-6 rounded-[2rem] bg-[var(--mint)] p-6 text-center">
          <div className="text-5xl" aria-hidden>{result.passed ? "🔓" : result.interrupted ? "📌" : "🔒"}</div>
          <p className="font-display mt-3 text-3xl text-[var(--ink)]">
            {result.interrupted ? "考试已中断" : result.passed ? "通过！已全部解锁" : "还没通过"}
          </p>
          <p className="mt-2 text-sm text-[var(--dim)]">
            答对 {result.correct} / {result.total} 题（通过线 {passCount} 题）
            {result.passed ? " · 回到学习路径即可自由进入这一范围的全部课程（不点亮星级）" : " · 先按顺序学几课，再来挑战"}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setPhase("intro");
              }}
              className="min-h-11 rounded-full border-2 border-[var(--ink)] bg-white px-6 py-2 font-bold text-[var(--ink)]"
            >
              再考一次
            </button>
            <button
              type="button"
              onClick={onBack}
              className="min-h-11 rounded-full bg-[var(--ink)] px-6 py-2 font-bold text-white"
            >
              回到学习路径
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
