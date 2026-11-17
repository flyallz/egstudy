import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export function HistoryView() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const progress = useQuery({
    queryKey: ["progress"],
    queryFn: () => api.getProgress({}),
  });
  const history = useQuery({
    queryKey: ["history", query],
    queryFn: () => api.getHistory({ query, limit: 100 }),
  });
  const clear = useMutation({
    mutationFn: async () => await api.clearHistory({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      setConfirmClear(false);
    },
  });

  const stats = progress.data?.historyStats;
  const accuracy =
    stats && stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl text-[var(--ink)] sm:text-4xl">历史</h1>
      <p className="mt-2 text-[var(--dim)]">
        每一次做题都会记在这里，包括中途退出的尝试。展开任意一条，可以逐题看对错与正确答案——这是本站的错题回顾入口。
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--ink)]">{stats?.totalAttempts ?? 0}</p>
          <p className="mt-1 text-sm text-[var(--dim)]">已做次数</p>
        </div>
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--teal-dark)]">{stats?.passedCount ?? 0}</p>
          <p className="mt-1 text-sm text-[var(--dim)]">通过次数（≥80 分）</p>
        </div>
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--ink)]">{stats?.avgScore ?? 0}</p>
          <p className="mt-1 text-sm text-[var(--dim)]">平均分（已完成）</p>
        </div>
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--ink)]">{accuracy}%</p>
          <p className="mt-1 text-sm text-[var(--dim)]">累计正确率</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="min-w-52 flex-1">
          <span className="sr-only">搜索历史记录</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="按课程名搜索，如 Present simple"
            className="min-h-11 w-full rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--teal)]"
          />
        </label>
        {confirmClear ? (
          <span className="flex items-center gap-2 text-sm">
            <span className="font-bold text-[var(--coral)]">确定清空全部历史？</span>
            <button type="button" onClick={() => clear.mutate()} className="min-h-10 rounded-full bg-[var(--coral)] px-4 py-1.5 font-bold text-white">
              确定清空
            </button>
            <button type="button" onClick={() => setConfirmClear(false)} className="min-h-10 rounded-full bg-[var(--mint)] px-4 py-1.5 font-bold text-[var(--teal-dark)]">
              取消
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmClear(true)}
            className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-5 py-2 font-bold text-[var(--coral)]"
          >
            清除历史
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-3">
        {(history.data?.items ?? []).map((item) => {
          const acc = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
          const open = openId === item.id;
          const date = new Date(item.createdAt);
          return (
            <article key={item.id} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
                aria-label={`${open ? "收起" : "展开"}记录：${item.title}`}
                className="flex w-full flex-wrap items-center gap-3 text-left"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-white ${
                    item.interrupted ? "bg-[#b8b2a0]" : item.score >= 80 ? "bg-[var(--teal)]" : "bg-[var(--mustard)] text-[var(--ink)]"
                  }`}
                >
                  {item.interrupted ? "!" : item.score}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold text-[var(--ink)]">{item.title}</span>
                  <span className="block text-sm text-[var(--dim)]">
                    {date.toLocaleDateString("zh-CN")} {date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                    {" · "}共 {item.total} 题 · 已答 {item.answered} 题
                    {item.difficulty ? ` · ${item.difficulty}` : ""}
                    {item.stars > 0 ? ` · ${"★".repeat(item.stars)}` : ""}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  {item.interrupted ? (
                    <span className="rounded-full bg-[#fbe3da] px-2.5 py-0.5 text-xs font-bold text-[var(--coral)]">已中断</span>
                  ) : (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${item.score >= 80 ? "bg-[var(--mint)] text-[var(--teal-dark)]" : "bg-[#fdf0cd] text-[#8a6100]"}`}>
                      {item.score >= 80 ? "已通过" : "未通过"}
                    </span>
                  )}
                  <span className="text-sm font-bold text-[var(--dim)]">正确率 {acc}%</span>
                </span>
                <span className="font-black text-[var(--teal)]" aria-hidden>{open ? "▴" : "▾"}</span>
              </button>
              {open ? (
                item.detail.length > 0 ? (
                  <ul className="mt-4 grid gap-2.5">
                    {item.detail.map((d, i) => {
                      const correct = d.picked !== null && d.picked === d.answer;
                      const isDict = d.options.length === 1;
                      const isBlankRec = d.q.startsWith("填空：");
                      const isMatchRec = d.q.startsWith("连线：");
                      const displayQ = isBlankRec || isMatchRec ? d.q.slice(3) : d.q;
                      return (
                        <li key={i} className={`rounded-2xl p-4 ${correct ? "bg-[var(--mint)]" : "bg-[#fdf3ee]"}`}>
                          <p className="font-bold text-[var(--ink)]">
                            {correct ? "✓" : "✗"} {i + 1}. {displayQ}
                          </p>
                          {isDict ? (
                            <p className="mt-1 text-sm text-[var(--dim)]">
                              {isMatchRec ? "正确配对：" : "正确答案："}<span className="font-bold text-[var(--teal-dark)]">{d.options[0]}</span>
                              {correct
                                ? isMatchRec
                                  ? " · 你全连对了"
                                  : isBlankRec
                                    ? " · 你填对了"
                                    : " · 你拼对了"
                                : isMatchRec
                                  ? " · 你当时没全连对"
                                  : isBlankRec
                                    ? " · 你当时没填对"
                                    : " · 你当时没拼对"}
                            </p>
                          ) : (
                            <p className="mt-1 text-sm text-[var(--dim)]">
                              你的答案：
                              <span className={correct ? "font-bold text-[var(--teal-dark)]" : "font-bold text-[var(--coral)]"}>
                                {d.picked !== null ? d.options[d.picked] : "未作答"}
                              </span>
                              {!correct ? (
                                <>
                                  {" · "}正确答案：<span className="font-bold text-[var(--teal-dark)]">{d.options[d.answer]}</span>
                                </>
                              ) : null}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-[var(--dim)]">这条记录没有逐题明细（如词卡学习记录）。</p>
                )
              ) : null}
            </article>
          );
        })}
        {history.data && history.data.items.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center text-[var(--dim)]">
            {query ? "没有匹配的历史记录，换个关键词试试。" : "还没有做题记录。去学习路径做一节课，这里就会出现第一条。"}
          </p>
        ) : null}
      </div>
    </div>
  );
}
