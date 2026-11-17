import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { speak, todayStr } from "../lib";

export interface DeckWord {
  wordKey: string;
  word: string;
  phonetic: string;
  pos: string;
  meaning: string;
  example: string;
  exampleCn: string;
  source: string;
}

type MarkMap = Record<string, "known" | "learning">;

export function ReviewView({
  deck,
  marks,
  onGoRoadmap,
}: {
  deck: DeckWord[];
  marks: MarkMap;
  onGoRoadmap: () => void;
}) {
  const queryClient = useQueryClient();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [form, setForm] = useState({ word: "", phonetic: "", pos: "", meaning: "", example: "", exampleCn: "" });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["progress"] });
  const mark = useMutation({
    mutationFn: async (args: { wordKey: string; status: "known" | "learning" }) =>
      await api.markWord({ ...args, today: todayStr() }),
    onSuccess: invalidate,
  });
  const create = useMutation({
    mutationFn: async () => await api.addToReview({ ...form, source: "custom" as const }),
    onSuccess: () => {
      invalidate();
      setShowForm(false);
      setForm({ word: "", phonetic: "", pos: "", meaning: "", example: "", exampleCn: "" });
    },
  });
  const remove = useMutation({
    mutationFn: async (wordKey: string) => await api.removeFromReview({ wordKey }),
    onSuccess: invalidate,
  });

  // 复习顺序：先「还要练」，再未标记，最后已掌握
  const queue = useMemo(() => {
    const rank = (w: DeckWord) => {
      const s = marks[w.wordKey];
      return s === "learning" ? 0 : s === "known" ? 2 : 1;
    };
    return [...deck].sort((a, b) => rank(a) - rank(b));
  }, [deck, marks]);

  const knownCount = deck.filter((w) => marks[w.wordKey] === "known").length;
  const card = started && queue.length > 0 ? queue[index % queue.length] : undefined;

  const advance = (status: "known" | "learning") => {
    if (!card) return;
    mark.mutate({ wordKey: card.wordKey, status });
    setDoneCount((n) => n + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-[var(--ink)] sm:text-4xl">复习词卡集</h1>
        <button
          type="button"
          onClick={() => setShowGuide(true)}
          className="min-h-10 rounded-full bg-[var(--mint)] px-4 py-1.5 font-bold text-[var(--teal-dark)]"
        >
          使用指南
        </button>
      </div>
      <p className="mt-2 text-[var(--dim)]">
        牌组里共 {deck.length} 张卡，其中已记住 {knownCount} 张。本次已复习 {doneCount} 张。
      </p>

      {deck.length === 0 ? (
        <div className="mt-6 rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:p-8">
          <div className="text-5xl" aria-hidden>🗂️</div>
          <h2 className="font-display mt-3 text-2xl text-[var(--ink)]">暂无卡片</h2>
          <p className="mx-auto mt-2 max-w-md leading-relaxed text-[var(--dim)]">
            复习牌组还是空的。学词汇课时，在词卡下方点「加入复习」，单词就会来到这里；
            也可以点下面的「创建词卡」，把你在别处遇到的生词亲手加进来。
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setShowForm(true)} className="min-h-11 rounded-full bg-[var(--ink)] px-6 py-2 font-bold text-white">
              创建词卡
            </button>
            <button type="button" onClick={onGoRoadmap} className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-6 py-2 font-bold text-[var(--ink)]">
              回学习路径
            </button>
            <button type="button" disabled className="min-h-11 cursor-not-allowed rounded-full bg-[#e8e6da] px-6 py-2 font-bold text-[var(--dim)]">
              立即复习（暂无卡片）
            </button>
          </div>
        </div>
      ) : !started ? (
        <div className="mt-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="font-display text-2xl text-[var(--ink)]">牌组一览</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {queue.map((w) => (
              <li key={w.wordKey} className="flex items-center gap-3 rounded-2xl bg-[var(--mint)] px-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold text-[var(--ink)]">
                    {w.word} <span className="text-sm font-medium text-[var(--dim)]">{w.phonetic}</span>
                  </span>
                  <span className="block truncate text-sm text-[var(--dim)]">
                    {w.meaning}
                    {marks[w.wordKey] === "known" ? " · 已记住" : marks[w.wordKey] === "learning" ? " · 需复习" : w.source === "custom" ? " · 自建" : ""}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => remove.mutate(w.wordKey)}
                  aria-label={`把 ${w.word} 移出复习牌组`}
                  className="min-h-9 shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-[var(--coral)]"
                >
                  移出
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => setShowForm(true)} className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-6 py-2 font-bold text-[var(--ink)]">
              创建词卡
            </button>
            <button type="button" onClick={onGoRoadmap} className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-6 py-2 font-bold text-[var(--ink)]">
              回学习路径
            </button>
            <button
              type="button"
              onClick={() => {
                setStarted(true);
                setIndex(0);
                setFlipped(false);
              }}
              className="min-h-11 rounded-full bg-[var(--ink)] px-6 py-2 font-bold text-white"
            >
              立即复习 →
            </button>
          </div>
        </div>
      ) : card ? (
        <div className="mt-6">
          <div key={index} className="animate-card-in">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }}
            aria-label={flipped ? `词卡背面：${card.word}，${card.meaning}` : `词卡正面：${card.word}，点击翻面`}
            className="flip-scene w-full cursor-pointer"
          >
            <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
              <div className="flip-face min-h-64 rounded-[2rem] bg-[var(--ink)] p-6 text-center text-white" aria-hidden={flipped}>
                <p className="font-display mt-4 text-5xl">{card.word}</p>
                <p className="mt-2 text-lg text-[#c8d8d2]">{card.phonetic}</p>
                <p className="mt-1 inline-block rounded-full bg-[var(--mustard)] px-3 py-1 text-sm font-black text-[var(--ink)]">{card.pos}</p>
                <p className="mt-6 text-sm text-[#9fb8b0]">先回忆意思，再点卡片翻面确认</p>
              </div>
              <div className="flip-face flip-back min-h-64 rounded-[2rem] border-2 border-[var(--teal)] bg-[var(--surface)] p-6 text-center" aria-hidden={!flipped}>
                <p className="font-display text-3xl text-[var(--teal-dark)]">{card.meaning}</p>
                {card.example ? (
                  <>
                    <p className="mt-4 font-bold text-[var(--ink)]">{card.example}</p>
                    <p className="mt-1 text-sm text-[var(--dim)]">{card.exampleCn}</p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => speak(card.word)}
              aria-label={`朗读单词 ${card.word}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mint)] text-lg"
            >
              🔊
            </button>
            <button
              type="button"
              disabled={!flipped}
              onClick={() => advance("learning")}
              className="min-h-12 rounded-full border-2 border-[var(--coral)] bg-white px-6 py-2.5 font-bold text-[var(--coral)] disabled:opacity-40"
            >
              需复习
            </button>
            <button
              type="button"
              disabled={!flipped}
              onClick={() => advance("known")}
              className="min-h-12 rounded-full bg-[var(--teal)] px-6 py-2.5 font-bold text-white disabled:opacity-40"
            >
              已记住 ✓
            </button>
            <button
              type="button"
              onClick={() => setStarted(false)}
              className="min-h-12 rounded-full border-2 border-[var(--border)] bg-white px-5 py-2.5 font-bold text-[var(--dim)]"
            >
              结束复习
            </button>
          </div>
          {!flipped ? <p className="mt-2 text-center text-sm text-[var(--dim)]">翻面确认后，才能标记「需复习 / 已记住」。</p> : null}
        </div>
      ) : null}

      {showForm ? (
        <div className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="创建词卡">
          <form
            className="animate-modal-in w-full max-w-md rounded-[2rem] bg-[var(--surface)] p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (form.word.trim() && form.meaning.trim()) create.mutate();
            }}
          >
            <h2 className="font-display text-2xl text-[var(--ink)]">创建词卡</h2>
            <div className="mt-4 grid gap-3">
              {(
                [
                  ["word", "英文单词 *", "如 serendipity"],
                  ["phonetic", "音标", "如 /ˌserənˈdɪpəti/"],
                  ["pos", "词性", "如 n."],
                  ["meaning", "中文意思 *", "如 意外发现珍宝的运气"],
                  ["example", "例句（英文）", "如 We met by serendipity."],
                  ["exampleCn", "例句翻译", "如 我们是偶然相遇的。"],
                ] as const
              ).map(([key, label, ph]) => (
                <label key={key} className="block">
                  <span className="text-sm font-bold text-[var(--ink)]">{label}</span>
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={ph}
                    aria-label={label}
                    className="mt-1 min-h-11 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--teal)]"
                  />
                </label>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button type="submit" disabled={!form.word.trim() || !form.meaning.trim() || create.isPending} className="min-h-11 flex-1 rounded-full bg-[var(--ink)] px-5 py-2 font-bold text-white disabled:opacity-40">
                加入牌组
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-5 py-2 font-bold text-[var(--ink)]">
                取消
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {showGuide ? (
        <div className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="复习使用指南">
          <div className="animate-modal-in w-full max-w-md rounded-[2rem] bg-[var(--surface)] p-6">
            <h2 className="font-display text-2xl text-[var(--ink)]">使用指南 · 复习</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-[var(--dim)]">
              <li>牌组来自两个地方：词汇课里点「加入复习」的词卡，和你在这里自建的词卡。</li>
              <li>复习时先看正面回忆意思，再翻面确认，最后标记「已记住」或「需复习」。</li>
              <li>标记为「需复习」的词下次会排在最前面；「已记住」的词排在最后，方便抽查。</li>
              <li>每天复习 5 个词可以完成一个每日目标，攒满 5 个目标能开每日宝箱。</li>
            </ul>
            <button type="button" onClick={() => setShowGuide(false)} className="mt-5 min-h-11 w-full rounded-full bg-[var(--ink)] px-5 py-2 font-bold text-white">
              知道了
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
