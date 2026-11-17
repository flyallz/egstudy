import { useEffect, useRef, useState } from "react";
import { stageForXp, TREE_STAGES } from "../data/content";
import { SKIN_STYLES, type SkinKey } from "../data/rewards";
import { currentWeekDates, todayStr, useAnimatedNumber } from "../lib";

const WEEK_LABELS = ["一", "二", "三", "四", "五", "六", "日"];

export function TreeWidget({ xp, streak, studyDates, totalXp, skin }: { xp: number; streak: number; studyDates: string[]; totalXp: number; skin?: SkinKey | null }) {
  const skinStyle = skin ? SKIN_STYLES[skin] : null;
  const { index, stage, next, xpToNext } = stageForXp(xp, totalXp);
  const pct = totalXp > 0 ? Math.min(100, Math.round((xp / totalXp) * 100)) : 0;
  const displayXp = useAnimatedNumber(xp, 800);
  // XP 增加时飘出 +XP 数字
  const prevXpRef = useRef<number | null>(null);
  const [gain, setGain] = useState<{ amount: number; id: number } | null>(null);
  useEffect(() => {
    if (prevXpRef.current !== null && xp > prevXpRef.current) {
      const amount = xp - prevXpRef.current;
      const id = Date.now();
      setGain({ amount, id });
      const t = window.setTimeout(() => setGain((g) => (g && g.id === id ? null : g)), 1650);
      prevXpRef.current = xp;
      return () => window.clearTimeout(t);
    }
    prevXpRef.current = xp;
  }, [xp]);
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h2 key={index} className="font-display animate-stage-in text-4xl text-[var(--ink)] sm:text-5xl">{stage.name}</h2>
        <div className="pb-1 text-right">
          <div key={`m-${index}`} className="animate-grow-in text-3xl leading-none lg:hidden" aria-hidden>{stage.emoji}</div>
          <div className="hidden text-3xl leading-none lg:block" aria-hidden>{stage.emoji}</div>
        </div>
      </div>
      <p className="mt-2 text-sm text-[var(--dim)] sm:text-base">
        每完成一节课，测验得分都会变成 XP 喂给这棵树。树会随着你学完整套课程一起长大。
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="relative rounded-3xl bg-[var(--mint)] p-5">
            {gain ? (
              <span
                key={gain.id}
                className="animate-xp-float pointer-events-none absolute -top-2 right-6 z-10 rounded-full bg-[var(--mustard)] px-3 py-1 font-display text-lg text-[var(--ink)] shadow-md"
                aria-hidden
              >
                +{gain.amount} XP
              </span>
            ) : null}
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-[var(--ink)]">
                {next
                  ? <>还差 {xpToNext} XP 达到「{next.name}」</>
                  : <>已经长到最后阶段，继续保持！</>}
              </p>
              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-black text-[var(--ink)]">
                {pct}%
              </span>
            </div>
            <div
              className="mt-4 h-2.5 overflow-hidden rounded-full bg-[var(--mint-deep)]"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="课程总进度"
            >
              <div
                className="h-full rounded-full bg-[var(--teal)] transition-[width] duration-1000 ease-out"
                style={{ width: `${pct}%`, ...(skinStyle ? { background: skinStyle.bar } : {}) }}
              />
            </div>
            <ol className="mt-5 grid grid-cols-6 gap-1 text-center">
              {TREE_STAGES.map((s, i) => (
                <li key={s.name}>
                  <div
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${
                      i === index
                        ? "bg-[var(--ink)] text-white"
                        : i < index
                          ? "bg-[var(--teal)] text-white"
                          : "bg-white/70 text-[var(--dim)]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p
                    className={`mt-1.5 text-xs ${i === index ? "font-bold text-[var(--ink)]" : "text-[var(--dim)]"}`}
                  >
                    {s.name}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-[var(--dim)]">
              当前 <span className="font-black text-[var(--ink)]">{displayXp}</span> XP · 全课程共 {totalXp} XP · 当前阶段「{stage.name}」{next ? `，还差 ${xpToNext} XP 到「${next.name}」` : ""}
            </p>
          </div>

          <StreakCard streak={streak} studyDates={studyDates} />
        </div>

        <div
          className="relative hidden items-end justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#fdf6d8] via-[#eef7ee] to-[#e3f0ec] lg:flex"
          style={skinStyle ? { background: skinStyle.panel } : undefined}
        >
          <div
            className="absolute right-10 top-8 h-16 w-16 rounded-full bg-[#ffd94d] opacity-80 blur-[1px]"
            style={skinStyle ? { background: skinStyle.sun } : undefined}
            aria-hidden
          />
          <div className="pb-10 pt-24 text-center">
            <div key={index} className="animate-grow-in text-[9rem] leading-none" aria-hidden>
              {stage.emoji}
            </div>
            <div
              className="mx-auto mt-2 h-4 w-56 rounded-[100%] bg-[#bcd8cf]"
              style={skinStyle ? { background: skinStyle.ground } : undefined}
              aria-hidden
            />
            <p key={`cap-${index}`} className="animate-stage-in mt-4 text-sm font-bold text-[var(--teal-dark)]">
              第 {index + 1} 阶段 · {stage.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StreakCard({ streak, studyDates }: { streak: number; studyDates: string[] }) {
  const week = currentWeekDates();
  const today = todayStr();
  const studied = new Set(studyDates ?? []);
  return (
    <div className="rounded-3xl bg-[var(--mint)] p-5">
      <div className="flex flex-wrap items-center gap-4">
        <span key={streak} className={streak && streak > 0 ? "animate-flame-pop" : undefined} aria-hidden>
          <span className={`inline-block text-4xl ${streak && streak > 0 ? "animate-flicker" : "opacity-40 grayscale"}`}>
            🔥
          </span>
        </span>
        <div className="min-w-44 flex-1">
          <p className="text-[var(--ink)]">
            <span className="font-display text-4xl">{streak ?? 0}</span>{" "}
            <span className="font-bold">天连续学习</span>
          </p>
          <p className="mt-1 text-sm text-[var(--dim)]">
            学一节课、复习一组词卡或批改一篇作文，都能点亮火焰。哪天都学，连续天数就多一天。
          </p>
        </div>
        <div className="flex gap-1.5" aria-label="本周学习情况">
          {week.map((d, i) => {
            const done = studied.has(d);
            const isToday = d === today;
            return (
              <div key={d} className="text-center">
                <p className="mb-1 text-[11px] font-bold text-[var(--dim)]">周{WEEK_LABELS[i]}</p>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                    done
                      ? "bg-[var(--teal)] text-white"
                      : isToday
                        ? "border-2 border-dashed border-[var(--mustard)] bg-white/60"
                        : "bg-[#d5e5df]"
                  }`}
                >
                  {done ? <span className="animate-check-pop">✓</span> : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
