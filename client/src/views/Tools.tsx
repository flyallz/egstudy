import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiResponse } from "../api";
import { todayStr } from "../lib";

type GradeResult = ApiResponse<typeof api, "gradeWriting">;

const SAMPLE_PROMPTS = [
  "Some people believe that university education should be free for all students. To what extent do you agree or disagree?",
  "Many people think that social media has replaced face-to-face communication. Discuss both views and give your own opinion.",
  "In some countries, many people choose to live alone nowadays. Is this a positive or negative development?",
];

const MIN_WORDS = 250;
const MONTHLY_LIMIT = 15;

function BandBar({ label, en, value }: { label: string; en: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-bold text-[var(--ink)]">
          {label} <span className="text-xs font-medium text-[var(--dim)]">{en}</span>
        </p>
        <p className="font-display text-xl text-[var(--teal-dark)]">{value.toFixed(1)}</p>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--mint-deep)]">
        <div className="h-full rounded-full bg-[var(--teal)]" style={{ width: `${(value / 9) * 100}%` }} />
      </div>
    </div>
  );
}

const CRITERIA = [
  { cn: "任务完成", en: "Task Response", desc: "是否完整回应题目、立场是否明确、论证是否充分展开。" },
  { cn: "连贯衔接", en: "Coherence & Cohesion", desc: "段落安排是否合理、衔接词是否自然准确、指代是否清楚。" },
  { cn: "词汇", en: "Lexical Resource", desc: "词汇的丰富度、搭配地道程度与拼写准确性。" },
  { cn: "语法范围与准确性", en: "Grammatical Range & Accuracy", desc: "句式是否多样、复杂句是否准确、错误是否影响理解。" },
];

export function ToolsView() {
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0]!);
  const [essay, setEssay] = useState("");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [blockedMsg, setBlockedMsg] = useState("");

  const history = useQuery({
    queryKey: ["writing-history"],
    queryFn: () => api.getWritingHistory({ limit: 10 }),
  });
  const progress = useQuery({
    queryKey: ["progress"],
    queryFn: () => api.getProgress({}),
  });
  const usedThisMonth = progress.data?.writingThisMonth ?? 0;
  const quotaLeft = Math.max(0, MONTHLY_LIMIT - usedThisMonth);

  const grade = useMutation({
    mutationFn: async () => await api.gradeWriting({ prompt, essay, today: todayStr() }),
    onSuccess: (r) => {
      if (r.blocked) {
        setBlockedMsg(r.message);
        setResult(null);
      } else {
        setBlockedMsg("");
        setResult(r);
      }
      queryClient.invalidateQueries({ queryKey: ["writing-history"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const canSubmit = prompt.trim().length >= 10 && wordCount >= MIN_WORDS && quotaLeft > 0 && !grade.isPending;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl text-[var(--ink)] sm:text-4xl">工具</h1>
      <p className="mt-2 text-[var(--dim)]">本站工具只有一项：雅思写作 Task 2 批改。每月限 {MONTHLY_LIMIT} 次，本月已用 {usedThisMonth} 次，还剩 {quotaLeft} 次。</p>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <h2 className="font-display text-2xl text-[var(--ink)]">雅思作文批改 · IELTS Writing Task 2</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrompt(p)}
                className={`min-h-9 rounded-full px-4 py-1.5 text-sm font-bold ${prompt === p ? "bg-[var(--ink)] text-white" : "bg-[var(--mint)] text-[var(--teal-dark)]"}`}
              >
                示例题目 {i + 1}
              </button>
            ))}
          </div>

          <label className="mt-4 block">
            <span className="font-bold text-[var(--ink)]">题目（Prompt）</span>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-white p-3.5 leading-relaxed text-[var(--ink)] outline-none focus:border-[var(--teal)]"
              aria-label="作文题目"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-[var(--ink)]">
              你的作文（Essay）· 当前 {wordCount} 词
              {wordCount < MIN_WORDS ? <span className="text-[var(--coral)]">（最少 {MIN_WORDS} 词，还差 {MIN_WORDS - wordCount} 词）</span> : <span className="text-[var(--teal-dark)]">（已达到 {MIN_WORDS} 词）</span>}
            </span>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              rows={12}
              placeholder="Write your essay here in English (at least 250 words)…"
              className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-white p-3.5 leading-relaxed text-[var(--ink)] outline-none focus:border-[var(--teal)]"
              aria-label="你的英文作文"
            />
          </label>

          {blockedMsg ? (
            <p className="mt-3 rounded-2xl bg-[#fbe3da] p-3 text-sm font-medium text-[var(--coral)]" role="alert">{blockedMsg}</p>
          ) : null}
          {grade.isError ? (
            <p className="mt-3 rounded-2xl bg-[#fbe3da] p-3 text-sm font-medium text-[var(--coral)]">
              批改失败，请稍后重试。你的作文还保留在输入框里，不会丢失。
            </p>
          ) : null}

          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => grade.mutate()}
            className="mt-4 min-h-12 w-full rounded-full bg-[var(--ink)] px-6 py-3 text-lg font-bold text-white disabled:opacity-40"
          >
            {grade.isPending ? "正在按四项标准批改…" : quotaLeft <= 0 ? "本月额度已用完" : "开始批改 →"}
          </button>
        </section>

        <aside className="rounded-[2rem] bg-[var(--mint)] p-5 sm:p-6" aria-label="评分标准说明">
          <h2 className="font-display text-xl text-[var(--ink)]">评分标准 · 四项各占 25%</h2>
          <ul className="mt-4 grid gap-4">
            {CRITERIA.map((c) => (
              <li key={c.cn}>
                <p className="font-bold text-[var(--ink)]">
                  {c.cn} <span className="text-xs font-medium text-[var(--dim)]">{c.en} · 25%</span>
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-[var(--dim)]">{c.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-2xl bg-white/70 p-3.5 text-sm leading-relaxed text-[var(--dim)]">
            分数为 AI 预估，仅供自练参考，不代表雅思官方成绩。建议把每次批改的逐句修改抄进错题本，隔周重写同一题对比进步。
          </p>
        </aside>
      </div>

      {result ? (
        <section className="mt-5 rounded-[2rem] border-2 border-[var(--teal)] bg-[var(--surface)] p-5 sm:p-6" aria-label="批改结果">
          <div className="flex flex-wrap items-center gap-5">
            <div className="text-center">
              <p className="font-display text-6xl text-[var(--ink)]">{result.overallBand.toFixed(1)}</p>
              <p className="mt-1 text-sm font-bold text-[var(--dim)]">预估总分 Band（AI 预估）</p>
            </div>
            <p className="min-w-56 flex-1 leading-relaxed text-[var(--dim)]">{result.summary}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <BandBar label="任务完成" en="Task Response" value={result.taskResponse} />
            <BandBar label="连贯衔接" en="Coherence & Cohesion" value={result.coherenceCohesion} />
            <BandBar label="词汇" en="Lexical Resource" value={result.lexicalResource} />
            <BandBar label="语法范围与准确性" en="Grammatical Range & Accuracy" value={result.grammarAccuracy} />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg text-[var(--ink)]">写得好的地方</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[var(--dim)]">
                {result.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-[var(--ink)]">优先改进</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[var(--dim)]">
                {result.improvements.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {result.corrections.length > 0 ? (
            <div className="mt-6">
              <h3 className="font-display text-lg text-[var(--ink)]">逐句修改</h3>
              <ul className="mt-2 grid gap-3">
                {result.corrections.map((c, i) => (
                  <li key={i} className="rounded-2xl bg-[var(--mint)] p-4">
                    <p className="text-[var(--coral)] line-through decoration-[var(--coral)]/50">{c.original}</p>
                    <p className="mt-1 font-bold text-[var(--teal-dark)]">{c.corrected}</p>
                    <p className="mt-1 text-sm text-[var(--dim)]">{c.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6">
            <h3 className="font-display text-lg text-[var(--ink)]">按你的观点重写的高分版本</h3>
            <div className="mt-2 whitespace-pre-wrap rounded-2xl border border-[var(--border)] bg-white p-4 leading-relaxed text-[var(--ink)]">
              {result.rewrite}
            </div>
          </div>
        </section>
      ) : null}

      {history.data && history.data.items.length > 0 ? (
        <section className="mt-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="font-display text-lg text-[var(--ink)]">批改记录</h3>
          <ul className="mt-2 divide-y divide-[var(--border)]">
            {history.data.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] font-display text-white">
                  {item.overallBand.toFixed(1)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[var(--ink)]">{item.prompt}</p>
                  <p className="truncate text-sm text-[var(--dim)]">{item.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
