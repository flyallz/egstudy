import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ALL_WORDS, questionSeconds, type Difficulty, type QuizQuestion } from "../data/content";
import { api } from "../api";
import { speak, todayStr } from "../lib";

export interface AnswerDetail {
  q: string;
  options: string[];
  picked: number | null;
  answer: number;
}

// 浏览器语音识别的最小结构类型（仅用到下面几个成员）
interface VoiceRecognition {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
}

interface QuizProps {
  questions: QuizQuestion[];
  onFinish: (correct: number, detail: AnswerDetail[]) => void;
  onExit: (correct: number, detail: AnswerDetail[]) => void;
  onMistake?: () => void; // 语法困难档：答错后返回理论
  tier?: Difficulty; // 难度分档计时：简单 45/60 秒、中等 30/45 秒、困难 20/30 秒（选择/填空）
  dictationSeconds?: number; // 听写每题秒数覆盖（原站提取课听写为 30 秒）
  maxListens?: number; // 听写最多可听次数，含进入题目时自动播放的一次（原站提取课为 3 遍）
}

const WORD_MAP = new Map(ALL_WORDS.map((w) => [w.word.toLowerCase(), w]));

function beep(ok: boolean, muted: boolean) {
  if (muted) return;
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = ok ? 760 : 220;
    gain.gain.value = 0.06;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
    window.setTimeout(() => void ctx.close(), 300);
  } catch {
    /* ignore */
  }
}

/**
 * 限时测验：按难度分档计时（简单选择 45 秒、填空/听写 60 秒；中等 30/45 秒；困难 20/30 秒），答后计时不停（到点自动进入下一题），
 * 超时未答算答错并继续；可静音；退出不弹确认框，由父组件把中断尝试记入历史。
 * 题干中的英文单词可点查词义；听写题先听发音再拼写；
 * 填空题给出完整句与括号里的原形，输入正确形式后判分（忽略大小写与首尾空格）。
 */
export function TimedQuiz({ questions, onFinish, onExit, onMistake, tier, dictationSeconds, maxListens }: QuizProps) {
  const secsFor = (q: QuizQuestion) =>
    dictationSeconds !== undefined && q.kind === "dictation" ? dictationSeconds : questionSeconds(q, tier);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [dictInput, setDictInput] = useState("");
  const [dictChecked, setDictChecked] = useState<boolean | null>(null);
  const [blankInput, setBlankInput] = useState("");
  const [blankChecked, setBlankChecked] = useState<boolean | null>(null);
  const [matchSel, setMatchSel] = useState<number | null>(null);
  const [matchDone, setMatchDone] = useState<Set<number>>(new Set());
  const [matchWrong, setMatchWrong] = useState<string | null>(null);
  const [matchFinished, setMatchFinished] = useState(false);
  const matchErrorRef = useRef(false);
  const [plays, setPlays] = useState(0); // 本题听写已播放次数（设了 maxListens 时计数）
  const [timedOut, setTimedOut] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() => (questions[0] ? secsFor(questions[0]) : 45));
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("quiz-muted") === "1";
    } catch {
      return false;
    }
  });
  const [lookup, setLookup] = useState<{ word: string; meaning: string; phonetic: string } | null>(null);
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState("");
  const detailRef = useRef<AnswerDetail[]>([]);
  const correctRef = useRef(0);
  const doneRef = useRef(false);

  // ---- 奖励商店道具卡：提示卡去掉一个错误选项；免错卡把一次答错改判答对（每次测验各限 1 张） ----
  const queryClient = useQueryClient();
  const progressQ = useQuery({ queryKey: ["progress"], queryFn: () => api.getProgress({ today: todayStr() }) });
  const invCount = (key: string) =>
    (progressQ.data?.inventory ?? []).find((i) => i.itemKey === key)?.quantity ?? 0;
  const [hintLeft, setHintLeft] = useState<number | null>(null);
  const [shieldLeft, setShieldLeft] = useState<number | null>(null);
  useEffect(() => {
    if (progressQ.data) {
      setHintLeft((v) => (v === null ? invCount("hint_card") : v));
      setShieldLeft((v) => (v === null ? invCount("shield_card") : v));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressQ.data]);
  const [hintUsedThisQuiz, setHintUsedThisQuiz] = useState(false);
  const [shieldUsedThisQuiz, setShieldUsedThisQuiz] = useState(false);
  const [removedOption, setRemovedOption] = useState<number | null>(null);
  const [shieldActive, setShieldActive] = useState(false); // 本题已被免错卡改判答对
  const [cardNote, setCardNote] = useState("");
  const useCardMut = useMutation({
    mutationFn: async (itemKey: "hint_card" | "shield_card") => await api.useCard({ itemKey }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });

  const useHint = () => {
    if (!current || isDict || isBlank || isMatch || answered || hintUsedThisQuiz || (hintLeft ?? 0) <= 0) return;
    const wrongIdxs = current.options.map((_, i) => i).filter((i) => i !== current.answer);
    if (wrongIdxs.length === 0) return;
    const target = wrongIdxs[Math.floor(Math.random() * wrongIdxs.length)]!;
    useCardMut.mutate("hint_card", {
      onSuccess: (res) => {
        if (res.ok) {
          setRemovedOption(target);
          setHintLeft(res.remaining);
          setHintUsedThisQuiz(true);
          setCardNote("💡 提示卡已生效：一个错误选项被去掉了。");
        } else {
          setCardNote(res.message);
        }
      },
    });
  };

  const useShield = () => {
    if (!current || shieldUsedThisQuiz || shieldActive || (shieldLeft ?? 0) <= 0) return;
    useCardMut.mutate("shield_card", {
      onSuccess: (res) => {
        if (res.ok) {
          correctRef.current += 1;
          setShieldLeft(res.remaining);
          setShieldUsedThisQuiz(true);
          setShieldActive(true);
          setCardNote("🛡️ 免错卡已生效：这题算答对，不扣分。");
          beep(true, muted);
        } else {
          setCardNote(res.message);
        }
      },
    });
  };

  const current = questions[index];
  const isDict = current?.kind === "dictation";
  const isBlank = current?.kind === "blank";
  const isMatch = current?.kind === "match";
  const answered = isDict ? dictChecked !== null : isBlank ? blankChecked !== null : isMatch ? matchFinished : picked !== null || timedOut;

  const advanceRef = useRef<() => void>(() => {});
  advanceRef.current = () => {
    if (!current || doneRef.current) return;
    // 记录本题
    if (isDict) {
      const ok = dictChecked === true;
      detailRef.current[index] = {
        q: current.q,
        options: [current.answerText ?? ""],
        picked: ok ? 0 : null,
        answer: 0,
      };
    } else if (isBlank) {
      const ok = blankChecked === true;
      detailRef.current[index] = {
        q: `填空：${current.q}`,
        options: [current.answerText ?? ""],
        picked: ok ? 0 : null,
        answer: 0,
      };
    } else if (isMatch) {
      const ok = !matchErrorRef.current;
      detailRef.current[index] = {
        q: `连线：${current.q}`,
        options: [(current.pairs ?? []).map((p) => `${p.left} — ${p.right}`).join("；")],
        picked: ok ? 0 : null,
        answer: 0,
      };
    } else {
      detailRef.current[index] = {
        q: current.q,
        options: current.options,
        picked,
        answer: current.answer,
      };
    }
    if (index + 1 >= questions.length) {
      doneRef.current = true;
      onFinish(correctRef.current, detailRef.current.filter(Boolean));
      return;
    }
    setIndex(index + 1);
    setPicked(null);
    setDictInput("");
    setDictChecked(null);
    setBlankInput("");
    setBlankChecked(null);
    setMatchSel(null);
    setMatchDone(new Set());
    setMatchWrong(null);
    setMatchFinished(false);
    matchErrorRef.current = false;
    setPlays(0);
    setTimedOut(false);
    setSecondsLeft(secsFor(questions[index + 1]!));
    setLookup(null);
    setListening(false);
    setVoiceNote("");
    setRemovedOption(null);
    setShieldActive(false);
    setCardNote("");
  };

  useEffect(() => {
    if (isMatch) return; // 连线配对题不计时
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 0.1) {
          clearInterval(t);
          if (!answered) setTimedOut(true);
          if (!answered && onMistake) window.setTimeout(onMistake, 60);
          else window.setTimeout(() => advanceRef.current(), 60);
          return 0;
        }
        return Math.round((s - 0.1) * 10) / 10;
      });
    }, 100);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, answered]);

  useEffect(() => {
    if (isDict && current?.answerText) {
      speak(current.answerText);
      setPlays(1); // 自动播放算第 1 遍
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // 听写再听一遍：设了 maxListens 时计数并封顶
  const playDictation = () => {
    if (!current?.answerText) return;
    if (maxListens !== undefined && plays >= maxListens) return;
    speak(current.answerText);
    setPlays((p) => p + 1);
  };
  const listensLeft = maxListens !== undefined ? Math.max(0, maxListens - plays) : null;

  const stemWords = useMemo(() => (current ? current.q.split(/(\s+)/) : []), [current]);

  if (!current) return null;

  const pick = (i: number) => {
    if (answered || i === removedOption) return;
    setPicked(i);
    const ok = i === current.answer;
    if (ok) correctRef.current += 1;
    beep(ok, muted);
    if (!ok) onMistake?.();
  };

  const checkDict = () => {
    if (dictChecked !== null || !current.answerText) return;
    const ok = dictInput.trim().toLowerCase() === current.answerText.toLowerCase();
    setDictChecked(ok);
    if (ok) correctRef.current += 1;
    beep(ok, muted);
    if (!ok) onMistake?.();
  };

  const checkBlank = () => {
    if (blankChecked !== null || !current.answerText) return;
    const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
    const ok = norm(blankInput) === norm(current.answerText);
    setBlankChecked(ok);
    if (ok) correctRef.current += 1;
    beep(ok, muted);
    if (!ok) onMistake?.();
  };

  // 连线配对：先点左列单词，再点右列意思；连错一次本题即算答错（解析里可看正确配对）
  const matchedRights = useMemo(
    () => new Set([...matchDone].map((i) => current?.pairs?.[i]?.right).filter((r): r is string => !!r)),
    [matchDone, current],
  );
  const pickMatchLeft = (i: number) => {
    if (matchFinished || matchDone.has(i)) return;
    setMatchSel(i);
    setMatchWrong(null);
  };
  const pickMatchRight = (rightText: string) => {
    if (matchFinished || matchSel === null || !current?.pairs) return;
    const pair = current.pairs[matchSel];
    if (!pair) return;
    if (pair.right === rightText) {
      const next = new Set(matchDone);
      next.add(matchSel);
      setMatchDone(next);
      setMatchSel(null);
      setMatchWrong(null);
      if (next.size >= current.pairs.length) {
        setMatchFinished(true);
        const ok = !matchErrorRef.current;
        if (ok) correctRef.current += 1;
        beep(ok, muted);
      } else {
        beep(true, muted);
      }
    } else {
      matchErrorRef.current = true;
      setMatchWrong(rightText);
      beep(false, muted);
      window.setTimeout(() => setMatchWrong((w) => (w === rightText ? null : w)), 650);
    }
  };

  const exit = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    const detail = detailRef.current.filter(Boolean);
    if (answered && detail.length <= index) {
      // 把当前已答未推进的题也记上
      if (isDict) {
        detail.push({ q: current.q, options: [current.answerText ?? ""], picked: dictChecked ? 0 : null, answer: 0 });
      } else if (isBlank) {
        detail.push({ q: `填空：${current.q}`, options: [current.answerText ?? ""], picked: blankChecked ? 0 : null, answer: 0 });
      } else if (isMatch) {
        detail.push({
          q: `连线：${current.q}`,
          options: [(current.pairs ?? []).map((p) => `${p.left} — ${p.right}`).join("；")],
          picked: !matchErrorRef.current ? 0 : null,
          answer: 0,
        });
      } else {
        detail.push({ q: current.q, options: current.options, picked, answer: current.answer });
      }
    }
    onExit(correctRef.current, detail);
  };

  const replayStem = () => {
    if (isDict && current.answerText) playDictation();
    else if (isBlank && current.sentence && current.answerText) speak(current.sentence.replace(current.answerText, "…"));
    else speak(current.q.replace(/_+/g, "…"));
  };

  const startVoice = () => {
    if (answered) {
      setVoiceNote("这题已经答过了，点「下一题」继续。");
      return;
    }
    if (isMatch) {
      setVoiceNote("连线题直接点选左右两列配对就可以。");
      return;
    }
    const w = window as unknown as {
      SpeechRecognition?: new () => VoiceRecognition;
      webkitSpeechRecognition?: new () => VoiceRecognition;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) {
      setVoiceNote("当前浏览器不支持语音输入，直接点选答案就可以。");
      return;
    }
    try {
      const rec = new Ctor();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.onresult = (e) => {
        const raw = e.results[0]?.[0]?.transcript ?? "";
        const heard = raw.trim().toLowerCase().replace(/[.!?,]/g, "");
        if (!heard) {
          setVoiceNote("没有听清，再试一次。");
          return;
        }
        if (isDict) {
          setDictInput(heard.split(/\s+/)[0] ?? heard);
          setVoiceNote(`已填入「${heard}」，点「检查」确认。`);
          return;
        }
        if (isBlank) {
          setBlankInput(heard);
          setVoiceNote(`已填入「${heard}」，点「检查」确认。`);
          return;
        }
        const letterIdx = ["a", "b", "c", "d"].indexOf(heard.replace(/^option\s+/, ""));
        const byText = current.options.findIndex((o) => {
          const n = o.toLowerCase().replace(/[.!?,]/g, "");
          return n === heard || n.includes(heard) || heard.includes(n);
        });
        const idx = letterIdx >= 0 ? letterIdx : byText;
        if (idx >= 0 && idx < current.options.length) {
          setVoiceNote("");
          pick(idx);
        } else {
          setVoiceNote(`听到「${raw.trim()}」，和选项对不上，再说一次或直接点选。`);
        }
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => {
        setListening(false);
        setVoiceNote("语音输入没有成功，直接点选答案就可以。");
      };
      setVoiceNote("");
      setListening(true);
      rec.start();
    } catch {
      setListening(false);
      setVoiceNote("语音输入启动失败，直接点选答案就可以。");
    }
  };

  const qSecs = isMatch ? 0 : secsFor(current);
  const pct = qSecs > 0 ? (secondsLeft / qSecs) * 100 : 0;
  const totalSecs = Math.max(0, Math.ceil(secondsLeft));
  const timerText = `${Math.floor(totalSecs / 60)}:${String(totalSecs % 60).padStart(2, "0")}`;
  const dictCorrect = dictChecked === true;
  const blankCorrect = blankChecked === true;
  const wasCorrect = isDict ? dictCorrect : isBlank ? blankCorrect : isMatch ? !matchErrorRef.current : picked === current.answer;
  const timeoutMiss = !isDict && !isBlank && !isMatch && timedOut && picked === null;

  // 填空题题干：完整句里把目标词渲染成浅青高亮块，作答前只显示空格，
  // 其余单词带点线（在词库里的可点查词义）
  const renderBlankSentence = () => {
    const sentence = current.sentence ?? "";
    const ans = current.answerText ?? "";
    const tokens = sentence.split(/(\s+)/);
    const strip = (t: string) => t.replace(/^[^A-Za-z]+|[^A-Za-z'-]+$/g, "");
    let targetIdx = ans ? tokens.findIndex((t) => strip(t).toLowerCase() === ans.toLowerCase()) : -1;
    if (targetIdx < 0 && ans) targetIdx = tokens.findIndex((t) => t.toLowerCase().includes(ans.toLowerCase()));
    return tokens.map((part, i) => {
      if (i === targetIdx) {
        const at = part.toLowerCase().indexOf(ans.toLowerCase());
        const pre = at > 0 ? part.slice(0, at) : "";
        const post = at >= 0 ? part.slice(at + ans.length) : "";
        return (
          <span key={i}>
            {pre}
            <span className="mx-0.5 inline-block rounded-lg bg-[var(--mint)] px-2 py-0.5 text-[var(--teal-dark)] underline decoration-[var(--teal)] decoration-[3px] underline-offset-8">
              {blankChecked !== null ? ans : "___"}
            </span>
            {post}
          </span>
        );
      }
      const clean = part.replace(/[^A-Za-z'-]/g, "");
      const hit = clean.length > 1 ? WORD_MAP.get(clean.toLowerCase()) : undefined;
      if (!hit) {
        return (
          <span key={i} className={/\S/.test(part) ? "underline decoration-dotted decoration-[#9db8b0] underline-offset-8" : undefined}>
            {part}
          </span>
        );
      }
      return (
        <button
          key={i}
          type="button"
          onClick={() => setLookup({ word: hit.word, meaning: hit.meaning, phonetic: hit.phonetic })}
          aria-label={`查询单词 ${hit.word} 的意思`}
          className="rounded px-0.5 underline decoration-dotted decoration-[#9db8b0] underline-offset-8"
        >
          {part}
        </button>
      );
    });
  };

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
        <button
          type="button"
          onClick={exit}
          aria-label="退出测验（本次尝试将记入历史）"
          className="min-h-10 justify-self-start rounded-full border-2 border-[var(--border)] bg-white px-4 py-1.5 font-bold text-[var(--dim)]"
        >
          ✕ 退出
        </button>
        <div className="text-center">
          <p className="text-xs font-black tracking-[0.25em] text-[var(--dim)]">
            第 {index + 1}/{questions.length} 题
          </p>
          {isMatch ? (
            <>
              <p className="font-display mt-0.5 text-4xl leading-none text-[var(--ink)]">连线配对</p>
              <p className="mt-2.5 text-sm font-bold text-[var(--dim)]">
                不计时 · 已配对 {matchDone.size}/{current.pairs?.length ?? 0}
              </p>
            </>
          ) : (
            <>
              <p
                className={`font-display mt-0.5 text-4xl leading-none ${secondsLeft <= 5 ? "animate-urgency text-[var(--coral)]" : "text-[var(--ink)]"}`}
                role="timer"
                aria-label={`本题剩余 ${totalSecs} 秒`}
              >
                {timerText}
              </p>
              <div
                className="mx-auto mt-2.5 h-1.5 w-44 overflow-hidden rounded-full bg-[var(--mint-deep)] sm:w-56"
                role="progressbar"
                aria-valuenow={Math.round(pct)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="本题剩余时间"
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-100 ease-linear ${secondsLeft <= 5 ? "bg-[var(--coral)]" : "bg-[var(--teal)]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            const next = !muted;
            setMuted(next);
            try {
              localStorage.setItem("quiz-muted", next ? "1" : "0");
            } catch {
              /* ignore */
            }
          }}
          aria-label={muted ? "取消静音（音效关）" : "静音（音效开）"}
          aria-pressed={muted}
          className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border-2 border-[var(--teal)] bg-white text-base"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <div key={index} className="animate-question-in">
      <h2 className="font-display mt-7 text-3xl text-[var(--ink)] sm:text-4xl">
        {isDict ? "听发音，拼写单词。" : isBlank ? "填入合适的词。" : isMatch ? "把每个单词和它的意思连起来。" : "选择正确的选项。"}
      </h2>
      {isDict ? (
        <div className="mt-5">
          <div className="rounded-l-md rounded-r-3xl border-l-4 border-[var(--teal)] bg-[#f6f2e7] px-5 py-4">
            <p className="text-xl font-bold leading-relaxed text-[#0b2e2a]">{current.q}</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={playDictation}
              disabled={listensLeft !== null && listensLeft <= 0}
              className="min-h-11 rounded-full bg-[var(--teal)] px-5 py-2 font-bold text-white disabled:opacity-40"
              aria-label={listensLeft !== null ? `再听一遍发音（最多听 ${maxListens} 遍，还可听 ${listensLeft} 次）` : "再听一遍发音"}
            >
              🔊 再听一遍{listensLeft !== null ? `（还可听 ${listensLeft} 次）` : ""}
            </button>
            <label className="min-w-52 flex-1">
              <span className="sr-only">输入你听到的单词</span>
              <input
                type="text"
                value={dictInput}
                disabled={dictChecked !== null}
                onChange={(e) => setDictInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") checkDict();
                }}
                placeholder="输入你听到的单词…"
                className="min-h-11 w-full rounded-2xl border-2 border-[var(--border)] bg-white px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--teal)]"
              />
            </label>
            <button
              type="button"
              onClick={checkDict}
              disabled={dictChecked !== null || !dictInput.trim()}
              className="min-h-11 rounded-full bg-[var(--ink)] px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              检查
            </button>
          </div>
          {dictChecked !== null ? (
            <p className={`mt-3 font-bold ${dictCorrect ? "text-[var(--teal-dark)]" : "animate-shake text-[var(--coral)]"}`}>
              {dictCorrect ? "🎉 拼对了！" : `拼错了，正确拼写是 ${current.answerText}`}
            </p>
          ) : null}
        </div>
      ) : isBlank ? (
        <div className="mt-5">
          <div className="rounded-l-md rounded-r-3xl border-l-4 border-[var(--teal)] bg-[var(--surface)] px-5 py-5 shadow-sm sm:px-7">
            <p className="text-xs font-black tracking-[0.3em] text-[#e23b3b]">填空</p>
            <p className="font-display mt-3 text-[26px] font-black leading-snug text-[var(--ink)] sm:text-4xl">
              {renderBlankSentence()}
            </p>
          </div>
          {current.baseWord ? <p className="mt-2 text-sm text-[var(--dim)]">提示：{current.baseWord}</p> : null}
          {lookup ? (
            <p className="mt-2 rounded-2xl bg-[var(--mint)] px-4 py-2 text-sm text-[var(--ink)]" role="status">
              <strong>{lookup.word}</strong> {lookup.phonetic} · {lookup.meaning}
              <button type="button" onClick={() => setLookup(null)} className="ml-2 font-bold text-[var(--teal-dark)]" aria-label="关闭查词">
                收起
              </button>
            </p>
          ) : null}

          <div className="mt-6">
            <label htmlFor="blank-answer" className="font-bold text-[var(--ink)]">
              你的答案
            </label>
            <div className={`relative mt-2 ${blankChecked === false ? "animate-shake" : ""}`}>
              <input
                id="blank-answer"
                type="text"
                value={blankInput}
                disabled={blankChecked !== null}
                onChange={(e) => setBlankInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") checkBlank();
                }}
                placeholder="输入答案…"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className={`min-h-16 w-full rounded-2xl border-2 py-3 pl-5 pr-14 text-xl font-bold text-[var(--ink)] outline-none transition-colors ${
                  blankChecked === true
                    ? "border-[var(--teal)] bg-[#e3f4ef]"
                    : blankChecked === false
                      ? "border-[var(--coral)] bg-[#fdeee8]"
                      : "border-[var(--border)] bg-white focus:border-[var(--teal)]"
                }`}
              />
              {blankChecked === true ? (
                <span className="animate-check-pop absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-black text-[var(--teal-dark)]" aria-hidden>
                  ✓
                </span>
              ) : null}
              {blankChecked === false ? (
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-black text-[var(--coral)]" aria-hidden>
                  ✗
                </span>
              ) : null}
            </div>
            {blankChecked === false ? (
              <p className="animate-slide-up mt-2.5 font-bold text-[var(--coral)]" role="status">
                正确答案：<span className="text-[var(--teal-dark)]">{current.answerText}</span>
              </p>
            ) : null}
            {blankChecked === null ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={checkBlank}
                  disabled={!blankInput.trim()}
                  className="min-h-12 rounded-full bg-[var(--teal)] px-7 py-2.5 font-black text-white disabled:opacity-40"
                >
                  检查
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : isMatch ? (
        <div className="mt-5">
          <div className="rounded-l-md rounded-r-3xl border-l-4 border-[var(--teal)] bg-[#f6f2e7] px-5 py-4">
            <p className="text-xl font-bold leading-relaxed text-[#0b2e2a]">{current.q}</p>
            <p className="mt-1 text-sm text-[var(--dim)]">先点左边的单词，再点右边对应的意思；全部连对才算答对。</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="grid content-start gap-3">
              {(current.pairs ?? []).map((p, i) => {
                const done = matchDone.has(i);
                const sel = matchSel === i;
                return (
                  <button
                    key={p.left}
                    type="button"
                    disabled={done || matchFinished}
                    onClick={() => pickMatchLeft(i)}
                    aria-pressed={sel}
                    aria-label={`单词 ${p.left}${done ? "，已配对" : ""}`}
                    className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left text-lg font-bold transition-colors ${
                      done
                        ? "border-[var(--teal)] bg-[#e3f4ef] text-[var(--teal-dark)]"
                        : sel
                          ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                          : "border-[var(--border)] bg-white text-[var(--ink)] hover:border-[var(--teal)]"
                    }`}
                  >
                    {p.left}
                    {done ? " ✓" : ""}
                  </button>
                );
              })}
            </div>
            <div className="grid content-start gap-3">
              {(current.matchRight ?? []).map((r) => {
                const done = matchedRights.has(r);
                const wrong = matchWrong === r;
                return (
                  <button
                    key={r}
                    type="button"
                    disabled={done || matchFinished}
                    onClick={() => pickMatchRight(r)}
                    aria-label={`意思 ${r}${done ? "，已配对" : ""}`}
                    className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left text-lg font-bold transition-colors ${
                      wrong
                        ? "animate-shake border-[var(--coral)] bg-[#fdeee8] text-[var(--coral)]"
                        : done
                          ? "border-[var(--teal)] bg-[#e3f4ef] text-[var(--teal-dark)]"
                          : "border-[var(--border)] bg-white text-[var(--ink)] hover:border-[var(--teal)]"
                    }`}
                  >
                    {r}
                    {done ? " ✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>
          {matchFinished ? (
            <p className={`mt-4 font-bold ${matchErrorRef.current ? "text-[var(--coral)]" : "text-[var(--teal-dark)]"}`} role="status">
              {matchErrorRef.current ? "全部连完了，但中间连错过，这题算答错——看下面的解析再记一遍。" : "🎉 全部连对了！"}
            </p>
          ) : null}
        </div>
      ) : (
        <>
          <div className="mt-5 rounded-l-md rounded-r-3xl border-l-4 border-[var(--teal)] bg-[#f6f2e7] px-5 py-5 sm:px-7">
          <p className="text-[22px] font-bold leading-relaxed text-[#0b2e2a] sm:text-2xl">
            {stemWords.map((part, i) => {
              const clean = part.replace(/[^A-Za-z'-]/g, "");
              const hit = clean.length > 1 ? WORD_MAP.get(clean.toLowerCase()) : undefined;
              if (!hit) return <span key={i}>{part}</span>;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLookup({ word: hit.word, meaning: hit.meaning, phonetic: hit.phonetic })}
                  aria-label={`查询单词 ${hit.word} 的意思`}
                  className="rounded px-0.5 underline decoration-[var(--teal)] decoration-dotted underline-offset-4"
                >
                  {part}
                </button>
              );
            })}
          </p>
          </div>
          {lookup ? (
            <p className="mt-2 rounded-2xl bg-[var(--mint)] px-4 py-2 text-sm text-[var(--ink)]" role="status">
              <strong>{lookup.word}</strong> {lookup.phonetic} · {lookup.meaning}
              <button type="button" onClick={() => setLookup(null)} className="ml-2 font-bold text-[var(--teal-dark)]" aria-label="关闭查词">
                收起
              </button>
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {current.options.map((opt, i) => {
              const isAnswer = i === current.answer;
              const isPicked = picked === i;
              if (i === removedOption) {
                return (
                  <div
                    key={i}
                    aria-label={`选项 ${String.fromCharCode(65 + i)} 已被提示卡去掉`}
                    className="flex min-h-16 items-center gap-3.5 rounded-3xl border-2 border-dashed border-[var(--border)] px-4 py-3.5 opacity-45"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8e6da] text-base font-black text-[var(--dim)]">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="min-w-0 flex-1 text-lg font-bold text-[var(--dim)] line-through">{opt}</span>
                    <span className="shrink-0 text-xs font-bold text-[var(--dim)]">已被提示卡去掉</span>
                  </div>
                );
              }
              let cls = "border-[var(--border)] bg-white hover:border-[var(--teal)] hover:shadow-md";
              if (answered && isAnswer) cls = "border-[var(--teal)] bg-[#e3f4ef] shadow-sm";
              else if (answered && isPicked && !isAnswer) cls = "border-[var(--coral)] bg-[#fdeee8]";
              else if (answered) cls = "border-[var(--border)] bg-white opacity-50";
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  disabled={answered}
                  aria-label={`选项 ${String.fromCharCode(65 + i)}：${opt}`}
                  className={`flex min-h-16 items-center gap-3.5 rounded-3xl border-2 px-4 py-3.5 text-left transition-all duration-300 ${cls} ${answered && isPicked && !isAnswer ? "animate-shake" : ""}`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-black transition-colors duration-300 ${
                      answered && isAnswer
                        ? "bg-[var(--teal)] text-white"
                        : answered && isPicked && !isAnswer
                          ? "bg-[var(--coral)] text-white"
                          : "bg-[var(--mint)] text-[var(--teal-dark)]"
                    }`}
                  >
                    {answered && isAnswer ? "✓" : answered && isPicked && !isAnswer ? "✗" : String.fromCharCode(65 + i)}
                  </span>
                  <span className="min-w-0 flex-1 text-lg font-bold text-[var(--ink)]">{opt}</span>
                </button>
              );
            })}
          </div>
          {!answered && !hintUsedThisQuiz && (hintLeft ?? 0) > 0 ? (
            <div className="mt-4">
              <button
                type="button"
                onClick={useHint}
                disabled={useCardMut.isPending}
                aria-label={`使用提示卡（背包里还有 ${hintLeft ?? 0} 张）：去掉一个错误选项`}
                className="hover-lift min-h-11 rounded-full bg-[#fdf0cd] px-5 py-2 font-black text-[#8a6100] disabled:opacity-50"
              >
                💡 用提示卡（剩 {hintLeft} 张）· 去掉一个错误选项
              </button>
            </div>
          ) : null}
        </>
      )}

      {cardNote ? (
        <p className="animate-slide-up mt-4 rounded-2xl bg-[#fdf6d8] px-4 py-2.5 font-bold text-[#8a6100]" role="status">
          {cardNote}
        </p>
      ) : null}

      {answered ? (
        <>
          <div className="animate-slide-up mt-5 rounded-3xl border border-[var(--border)] bg-white p-5">
            <p className={`font-display text-lg ${wasCorrect || shieldActive ? "text-[var(--teal-dark)]" : "text-[var(--coral)]"}`}>
              {isDict
                ? dictCorrect
                  ? "🎉 答对了！"
                  : current.noExplain
                    ? "答错了。"
                    : "答错了，看下面的解释。"
                : isBlank
                  ? blankCorrect
                    ? "🎉 答对了！"
                    : `答错了，正确答案是 ${current.answerText}。`
                  : isMatch
                    ? !matchErrorRef.current
                      ? "🎉 答对了！"
                      : "连错过，这题算答错。"
                    : timeoutMiss
                      ? "⏰ 时间到，这题算答错。"
                      : picked === current.answer
                        ? "🎉 答对了！"
                        : "答错了，没关系，看下面的解释。"}
            </p>
            {current.noExplain ? null : (
              <>
                <p className="mt-3 text-xs font-black tracking-[0.25em] text-[var(--dim)]">解释</p>
                <p className="mt-1.5 leading-relaxed text-[var(--ink)]">{current.explain}</p>
              </>
            )}
            {!wasCorrect && !shieldActive && !shieldUsedThisQuiz && (shieldLeft ?? 0) > 0 ? (
              <button
                type="button"
                onClick={useShield}
                disabled={useCardMut.isPending}
                aria-label={`使用免错卡（背包里还有 ${shieldLeft ?? 0} 张）：这题改判答对`}
                className="hover-lift mt-4 min-h-11 rounded-full bg-[var(--teal)] px-5 py-2 font-black text-white disabled:opacity-50"
              >
                🛡️ 用免错卡（剩 {shieldLeft} 张）· 这题算答对
              </button>
            ) : null}
            {shieldActive ? (
              <p className="mt-3 font-bold text-[var(--teal-dark)]">🛡️ 免错卡已生效，这题计入答对。</p>
            ) : null}
          </div>
          <div className="animate-slide-up mt-5 text-center">
            <button
              type="button"
              onClick={() => advanceRef.current()}
              className="hover-lift min-h-14 rounded-full bg-[var(--ink)] px-10 py-3 text-lg font-black text-white"
            >
              {index + 1 >= questions.length ? "查看结果" : "下一题 →"}
            </button>
          </div>
        </>
      ) : null}

      <div className="mt-7 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={startVoice}
          aria-label="语音作答：点一下，说出你的答案"
          aria-pressed={listening}
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-2xl text-white shadow-lg transition ${listening ? "animate-pulse-ring" : "hover-lift"}`}
        >
          🎤
        </button>
        <p className="text-xs text-[var(--dim)]">{listening ? "正在聆听，说出选项字母或答案…" : "点麦克风，可以说出答案"}</p>
        {voiceNote ? (
          <p className="animate-slide-up text-sm font-bold text-[var(--teal-dark)]" role="status">
            {voiceNote}
          </p>
        ) : null}
      </div>
      </div>

      <button
        type="button"
        onClick={replayStem}
        aria-label="重新播放题干朗读"
        className="hover-lift fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-xl text-white shadow-xl"
      >
        ⟳
      </button>
    </div>
  );
}
