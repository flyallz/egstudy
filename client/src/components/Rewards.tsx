import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { todayStr } from "../lib";
import type { Appearance } from "../appearance";
import {
  BADGES,
  CHALLENGE_INFO,
  CHALLENGE_XP,
  FRAME_STYLES,
  PET_FEED_LINES,
  PET_LINES,
  PET_STAGES,
  SHOP_ITEMS,
  itemKeyToFrame,
  itemKeyToSkin,
  petStageForXp,
  type ChallengeKind,
} from "../data/rewards";
import petImg from "../assets/pet-doudou.webp";

// ---------------- 学习伙伴豆豆 ----------------

export function PetCard({
  xp,
  pet,
  studiedToday,
  onNotify,
}: {
  xp: number;
  pet: { feeds: number; lastFedDate: string | null; seenLevel: number };
  studiedToday: boolean;
  onNotify: (msg: string) => void;
}) {
  const queryClient = useQueryClient();
  const { stage, next, xpToNext } = petStageForXp(xp);
  const [line, setLine] = useState<string>("点一点豆豆，它有话对你说；今天学习打卡后还能喂它吃好吃的。");
  const [happy, setHappy] = useState(false);
  const [levelUp, setLevelUp] = useState(false);
  const fedToday = pet.lastFedDate === todayStr();

  // 升级检测：服务端记着上次看到的等级，真正升级时才播弹跳淡入并 toast 一次
  const seenRef = useRef(false);
  useEffect(() => {
    if (seenRef.current) return;
    seenRef.current = true;
    if (stage.level > pet.seenLevel) {
      setLevelUp(true);
      onNotify(`🎉 豆豆升级啦：现在是「${stage.name}」阶段！`);
      void api.markPetSeen({ level: stage.level }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["progress"] });
      });
      const t = window.setTimeout(() => setLevelUp(false), 1400);
      return () => window.clearTimeout(t);
    }
    if (stage.level < pet.seenLevel) {
      void api.markPetSeen({ level: stage.level });
    }
  }, [stage.level, pet.seenLevel, stage.name, onNotify, queryClient]);

  const feed = useMutation({
    mutationFn: async () => await api.feedPet({ today: todayStr() }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      if (res.ok) {
        setHappy(true);
        setLine(PET_FEED_LINES[Math.floor(Math.random() * PET_FEED_LINES.length)]!);
        window.setTimeout(() => setHappy(false), 950);
      } else {
        onNotify(res.message);
      }
    },
  });

  const sayLine = () => setLine(PET_LINES[Math.floor(Math.random() * PET_LINES.length)]!);
  const sizePct = 62 + stage.level * 8; // 阶段越高个头越大：70% → 102%

  return (
    <section className="rounded-[2rem] bg-[var(--surface)] p-5 shadow-sm sm:p-6" aria-label="学习伙伴豆豆">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-[var(--ink)]">学习伙伴 · 豆豆</h2>
        <span className="rounded-full bg-[#fdf0cd] px-3 py-1 text-sm font-bold text-[#8a6100]">
          第 {stage.level} 阶段 · {stage.name} {stage.face}
        </span>
      </div>

      <div className="mt-3 flex items-start gap-4">
        <button
          type="button"
          onClick={sayLine}
          aria-label="点一点豆豆，听它说一句鼓励的话"
          className="relative shrink-0 rounded-3xl bg-[#fdf6d8] p-2"
        >
          <span
            key={levelUp ? "up" : "base"}
            className={`block ${levelUp ? "animate-pet-levelup" : happy ? "animate-pet-happy" : "animate-pet-breathe"}`}
            style={{ width: `${sizePct * 1.15}px`, maxWidth: "128px" }}
          >
            <img src={petImg} alt="学习伙伴豆豆：一只戴着蓝色小花发夹的奶油色小狗" className="w-full rounded-2xl" />
          </span>
          {levelUp ? (
            <span className="animate-badge-pop absolute -right-2 -top-2 rounded-full bg-[var(--mustard)] px-2.5 py-1 text-xs font-black text-[var(--ink)] shadow">
              升级啦！
            </span>
          ) : null}
        </button>
        <div className="min-w-0 flex-1">
          <p className="relative rounded-3xl rounded-tl-md bg-[var(--mint)] px-4 py-3 leading-relaxed text-[var(--ink)]" role="status">
            {line}
          </p>
          <p className="mt-2.5 text-sm text-[var(--dim)]">
            {next
              ? `豆豆跟着你的 XP 一起长大：还差 ${xpToNext} XP 升到「${next.name}」。`
              : "豆豆已经长到最高阶段「学霸」啦，继续陪你学下去。"}
            已被喂食 {pet.feeds} 次。
          </p>
          <button
            type="button"
            onClick={() => feed.mutate()}
            disabled={feed.isPending}
            aria-disabled={!studiedToday || fedToday}
            className={`hover-lift mt-3 min-h-11 rounded-full px-5 py-2 font-black disabled:cursor-not-allowed disabled:opacity-50 ${
              fedToday
                ? "bg-[#e8e6da] text-[var(--dim)]"
                : studiedToday
                  ? "bg-[var(--mustard)] text-[var(--ink)]"
                  : "bg-[var(--mint)] text-[var(--teal-dark)] opacity-70"
            }`}
          >
            {fedToday ? "🍖 今天已喂过" : studiedToday ? "🍖 喂豆豆" : "🍖 先完成今日打卡再喂"}
          </button>
        </div>
      </div>

      <ol className="mt-4 grid grid-cols-5 gap-1 text-center" aria-label="豆豆的五个成长阶段">
        {PET_STAGES.map((s) => (
          <li key={s.level}>
            <div
              className={`mx-auto flex h-9 items-center justify-center rounded-xl px-1 text-xs font-black ${
                s.level === stage.level
                  ? "bg-[var(--ink)] text-white"
                  : s.level < stage.level
                    ? "bg-[var(--teal)] text-white"
                    : "bg-[#e8e6da] text-[var(--dim)]"
              }`}
            >
              {s.face} {s.name}
            </div>
            <p className="mt-1 text-[11px] text-[var(--dim)]">{s.minXp} XP</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ---------------- 每周挑战 ----------------

export function ChallengeCard({
  challenge,
  onNotify,
}: {
  challenge: { weekKey: string; kind: string; target: number; progress: number; claimed: boolean };
  onNotify: (msg: string) => void;
}) {
  const queryClient = useQueryClient();
  const kind = (challenge.kind in CHALLENGE_INFO ? challenge.kind : "lessons") as ChallengeKind;
  const info = CHALLENGE_INFO[kind];
  const pct = Math.min(100, Math.round((challenge.progress / Math.max(1, challenge.target)) * 100));
  const done = challenge.progress >= challenge.target;
  const [shake, setShake] = useState(false);

  const claim = useMutation({
    mutationFn: async () => await api.claimChallenge({ today: todayStr() }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      onNotify(res.message);
    },
  });

  return (
    <section className="flex flex-col rounded-[2rem] bg-[var(--ink)] p-5 text-white shadow-sm sm:p-6" aria-label="本周挑战">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl">本周挑战</h2>
        <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-[#ffd98a]">每周一刷新</span>
      </div>
      <p className="font-display mt-3 text-xl text-[#2dd4bf]">🏆 {info.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-[#c8d8d2]">{info.desc}</p>
      <div className="mt-4">
        <div className="flex justify-between text-sm font-bold">
          <span>当前进度</span>
          <span>
            {Math.min(challenge.progress, challenge.target)} / {challenge.target} {info.unit}
          </span>
        </div>
        <div
          className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/20"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="本周挑战进度"
        >
          <div className="h-full rounded-full bg-[var(--mustard)] transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className={`inline-block text-4xl ${shake ? "animate-shake" : done && !challenge.claimed ? "animate-chest-bounce" : ""}`} aria-hidden>
          🎁
        </span>
        <p className="flex-1 text-sm text-[#c8d8d2]">
          {challenge.claimed
            ? "本周奖励已领取，限定徽章在个人中心的徽章墙上。"
            : done
              ? "挑战完成！开宝箱领奖励，还有一枚当周限定徽章。"
              : `完成可得宝箱 +${CHALLENGE_XP} XP 和一枚当周限定徽章；周一没完成就换下一个挑战。`}
        </p>
        <button
          type="button"
          disabled={challenge.claimed || claim.isPending}
          aria-disabled={!done && !challenge.claimed}
          onClick={() => {
            if (!done) {
              setShake(true);
              window.setTimeout(() => setShake(false), 500);
              onNotify(`本周挑战还差 ${challenge.target - challenge.progress} ${info.unit}，加油！`);
              return;
            }
            claim.mutate();
          }}
          className={`hover-lift min-h-11 shrink-0 rounded-full bg-[var(--mustard)] px-5 py-2 font-black text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40 ${!done && !challenge.claimed ? "opacity-60" : ""}`}
        >
          {challenge.claimed ? "已领取" : "领奖励"}
        </button>
      </div>
    </section>
  );
}

// ---------------- 成就徽章墙 ----------------

export function BadgeWall({
  badges,
  streak,
  blankCorrect,
  knownWords,
  freshKeys,
}: {
  badges: { key: string; unlockedAt: string }[];
  streak: number;
  blankCorrect: number;
  knownWords: number;
  freshKeys: Set<string>;
}) {
  const byKey = useMemo(() => new Map(badges.map((b) => [b.key, b.unlockedAt])), [badges]);
  const challengeBadges = badges.filter((b) => b.key.startsWith("challenge:"));
  const progressText = (key: string): string => {
    if (key === "streak7") return `连续打卡进度：${Math.min(streak, 7)} / 7 天`;
    if (key === "blank20") return `填空已答对：${Math.min(blankCorrect, 20)} / 20 道`;
    if (key === "words100") return `已记住单词：${Math.min(knownWords, 100)} / 100 个`;
    return BADGES.find((b) => b.key === key)?.hint ?? "";
  };
  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`;
  };

  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5" aria-label="成就徽章墙">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-[var(--ink)]">成就徽章墙</h2>
        <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-sm font-bold text-[var(--teal-dark)]">
          已点亮 {badges.length} 枚
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {BADGES.map((b) => {
          const at = byKey.get(b.key);
          const unlocked = Boolean(at);
          return (
            <div
              key={b.key}
              className={`rounded-3xl border-2 p-4 text-center ${
                unlocked ? "border-[var(--mustard)] bg-[#fdf6d8]" : "border-[var(--border)] bg-[#f4f2ea]"
              }`}
            >
              <span
                className={`text-5xl ${unlocked ? (freshKeys.has(b.key) ? "animate-badge-pop" : "") : "inline-block opacity-35 grayscale"}`}
                aria-hidden
              >
                {unlocked ? b.icon : "🔒"}
              </span>
              <p className={`font-display mt-2 text-lg ${unlocked ? "text-[var(--ink)]" : "text-[var(--dim)]"}`}>{b.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--dim)]">{b.desc}</p>
              {unlocked && at ? (
                <p className="mt-2 text-xs font-bold text-[var(--teal-dark)]">{fmtDate(at)} 解锁</p>
              ) : (
                <p className="mt-2 text-xs text-[var(--dim)]">{progressText(b.key)}</p>
              )}
            </div>
          );
        })}
      </div>
      {challengeBadges.length > 0 ? (
        <div className="mt-4">
          <p className="text-sm font-bold text-[var(--ink)]">每周挑战限定徽章</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {challengeBadges.map((b) => (
              <span
                key={b.key}
                className={`inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--mustard)] bg-[#fdf6d8] px-3.5 py-1.5 text-sm font-bold text-[var(--ink)] ${freshKeys.has(b.key) ? "animate-badge-pop" : ""}`}
              >
                🏆 {b.key.slice("challenge:".length)} 那周的挑战徽章 · {fmtDate(b.unlockedAt)} 解锁
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-[var(--dim)]">完成首页的本周挑战，还能再得一枚当周限定徽章，过期不候。</p>
      )}
    </section>
  );
}

// ---------------- XP 奖励商店 + 背包 ----------------

export function ShopSection({
  xp,
  inventory,
  appearance,
  onAppearance,
  onNotify,
}: {
  xp: number;
  inventory: Map<string, number>;
  appearance: Appearance;
  onAppearance: (patch: Partial<Appearance>) => void;
  onNotify: (msg: string) => void;
}) {
  const queryClient = useQueryClient();
  const buy = useMutation({
    mutationFn: async (itemKey: string) => await api.buyItem({ itemKey }),
    onSuccess: (res, itemKey) => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      const item = SHOP_ITEMS.find((i) => i.key === itemKey);
      onNotify(res.ok && item ? `🎁 「${item.name}」已放入背包` : res.message);
    },
  });

  const ownedDecor = SHOP_ITEMS.filter((i) => !i.consumable && (inventory.get(i.key) ?? 0) > 0);
  const cardHint = inventory.get("hint_card") ?? 0;
  const cardShield = inventory.get("shield_card") ?? 0;

  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5" aria-label="XP 奖励商店与背包">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-[var(--ink)]">XP 奖励商店</h2>
        <span className="rounded-full bg-[var(--ink)] px-3.5 py-1.5 text-sm font-bold text-white">余额 {xp} XP</span>
      </div>
      <p className="mt-1.5 text-sm text-[var(--dim)]">只用学习赚的 XP 兑换，不花钱。道具卡在测验里用，皮肤和头像框兑换后在下方背包里换上。</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {SHOP_ITEMS.map((item) => {
          const owned = inventory.get(item.key) ?? 0;
          const ownedOnce = !item.consumable && owned > 0;
          const afford = xp >= item.price;
          return (
            <div key={item.key} className="flex gap-3 rounded-3xl border border-[var(--border)] bg-white p-4">
              <span className="text-4xl" aria-hidden>{item.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[var(--ink)]">
                  {item.name}
                  {item.consumable && owned > 0 ? <span className="ml-2 rounded-full bg-[var(--mint)] px-2 py-0.5 text-xs font-bold text-[var(--teal-dark)]">背包 ×{owned}</span> : null}
                  {ownedOnce ? <span className="ml-2 rounded-full bg-[#fdf0cd] px-2 py-0.5 text-xs font-bold text-[#8a6100]">已拥有</span> : null}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--dim)]">{item.desc}</p>
                <button
                  type="button"
                  disabled={ownedOnce || buy.isPending}
                  onClick={() => buy.mutate(item.key)}
                  aria-label={`用 ${item.price} XP 兑换${item.name}`}
                  className={`mt-2.5 min-h-10 rounded-full px-4 py-1.5 font-black disabled:cursor-not-allowed disabled:opacity-40 ${
                    ownedOnce ? "bg-[#e8e6da] text-[var(--dim)]" : afford ? "bg-[var(--mustard)] text-[var(--ink)]" : "bg-[var(--mint)] text-[var(--teal-dark)]"
                  }`}
                >
                  {ownedOnce ? "已在背包" : `${item.price} XP 兑换`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-3xl bg-[var(--mint)] p-4">
        <h3 className="font-display text-xl text-[var(--ink)]">我的背包</h3>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <p className="rounded-2xl bg-white/80 px-4 py-3 font-bold text-[var(--ink)]">
            💡 提示卡 <span className="text-[var(--teal-dark)]">×{cardHint}</span>
            <span className="block text-sm font-medium text-[var(--dim)]">做选择题时点「用提示卡」，去掉一个错误选项。</span>
          </p>
          <p className="rounded-2xl bg-white/80 px-4 py-3 font-bold text-[var(--ink)]">
            🛡️ 免错卡 <span className="text-[var(--teal-dark)]">×{cardShield}</span>
            <span className="block text-sm font-medium text-[var(--dim)]">答错后点「用免错卡」，这题照样算答对。</span>
          </p>
        </div>
        {ownedDecor.length > 0 ? (
          <ul className="mt-3 grid gap-2">
            {ownedDecor.map((item) => {
              const skin = itemKeyToSkin(item.key);
              const frame = itemKeyToFrame(item.key);
              const active = skin ? appearance.skin === skin : frame ? appearance.frame === frame : false;
              return (
                <li key={item.key} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white/80 px-4 py-2.5">
                  <span className="text-2xl" aria-hidden>{item.icon}</span>
                  <span className="min-w-28 flex-1 font-bold text-[var(--ink)]">{item.name}</span>
                  {skin ? (
                    <span className="h-6 w-10 rounded-full border border-black/10" style={{ background: `linear-gradient(135deg, var(--teal), ${item.key === "skin_sunset" ? "#f08c2e" : item.key === "skin_forest" ? "#2e7d4f" : "#7c5cbf"})` }} aria-hidden />
                  ) : null}
                  {frame ? (
                    <span className="h-7 w-7 rounded-full bg-[#f08c2e]" style={{ boxShadow: FRAME_STYLES[frame] }} aria-hidden />
                  ) : null}
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      if (skin) onAppearance({ skin: active ? null : skin });
                      else if (frame) onAppearance({ frame: active ? null : frame });
                      onNotify(active ? `已卸下「${item.name}」` : `已换上「${item.name}」`);
                    }}
                    className={`min-h-10 rounded-full px-4 py-1.5 font-black ${active ? "bg-[var(--ink)] text-white" : "bg-[var(--mustard)] text-[var(--ink)]"}`}
                  >
                    {active ? "使用中 · 点此卸下" : "换上"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-[var(--dim)]">皮肤和头像框还没兑换，换上后种子树和头像会立刻变样。</p>
        )}
      </div>
    </section>
  );
}
