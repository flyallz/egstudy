import { useMemo, useState } from "react";
import { speak } from "../lib";
import { CEFR_LEVELS } from "../data/content";
import { ALL_VOCAB_LESSONS, GRAMMAR_101 } from "../data/catalog";

interface MaterialItem {
  id: string;
  group: "语法" | "词汇主题" | "词汇CEFR";
  format: "讲解课程" | "词卡集";
  level: string;
  title: string;
  sub: string;
  kind: "grammar" | "vocab";
}

export function MaterialsView({
  onOpenGrammar,
  onOpenVocab,
}: {
  onOpenGrammar: (id: string) => void;
  onOpenVocab: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>("全部");
  const [level, setLevel] = useState<string>("全部");
  const [format, setFormat] = useState<string>("全部");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");

  const items = useMemo<MaterialItem[]>(() => {
    const g: MaterialItem[] = GRAMMAR_101.map((l) => ({
      id: l.id,
      group: "语法",
      format: "讲解课程",
      level: l.level,
      title: `${l.level} · ${l.titleCn}`,
      sub: l.titleEn,
      kind: "grammar",
    }));
    const v: MaterialItem[] = ALL_VOCAB_LESSONS.map((s) => ({
      id: s.id,
      group: s.kind === "vocab-topic" ? "词汇主题" : "词汇CEFR",
      format: "词卡集",
      level: s.level ?? "主题",
      title: s.titleCn,
      sub: `${s.titleEn} · ${s.words.length} 个词`,
      kind: "vocab",
    }));
    return [...g, ...v];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (group !== "全部" && it.group !== group) return false;
      if (level !== "全部" && it.level !== level) return false;
      if (format !== "全部" && it.format !== format) return false;
      if (q && !it.title.toLowerCase().includes(q) && !it.sub.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [items, query, group, level, format]);

  const selected = items.find((i) => i.id === selectedId) ?? null;
  const grammar = selected?.kind === "grammar" ? GRAMMAR_101.find((l) => l.id === selected.id) : undefined;
  const vocab = selected?.kind === "vocab" ? ALL_VOCAB_LESSONS.find((s) => s.id === selected.id) : undefined;

  const playNarration = () => {
    if (grammar) {
      const lines: string[] = [];
      if (grammar.openingExample?.en) lines.push(grammar.openingExample.en);
      for (const sec of grammar.theory ?? []) {
        for (const ex of sec.examples ?? []) lines.push(ex.en);
      }
      const queue = lines.slice(0, 6);
      queue.forEach((line, i) => {
        window.setTimeout(() => {
          setCaption(line);
          speak(line);
        }, i * 2600);
      });
      if (queue.length === 0) setCaption("本课暂无可朗读的例句。");
    } else if (vocab) {
      vocab.words.slice(0, 6).forEach((wd, i) => {
        window.setTimeout(() => {
          setCaption(`${wd.word} — ${wd.meaning}`);
          speak(wd.word);
        }, i * 2200);
      });
    }
  };

  const selectCls = "min-h-11 rounded-full border border-[var(--border)] bg-white px-4 py-2 font-bold text-[var(--ink)]";

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl text-[var(--ink)] sm:text-4xl">学习资料</h1>
      <p className="mt-2 text-[var(--dim)]">
        全站 {GRAMMAR_101.length} 节语法课与 {ALL_VOCAB_LESSONS.length} 组词汇课的资料索引。点开任意一条，看视频讲解区与文档区，或直接进入课程。
      </p>

      <div className="mt-5 grid gap-3">
        <label>
          <span className="sr-only">搜索资料</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索课程名，如 Present simple / 教育"
            className="min-h-11 w-full rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--teal)]"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 text-sm font-bold text-[var(--dim)]">
            分组
            <select value={group} onChange={(e) => setGroup(e.target.value)} className={selectCls} aria-label="按分组筛选">
              {["全部", "语法", "词汇主题", "词汇CEFR"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-[var(--dim)]">
            级别
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectCls} aria-label="按级别筛选">
              {["全部", ...CEFR_LEVELS, "主题"].map((o: string) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-[var(--dim)]">
            格式
            <select value={format} onChange={(e) => setFormat(e.target.value)} className={selectCls} aria-label="按格式筛选">
              {["全部", "讲解课程", "词卡集"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </label>
          <span className="ml-auto self-center text-sm text-[var(--dim)]">共 {filtered.length} 条</span>
        </div>
      </div>

      {selected ? (
        <section className="mt-6 rounded-[2rem] border-2 border-[var(--teal)] bg-[var(--surface)] p-5 sm:p-6" aria-label="资料详情">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl text-[var(--ink)]">{selected.title}</h2>
              <p className="mt-1 text-sm text-[var(--dim)]">{selected.sub} · {selected.group} · {selected.format}</p>
            </div>
            <button type="button" onClick={() => setSelectedId(null)} className="min-h-10 rounded-full bg-[var(--mint)] px-4 py-1.5 font-bold text-[var(--teal-dark)]">
              收起详情
            </button>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl bg-[var(--ink)] p-5 text-white">
              <p className="text-sm font-bold text-[#9fb8b0]">视频区 · 语音讲解</p>
              <p className="mt-3 min-h-16 font-display text-xl leading-snug">{caption || "点播放，听本课核心例句或单词的朗读讲解。"}</p>
              <button type="button" onClick={playNarration} className="mt-3 min-h-11 rounded-full bg-[var(--mustard)] px-6 py-2 font-bold text-[var(--ink)]">
                ▶ 播放讲解
              </button>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-white p-5">
              <p className="text-sm font-bold text-[var(--dim)]">文档区</p>
              {grammar ? (
                <div className="mt-2 max-h-56 overflow-y-auto text-sm leading-relaxed text-[var(--ink)]">
                  <p className="font-bold">{grammar.intro}</p>
                  {(grammar.keyPoints ?? []).map((kp) => (
                    <p key={kp} className="mt-1.5">✓ {kp}</p>
                  ))}
                </div>
              ) : vocab ? (
                <ul className="mt-2 max-h-56 divide-y divide-[var(--border)] overflow-y-auto text-sm">
                  {vocab.words.map((wd) => (
                    <li key={wd.word} className="flex items-baseline justify-between gap-2 py-1.5">
                      <span className="font-bold text-[var(--ink)]">{wd.word} <span className="font-medium text-[var(--dim)]">{wd.phonetic}</span></span>
                      <span className="text-[var(--dim)]">{wd.meaning}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={() => (selected.kind === "grammar" ? onOpenGrammar(selected.id) : onOpenVocab(selected.id))}
            className="mt-4 min-h-12 w-full rounded-full bg-[var(--ink)] px-6 py-3 text-lg font-bold text-white"
          >
            进入课程 →
          </button>
        </section>
      ) : null}

      <ul className="mt-6 grid gap-2">
        {filtered.slice(0, 120).map((it) => (
          <li key={`${it.kind}-${it.id}`}>
            <button
              type="button"
              onClick={() => {
                setSelectedId(it.id);
                setCaption("");
              }}
              aria-label={`查看资料详情：${it.title}`}
              className={`flex min-h-14 w-full items-center gap-3 rounded-3xl border px-4 py-3 text-left ${selectedId === it.id ? "border-[var(--teal)] bg-[var(--mint)]" : "border-[var(--border)] bg-[var(--surface)]"}`}
            >
              <span className="rounded-xl bg-[var(--ink)] px-2.5 py-1 text-xs font-black text-white">{it.level}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold text-[var(--ink)]">{it.title}</span>
                <span className="block truncate text-sm text-[var(--dim)]">{it.sub}</span>
              </span>
              <span className="shrink-0 rounded-full bg-[var(--mint)] px-2.5 py-0.5 text-xs font-bold text-[var(--teal-dark)]">{it.format}</span>
            </button>
          </li>
        ))}
      </ul>
      {filtered.length > 120 ? <p className="mt-3 text-center text-sm text-[var(--dim)]">只显示前 120 条，用搜索或筛选缩小范围。</p> : null}
      {filtered.length === 0 ? <p className="mt-6 text-center text-[var(--dim)]">没有符合筛选的资料，调整筛选试试。</p> : null}
    </div>
  );
}
