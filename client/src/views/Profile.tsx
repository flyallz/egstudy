import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { stageForXp, TREE_STAGES } from "../data/content";
import { FRAME_STYLES } from "../data/rewards";
import type { Appearance } from "../appearance";
import { BadgeWall, ShopSection } from "../components/Rewards";
import type { Settings } from "../settings";
import { tx } from "../settings";

export interface ProfileData {
  xp: number;
  streak: number;
  name: string;
  email: string;
  completedCount: number;
  totalLessons: number;
  grammarDone: number;
  grammarTotal: number;
  vocabDone: number;
  vocabTotal: number;
  accuracy: number;
  totalXp: number;
}

export function ProfileView({
  data,
  settings,
  onSettings,
  lang,
  badges,
  freshBadges,
  blankCorrect,
  knownWords,
  inventory,
  appearance,
  onAppearance,
  onNotify,
}: {
  data: ProfileData;
  settings: Settings;
  onSettings: (patch: Partial<Settings>) => void;
  lang: "中文" | "英文";
  badges: { key: string; unlockedAt: string }[];
  freshBadges: Set<string>;
  blankCorrect: number;
  knownWords: number;
  inventory: Map<string, number>;
  appearance: Appearance;
  onAppearance: (patch: Partial<Appearance>) => void;
  onNotify: (msg: string) => void;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setName(data.name);
    setEmail(data.email);
  }, [data.name, data.email]);

  const save = useMutation({
    mutationFn: async () => await api.saveProfile({ name: name.trim() || "学习者", email: email.trim() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    },
  });

  const { index, stage, next, xpToNext } = stageForXp(data.xp, data.totalXp);
  const xpPct = data.totalXp > 0 ? Math.min(100, Math.round((data.xp / data.totalXp) * 100)) : 0;
  const grammarPct = data.grammarTotal > 0 ? Math.round((data.grammarDone / data.grammarTotal) * 100) : 0;
  const vocabPct = data.vocabTotal > 0 ? Math.round((data.vocabDone / data.vocabTotal) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center gap-4">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f08c2e] font-display text-3xl text-white"
          style={appearance.frame ? { boxShadow: FRAME_STYLES[appearance.frame] } : undefined}
          aria-hidden
        >
          {data.name.charAt(0) || "学"}
        </span>
        <div>
          <h1 className="font-display text-3xl text-[var(--ink)]">{data.name}</h1>
          <p className="text-sm text-[var(--dim)]">{data.email || tx(lang, "还没有填写邮箱", "No email yet")}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--mint)] px-3 py-0.5 text-sm font-bold text-[var(--teal-dark)]">
            <span className="h-2 w-2 rounded-full bg-[var(--teal)]" aria-hidden /> {tx(lang, "进度已同步", "Progress synced")}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--ink)]">{data.xp}</p>
          <p className="mt-1 text-sm text-[var(--dim)]">XP 总量</p>
        </div>
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--ink)]">{data.completedCount}</p>
          <p className="mt-1 text-sm text-[var(--dim)]">已完成课数 / {data.totalLessons}</p>
        </div>
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--ink)]">{data.accuracy}%</p>
          <p className="mt-1 text-sm text-[var(--dim)]">累计正确率</p>
        </div>
        <div className="rounded-3xl bg-[var(--surface)] p-4 text-center shadow-sm">
          <p className="font-display text-3xl text-[var(--ink)]">🔥 {data.streak}</p>
          <p className="mt-1 text-sm text-[var(--dim)]">连续学习天数</p>
        </div>
      </div>

      <div className="mt-4">
        <BadgeWall badges={badges} streak={data.streak} blankCorrect={blankCorrect} knownWords={knownWords} freshKeys={freshBadges} />
      </div>

      <div className="mt-4">
        <ShopSection xp={data.xp} inventory={inventory} appearance={appearance} onAppearance={onAppearance} onNotify={onNotify} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[2rem] bg-[var(--mint)] p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-[var(--ink)]">我的种子树</h2>
            <span className="text-4xl" aria-hidden>{stage.emoji}</span>
          </div>
          <p className="mt-1 text-sm text-[var(--dim)]">
            当前阶段：{stage.name}（第 {index + 1} / {TREE_STAGES.length} 阶段）· 总进度 {xpPct}%
            {next ? ` · 还差 ${xpToNext} XP 到「${next.name}」` : " · 已到最终阶段"}
          </p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--mint-deep)]" role="progressbar" aria-valuenow={xpPct} aria-valuemin={0} aria-valuemax={100} aria-label="种子树总进度">
            <div className="h-full rounded-full bg-[var(--teal)]" style={{ width: `${xpPct}%` }} />
          </div>
          <ol className="mt-4 grid grid-cols-6 gap-1 text-center">
            {TREE_STAGES.map((s, i) => (
              <li key={s.name}>
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-base ${i === index ? "bg-[var(--ink)] text-white" : i < index ? "bg-[var(--teal)] text-white" : "bg-white/70"}`}>
                  {s.emoji}
                </div>
                <p className={`mt-1 text-xs ${i === index ? "font-bold text-[var(--ink)]" : "text-[var(--dim)]"}`}>{s.name}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-display text-2xl text-[var(--ink)]">学习进度</h2>
          <div className="mt-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-[var(--ink)]">语法</span>
              <span className="text-[var(--dim)]">{data.grammarDone} / {data.grammarTotal} · {grammarPct}%</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[var(--mint-deep)]">
              <div className="h-full rounded-full bg-[var(--teal)]" style={{ width: `${grammarPct}%` }} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-[var(--ink)]">词汇</span>
              <span className="text-[var(--dim)]">{data.vocabDone} / {data.vocabTotal} · {vocabPct}%</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[var(--mint-deep)]">
              <div className="h-full rounded-full bg-[var(--mustard)]" style={{ width: `${vocabPct}%` }} />
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--dim)]">在历史页可以逐题回顾每一次做题，包括中途退出的尝试。</p>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <form
          className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
        >
          <h2 className="font-display text-2xl text-[var(--ink)]">个人信息</h2>
          <label className="mt-4 block">
            <span className="text-sm font-bold text-[var(--ink)]">姓名</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              className="mt-1 min-h-11 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--teal)]"
            />
          </label>
          <label className="mt-3 block">
            <span className="text-sm font-bold text-[var(--ink)]">邮箱</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={120}
              placeholder="name@example.com"
              className="mt-1 min-h-11 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--teal)]"
            />
          </label>
          <button type="submit" disabled={save.isPending} className="mt-4 min-h-11 rounded-full bg-[var(--ink)] px-6 py-2 font-bold text-white disabled:opacity-50">
            {saved ? "已保存 ✓" : "保存"}
          </button>
        </form>

        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5" aria-label="显示设置">
          <h2 className="font-display text-2xl text-[var(--ink)]">{tx(lang, "显示设置", "Display settings")}</h2>
          <div className="mt-4">
            <p className="text-sm font-bold text-[var(--ink)]">{tx(lang, "字号", "Font size")}</p>
            <div className="mt-2 flex gap-2">
              {(["小", "中", "大"] as const).map((s) => (
                <button key={s} type="button" onClick={() => onSettings({ fontSize: s })} aria-pressed={settings.fontSize === s} className={`min-h-10 flex-1 rounded-full px-4 py-1.5 font-bold ${settings.fontSize === s ? "bg-[var(--ink)] text-white" : "bg-[var(--mint)] text-[var(--teal-dark)]"}`}>
                  {tx(lang, s, s === "小" ? "Small" : s === "中" ? "Medium" : "Large")}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-[var(--ink)]">{tx(lang, "界面", "Appearance")}</p>
            <div className="mt-2 flex gap-2">
              {(["浅色", "深色", "跟随系统"] as const).map((s) => (
                <button key={s} type="button" onClick={() => onSettings({ theme: s })} aria-pressed={settings.theme === s} className={`min-h-10 flex-1 rounded-full px-3 py-1.5 font-bold ${settings.theme === s ? "bg-[var(--ink)] text-white" : "bg-[var(--mint)] text-[var(--teal-dark)]"}`}>
                  {tx(lang, s, s === "浅色" ? "Light" : s === "深色" ? "Dark" : "System")}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-[var(--ink)]">{tx(lang, "语言", "Language")}</p>
            <div className="mt-2 flex gap-2">
              {(["中文", "英文"] as const).map((s) => (
                <button key={s} type="button" onClick={() => onSettings({ lang: s })} aria-pressed={settings.lang === s} className={`min-h-10 flex-1 rounded-full px-4 py-1.5 font-bold ${settings.lang === s ? "bg-[var(--ink)] text-white" : "bg-[var(--mint)] text-[var(--teal-dark)]"}`}>
                  {s === "中文" ? "中文" : "English"}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
