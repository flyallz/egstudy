import { defineAction, z, type ActionsModule, type Ctx } from "@hatch/space-sdk";
import { asc, desc, eq, gte } from "drizzle-orm";
import * as schema from "./schema";

const dateRe = /^\d{4}-\d{2}-\d{2}$/;

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

async function ensureProgress(ctx: Ctx) {
  const db = ctx.db<typeof schema>();
  const rows = await db.select().from(schema.progress);
  if (rows.length === 0) {
    await db.insert(schema.progress).values({ id: 1, xp: 0, streak: 0, lastStudyDate: null });
    return { id: 1, xp: 0, streak: 0, lastStudyDate: null as string | null };
  }
  const row = rows[0]!;
  return { id: row.id, xp: row.xp, streak: row.streak, lastStudyDate: row.lastStudyDate };
}

async function touchStudyDay(ctx: Ctx, today: string) {
  const db = ctx.db<typeof schema>();
  const prog = await ensureProgress(ctx);
  await db.insert(schema.studyDays).values({ date: today }).onConflictDoNothing();
  let streak = prog.streak;
  if (prog.lastStudyDate !== today) {
    streak = prog.lastStudyDate === shiftDate(today, -1) ? prog.streak + 1 : 1;
    await db
      .update(schema.progress)
      .set({ streak, lastStudyDate: today })
      .where(eq(schema.progress.id, 1));
  }
  return { ...prog, streak, lastStudyDate: today };
}

async function logEvent(ctx: Ctx, date: string, type: string, amount: number) {
  const db = ctx.db<typeof schema>();
  await db.insert(schema.activityEvents).values({ date, type, amount });
}

// ---------------- 本站自有奖励系统（徽章 / 商店 / 每周挑战 / 学习伙伴） ----------------

// 商店目录：价格由服务端说了算，客户端只展示。
export const SHOP_ITEMS: Record<string, { price: number; consumable: boolean }> = {
  hint_card: { price: 30, consumable: true },
  shield_card: { price: 50, consumable: true },
  skin_sunset: { price: 120, consumable: false },
  skin_forest: { price: 120, consumable: false },
  skin_grape: { price: 120, consumable: false },
  frame_gold: { price: 80, consumable: false },
  frame_leaf: { price: 80, consumable: false },
  frame_star: { price: 80, consumable: false },
};

export type ChallengeKind = "lessons" | "words" | "days";
export const CHALLENGE_TARGETS: Record<ChallengeKind, number> = { lessons: 5, words: 50, days: 5 };
export const CHALLENGE_XP = 30;
const CHALLENGE_ROTATION: ChallengeKind[] = ["lessons", "words", "days"];

/** 某个日期所在周的周一（YYYY-MM-DD，本地日历口径）。 */
function mondayOf(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7; // 周一为 0
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}

/** 用周一日期做种子，让三种挑战按周轮换（同一周全站一致）。 */
function challengeForWeek(monday: string): ChallengeKind {
  let hash = 0;
  for (const ch of monday) hash = (hash * 31 + ch.charCodeAt(0)) % 9973;
  return CHALLENGE_ROTATION[hash % CHALLENGE_ROTATION.length]!;
}

/** 本周挑战的真实进度：完成课数看本周完成的尝试，记住词数看本周新标记为已掌握的词，打卡天数看本周学习日。 */
async function weekChallengeState(ctx: Ctx, today: string) {
  const db = ctx.db<typeof schema>();
  const monday = mondayOf(today);
  const kind = challengeForWeek(monday);
  const weekStart = new Date(`${monday}T00:00:00`);
  const weekDates: string[] = Array.from({ length: 7 }, (_, i) => shiftDate(monday, i));
  const attempts = await db.select().from(schema.attempts).where(gte(schema.attempts.createdAt, weekStart));
  const lessonsDone = attempts.filter((a) => a.interrupted === 0 && a.kind !== "placement").length;
  const marks = await db.select().from(schema.reviewMarks).where(gte(schema.reviewMarks.updatedAt, weekStart));
  const wordsKnown = marks.filter((m) => m.status === "known").length;
  const days = await db.select().from(schema.studyDays);
  const daySet = new Set(days.map((d) => d.date));
  const studyDays = weekDates.filter((d) => daySet.has(d)).length;
  const progress = kind === "lessons" ? lessonsDone : kind === "words" ? wordsKnown : studyDays;
  const claims = await db.select().from(schema.chestClaims).where(eq(schema.chestClaims.key, `challenge:${monday}`));
  return {
    weekKey: monday,
    kind,
    target: CHALLENGE_TARGETS[kind],
    progress,
    claimed: claims.length > 0,
  };
}

/** 累计填空题答对数（从每次尝试的逐题明细里数）。 */
function countBlankCorrect(detailJson: string): number {
  try {
    const parsed = JSON.parse(detailJson) as { q?: unknown; picked?: unknown; answer?: unknown }[];
    if (!Array.isArray(parsed)) return 0;
    return parsed.filter(
      (d) => typeof d.q === "string" && d.q.startsWith("填空：") && d.picked !== null && d.picked === d.answer,
    ).length;
  } catch {
    return 0;
  }
}

/**
 * 按真实学习记录复核五枚成就徽章，返回本次新解锁的徽章 key。
 * 在读取进度与关键动作后调用，保证解锁时间就是达成那一刻。
 */
async function evaluateBadges(ctx: Ctx): Promise<string[]> {
  const db = ctx.db<typeof schema>();
  const prog = await ensureProgress(ctx);
  const existing = new Set((await db.select().from(schema.badgeUnlocks)).map((b) => b.key));
  const attempts = await db.select().from(schema.attempts);
  const marks = await db.select().from(schema.reviewMarks);
  const unlockRows = await db.select().from(schema.unlocks);
  const blankCorrect = attempts.reduce((n, a) => n + countBlankCorrect(a.detail), 0);
  const knownWords = marks.filter((m) => m.status === "known").length;
  const checks: { key: string; ok: boolean }[] = [
    { key: "perfect", ok: attempts.some((a) => a.interrupted === 0 && a.total > 0 && a.score === 100) },
    { key: "streak7", ok: prog.streak >= 7 },
    { key: "blank20", ok: blankCorrect >= 20 },
    { key: "words100", ok: knownWords >= 100 },
    { key: "placement", ok: unlockRows.length > 0 },
  ];
  const fresh: string[] = [];
  for (const c of checks) {
    if (c.ok && !existing.has(c.key)) {
      await db.insert(schema.badgeUnlocks).values({ key: c.key }).onConflictDoNothing();
      fresh.push(c.key);
    }
  }
  return fresh;
}

async function ensurePet(ctx: Ctx) {
  const db = ctx.db<typeof schema>();
  const rows = await db.select().from(schema.petState);
  if (rows.length === 0) {
    await db.insert(schema.petState).values({ id: 1, feeds: 0, lastFedDate: null, seenLevel: 1 });
    return { feeds: 0, lastFedDate: null as string | null, seenLevel: 1 };
  }
  const row = rows[0]!;
  return { feeds: row.feeds, lastFedDate: row.lastFedDate, seenLevel: row.seenLevel };
}

const attemptDetail = z.array(
  z.object({
    q: z.string(),
    options: z.array(z.string()),
    picked: z.number().nullable(),
    answer: z.number(),
  }),
);

const progressResponse = z.object({
  xp: z.number(),
  streak: z.number(),
  lastStudyDate: z.string().nullable(),
  studyDates: z.array(z.string()),
  completed: z.array(
    z.object({
      lessonId: z.string(),
      kind: z.string(),
      bestScore: z.number(),
      xpEarned: z.number(),
    }),
  ),
  lessonStats: z.array(
    z.object({
      lessonId: z.string(),
      attempts: z.number(),
      bestScore: z.number(),
      recentScore: z.number(),
      stars: z.number(),
    }),
  ),
  reviewMarks: z.array(z.object({ wordKey: z.string(), status: z.string() })),
  deck: z.array(
    z.object({
      wordKey: z.string(),
      word: z.string(),
      phonetic: z.string(),
      pos: z.string(),
      meaning: z.string(),
      example: z.string(),
      exampleCn: z.string(),
      source: z.string(),
    }),
  ),
  unlocks: z.array(z.string()),
  claims: z.array(z.string()),
  profile: z.object({ name: z.string(), email: z.string() }),
  todayEvents: z.array(z.object({ type: z.string(), amount: z.number() })),
  historyStats: z.object({
    totalAttempts: z.number(),
    passedCount: z.number(),
    avgScore: z.number(),
    totalAnswered: z.number(),
    totalCorrect: z.number(),
  }),
  writingThisMonth: z.number(),
  badges: z.array(z.object({ key: z.string(), unlockedAt: z.string() })),
  newBadges: z.array(z.string()),
  blankCorrect: z.number(),
  knownWords: z.number(),
  inventory: z.array(z.object({ itemKey: z.string(), quantity: z.number() })),
  weekChallenge: z.object({
    weekKey: z.string(),
    kind: z.string(),
    target: z.number(),
    progress: z.number(),
    claimed: z.boolean(),
  }),
  pet: z.object({ feeds: z.number(), lastFedDate: z.string().nullable(), seenLevel: z.number() }),
});

export const Actions = {
  getProgress: defineAction({
    description: "读取学习者的 XP、连续天数、课程完成与星级、各课做题统计、复习标记与复习牌组、越级解锁、宝箱领取、个人资料、今日活动与历史汇总。",
    request: z.object({ today: z.string().regex(dateRe).optional() }),
    response: progressResponse,
    async handler(ctx, args): Promise<z.infer<typeof progressResponse>> {
      const db = ctx.db<typeof schema>();
      const prog = await ensureProgress(ctx);
      const days = await db.select().from(schema.studyDays).orderBy(asc(schema.studyDays.date));
      const lessons = await db.select().from(schema.lessonProgress);
      const marks = await db.select().from(schema.reviewMarks);
      const deckRows = await db.select().from(schema.reviewDeck).orderBy(asc(schema.reviewDeck.createdAt));
      const unlockRows = await db.select().from(schema.unlocks);
      const claimRows = await db.select().from(schema.chestClaims);
      const profileRows = await db.select().from(schema.profile);
      const prof = profileRows[0] ?? { name: "学习者", email: "" };
      const allAttempts = await db.select().from(schema.attempts).orderBy(asc(schema.attempts.id));

      const statMap = new Map<string, { attempts: number; bestScore: number; recentScore: number; stars: number }>();
      let passedCount = 0;
      let scoreSum = 0;
      let finishedCount = 0;
      let totalAnswered = 0;
      let totalCorrect = 0;
      for (const a of allAttempts) {
        const s = statMap.get(a.lessonId) ?? { attempts: 0, bestScore: 0, recentScore: 0, stars: 0 };
        s.attempts += 1;
        s.bestScore = Math.max(s.bestScore, a.score);
        s.recentScore = a.score;
        s.stars = Math.max(s.stars, a.stars);
        statMap.set(a.lessonId, s);
        totalAnswered += a.answered;
        totalCorrect += a.correct;
        if (a.interrupted === 0) {
          finishedCount += 1;
          scoreSum += a.score;
          if (a.score >= 80) passedCount += 1;
        }
      }

      const today = args.today ?? new Date().toISOString().slice(0, 10);
      const newBadges = await evaluateBadges(ctx);
      const badgeRows = await db.select().from(schema.badgeUnlocks).orderBy(asc(schema.badgeUnlocks.unlockedAt));
      const invRows = await db.select().from(schema.inventory);
      const challenge = await weekChallengeState(ctx, today);
      const pet = await ensurePet(ctx);
      const blankCorrect = allAttempts.reduce((n, a) => n + countBlankCorrect(a.detail), 0);
      const knownWords = marks.filter((m) => m.status === "known").length;
      const evRows = await db
        .select()
        .from(schema.activityEvents)
        .where(eq(schema.activityEvents.date, today));
      const evMap = new Map<string, number>();
      for (const e of evRows) evMap.set(e.type, (evMap.get(e.type) ?? 0) + e.amount);

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const writings = await db
        .select()
        .from(schema.writingHistory)
        .where(gte(schema.writingHistory.createdAt, monthStart));

      return {
        xp: prog.xp,
        streak: prog.streak,
        lastStudyDate: prog.lastStudyDate,
        studyDates: days.map((d) => d.date),
        completed: lessons.map((l) => ({
          lessonId: l.lessonId,
          kind: l.kind,
          bestScore: l.bestScore,
          xpEarned: l.xpEarned,
        })),
        lessonStats: [...statMap.entries()].map(([lessonId, s]) => ({ lessonId, ...s })),
        reviewMarks: marks.map((m) => ({ wordKey: m.wordKey, status: m.status })),
        deck: deckRows.map((d) => ({
          wordKey: d.wordKey,
          word: d.word,
          phonetic: d.phonetic,
          pos: d.pos,
          meaning: d.meaning,
          example: d.example,
          exampleCn: d.exampleCn,
          source: d.source,
        })),
        unlocks: unlockRows.map((u) => u.key),
        claims: claimRows.map((c) => c.key),
        profile: { name: prof.name, email: prof.email },
        todayEvents: [...evMap.entries()].map(([type, amount]) => ({ type, amount })),
        historyStats: {
          totalAttempts: allAttempts.length,
          passedCount,
          avgScore: finishedCount > 0 ? Math.round(scoreSum / finishedCount) : 0,
          totalAnswered,
          totalCorrect,
        },
        writingThisMonth: writings.length,
        badges: badgeRows.map((b) => ({ key: b.key, unlockedAt: b.unlockedAt.toISOString() })),
        newBadges,
        blankCorrect,
        knownWords,
        inventory: invRows.filter((i) => i.quantity > 0).map((i) => ({ itemKey: i.itemKey, quantity: i.quantity })),
        weekChallenge: challenge,
        pet,
      };
    },
  }),

  recordAttempt: defineAction({
    description: "记录一次测验尝试（完成或中途退出都记入历史），按得分发放 XP 与星级，并更新连续学习天数。",
    request: z.object({
      lessonId: z.string().min(1).max(80),
      kind: z.enum(["grammar", "vocab-topic", "vocab-cefr", "placement"]),
      title: z.string().min(1).max(200),
      difficulty: z.string().max(20),
      total: z.number().int().min(0).max(200),
      correct: z.number().int().min(0).max(200),
      interrupted: z.boolean(),
      detail: attemptDetail.max(200),
      maxXp: z.number().int().min(0).max(100),
      today: z.string().regex(dateRe),
    }),
    response: z.object({
      xp: z.number(),
      streak: z.number(),
      xpGained: z.number(),
      score: z.number(),
      passed: z.boolean(),
      stars: z.number(),
      newBadges: z.array(z.string()),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const prog = await touchStudyDay(ctx, args.today);
      const answered = args.detail.length > 0 ? args.detail.filter((d) => d.picked !== null).length : Math.min(args.correct, args.total);
      const score = args.total > 0 ? Math.round((args.correct / args.total) * 100) : 0;
      const passScore = args.kind === "grammar" && args.difficulty === "困难" ? 100 : 80;
      const passed = !args.interrupted && score >= passScore;
      const diffStars = args.difficulty === "简单" ? 1 : args.difficulty === "中等" ? 2 : args.difficulty === "困难" ? 3 : 0;
      const stars = passed ? diffStars : 0;

      await db.insert(schema.attempts).values({
        lessonId: args.lessonId,
        kind: args.kind,
        title: args.title,
        difficulty: args.difficulty,
        total: args.total,
        answered,
        correct: args.correct,
        score,
        stars,
        interrupted: args.interrupted ? 1 : 0,
        detail: JSON.stringify(args.detail),
      });
      await logEvent(ctx, args.today, "lesson", 1);

      let gained = 0;
      if (!args.interrupted && args.kind !== "placement" && args.maxXp > 0) {
        const earned = Math.round((args.maxXp * score) / 100);
        const existing = await db
          .select()
          .from(schema.lessonProgress)
          .where(eq(schema.lessonProgress.lessonId, args.lessonId));
        const prev = existing[0];
        const prevXp = prev?.xpEarned ?? 0;
        gained = Math.max(0, earned - prevXp);
        if (prev) {
          await db
            .update(schema.lessonProgress)
            .set({
              bestScore: Math.max(prev.bestScore, score),
              xpEarned: Math.max(prevXp, earned),
              completedAt: new Date(),
            })
            .where(eq(schema.lessonProgress.lessonId, args.lessonId));
        } else {
          await db.insert(schema.lessonProgress).values({
            lessonId: args.lessonId,
            kind: args.kind,
            bestScore: score,
            xpEarned: earned,
          });
        }
        if (gained > 0) {
          await db.update(schema.progress).set({ xp: prog.xp + gained }).where(eq(schema.progress.id, 1));
        }
      }
      const newBadges = await evaluateBadges(ctx);
      ctx.invalidateQueries();
      return { xp: prog.xp + gained, streak: prog.streak, xpGained: gained, score, passed, stars, newBadges };
    },
  }),

  unlockPlacement: defineAction({
    description: "越级考试通过后解锁对应级别或主题的全部课程。",
    request: z.object({
      key: z.string().min(1).max(80),
      today: z.string().regex(dateRe),
    }),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx, args): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      await touchStudyDay(ctx, args.today);
      await db.insert(schema.unlocks).values({ key: args.key }).onConflictDoNothing();
      await logEvent(ctx, args.today, "placement", 1);
      await evaluateBadges(ctx);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  markWord: defineAction({
    description: "在复习中把一个单词标记为「已掌握」或「还要练」，并记为今天已学习。",
    request: z.object({
      wordKey: z.string().min(1).max(80),
      status: z.enum(["known", "learning"]),
      today: z.string().regex(dateRe),
    }),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx, args): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      await touchStudyDay(ctx, args.today);
      await db
        .insert(schema.reviewMarks)
        .values({ wordKey: args.wordKey.toLowerCase(), status: args.status })
        .onConflictDoUpdate({
          target: schema.reviewMarks.wordKey,
          set: { status: args.status, updatedAt: new Date() },
        });
      await logEvent(ctx, args.today, "review", 1);
      await evaluateBadges(ctx);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  logActivity: defineAction({
    description: "记录词卡学习或复习活动数量，用于每日目标统计。",
    request: z.object({
      type: z.enum(["cards", "review"]),
      amount: z.number().int().min(1).max(500),
      today: z.string().regex(dateRe),
    }),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx, args): Promise<{ ok: true }> {
      await touchStudyDay(ctx, args.today);
      await logEvent(ctx, args.today, args.type, args.amount);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  addToReview: defineAction({
    description: "把一张词卡加入复习牌组（或自建一张词卡）。",
    request: z.object({
      word: z.string().min(1).max(80),
      phonetic: z.string().max(80).default(""),
      pos: z.string().max(40).default(""),
      meaning: z.string().max(200).default(""),
      example: z.string().max(400).default(""),
      exampleCn: z.string().max(400).default(""),
      source: z.enum(["added", "custom"]).default("added"),
    }),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx, args): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      await db
        .insert(schema.reviewDeck)
        .values({
          wordKey: args.word.toLowerCase(),
          word: args.word,
          phonetic: args.phonetic,
          pos: args.pos,
          meaning: args.meaning,
          example: args.example,
          exampleCn: args.exampleCn,
          source: args.source,
        })
        .onConflictDoUpdate({
          target: schema.reviewDeck.wordKey,
          set: {
            word: args.word,
            phonetic: args.phonetic,
            pos: args.pos,
            meaning: args.meaning,
            example: args.example,
            exampleCn: args.exampleCn,
            source: args.source,
          },
        });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  removeFromReview: defineAction({
    description: "把一张词卡移出复习牌组。",
    request: z.object({ wordKey: z.string().min(1).max(80) }),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx, args): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      await db.delete(schema.reviewDeck).where(eq(schema.reviewDeck.wordKey, args.wordKey.toLowerCase()));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  claimChest: defineAction({
    description: "领取每日宝箱或周宝箱：服务端核对今日目标或本周打卡达标后发放 XP。",
    request: z.object({
      kind: z.enum(["daily", "weekly"]),
      today: z.string().regex(dateRe),
      weekDates: z.array(z.string().regex(dateRe)).max(7).default([]),
    }),
    response: z.object({
      ok: z.boolean(),
      xpAwarded: z.number(),
      message: z.string(),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const prog = await ensureProgress(ctx);
      if (args.kind === "daily") {
        const key = `daily:${args.today}`;
        const existing = await db.select().from(schema.chestClaims).where(eq(schema.chestClaims.key, key));
        if (existing.length > 0) return { ok: false, xpAwarded: 0, message: "今日宝箱已经领取过了。" };
        const start = new Date(`${args.today}T00:00:00`);
        const all = await db.select().from(schema.attempts).where(gte(schema.attempts.createdAt, start));
        const finished = all.filter((a) => a.interrupted === 0);
        const evRows = await db
          .select()
          .from(schema.activityEvents)
          .where(eq(schema.activityEvents.date, args.today));
        const sum = (t: string) => evRows.filter((e) => e.type === t).reduce((n, e) => n + e.amount, 0);
        const goalsMet =
          finished.length >= 1 &&
          sum("review") >= 5 &&
          finished.some((a) => a.score >= 80) &&
          sum("cards") >= 10 &&
          finished.reduce((n, a) => n + a.correct, 0) >= 10;
        if (!goalsMet) return { ok: false, xpAwarded: 0, message: "今日 5 个目标还没有全部完成。" };
        const award = 20;
        await db.insert(schema.chestClaims).values({ key, xpAwarded: award });
        await db.update(schema.progress).set({ xp: prog.xp + award }).where(eq(schema.progress.id, 1));
        ctx.invalidateQueries();
        return { ok: true, xpAwarded: award, message: "宝箱开启，获得 20 XP！" };
      }
      const studied = await db.select().from(schema.studyDays);
      const studiedSet = new Set(studied.map((d) => d.date));
      const daysThisWeek = args.weekDates.filter((d) => studiedSet.has(d)).length;
      const key = `weekly:${args.weekDates[0] ?? args.today}`;
      const existing = await db.select().from(schema.chestClaims).where(eq(schema.chestClaims.key, key));
      if (existing.length > 0) return { ok: false, xpAwarded: 0, message: "本周宝箱已经领取过了。" };
      if (daysThisWeek < 5) return { ok: false, xpAwarded: 0, message: `本周已学习 ${daysThisWeek} 天，满 5 天可开周宝箱。` };
      const award = 50;
      await db.insert(schema.chestClaims).values({ key, xpAwarded: award });
      await db.update(schema.progress).set({ xp: prog.xp + award }).where(eq(schema.progress.id, 1));
      ctx.invalidateQueries();
      return { ok: true, xpAwarded: award, message: "周宝箱开启，获得 50 XP！" };
    },
  }),

  saveProfile: defineAction({
    description: "保存个人中心的姓名与邮箱。",
    request: z.object({
      name: z.string().min(1).max(40),
      email: z.string().max(120),
    }),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx, args): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      await db
        .insert(schema.profile)
        .values({ id: 1, name: args.name, email: args.email })
        .onConflictDoUpdate({
          target: schema.profile.id,
          set: { name: args.name, email: args.email },
        });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  getHistory: defineAction({
    description: "列出做题历史（含中途退出的记录），可按课程名搜索，每条含逐题对错明细。",
    request: z.object({
      query: z.string().max(100).default(""),
      limit: z.number().int().positive().max(200).default(100),
    }),
    response: z.object({
      items: z.array(
        z.object({
          id: z.number(),
          lessonId: z.string(),
          kind: z.string(),
          title: z.string(),
          difficulty: z.string(),
          total: z.number(),
          answered: z.number(),
          correct: z.number(),
          score: z.number(),
          stars: z.number(),
          interrupted: z.boolean(),
          createdAt: z.string(),
          detail: attemptDetail,
        }),
      ),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const rows = await db
        .select()
        .from(schema.attempts)
        .orderBy(desc(schema.attempts.id))
        .limit(500);
      const q = args.query.trim().toLowerCase();
      const filtered = q
        ? rows.filter((r) => r.title.toLowerCase().includes(q) || r.lessonId.toLowerCase().includes(q))
        : rows;
      return {
        items: filtered.slice(0, args.limit).map((r) => {
          let detail: z.infer<typeof attemptDetail> = [];
          try {
            const parsed = JSON.parse(r.detail) as unknown;
            const checked = attemptDetail.safeParse(parsed);
            if (checked.success) detail = checked.data;
          } catch {
            detail = [];
          }
          return {
            id: r.id,
            lessonId: r.lessonId,
            kind: r.kind,
            title: r.title,
            difficulty: r.difficulty,
            total: r.total,
            answered: r.answered,
            correct: r.correct,
            score: r.score,
            stars: r.stars,
            interrupted: r.interrupted === 1,
            createdAt: r.createdAt.toISOString(),
            detail,
          };
        }),
      };
    },
  }),

  clearHistory: defineAction({
    description: "清空全部做题历史记录（课程完成与 XP 不受影响）。",
    request: z.object({}),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      await db.delete(schema.attempts);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  gradeWriting: defineAction({
    description: "按雅思官方四项标准批改一篇 IELTS Writing Task 2 作文（每月限 15 次，作文最少 250 词），给出预估分数段、四项分、逐句修改与范文重写。",
    request: z.object({
      prompt: z.string().min(10).max(2000),
      essay: z.string().min(50).max(8000),
      today: z.string().regex(dateRe),
    }),
    response: z.object({
      blocked: z.boolean(),
      message: z.string(),
      overallBand: z.number(),
      taskResponse: z.number(),
      coherenceCohesion: z.number(),
      lexicalResource: z.number(),
      grammarAccuracy: z.number(),
      summary: z.string(),
      strengths: z.array(z.string()),
      improvements: z.array(z.string()),
      corrections: z.array(
        z.object({ original: z.string(), corrected: z.string(), note: z.string() }),
      ),
      rewrite: z.string(),
    }),
    async handler(ctx, args) {
      const empty = {
        overallBand: 0,
        taskResponse: 0,
        coherenceCohesion: 0,
        lexicalResource: 0,
        grammarAccuracy: 0,
        summary: "",
        strengths: [] as string[],
        improvements: [] as string[],
        corrections: [] as { original: string; corrected: string; note: string }[],
        rewrite: "",
      };
      const wordCount = args.essay.trim() ? args.essay.trim().split(/\s+/).length : 0;
      if (wordCount < 250) {
        return { blocked: true, message: `作文最少 250 词，你现在写了 ${wordCount} 词。`, ...empty };
      }
      const db = ctx.db<typeof schema>();
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const used = await db
        .select()
        .from(schema.writingHistory)
        .where(gte(schema.writingHistory.createdAt, monthStart));
      if (used.length >= 15) {
        return { blocked: true, message: "本月 15 次批改额度已用完，下个月再来。", ...empty };
      }
      const result = await ctx.inference.complete(
        `你是一位经验丰富的雅思写作考官。请按 IELTS Writing Task 2 官方四项评分标准批改下面这篇作文。

题目：
${args.prompt}

考生作文：
${args.essay}

评分要求：
- 四项标准各给一个 0–9 分的分数段（可带 0.5）：taskResponse（任务回应：是否完整回应题目、观点是否明确、论证是否充分）、coherenceCohesion（连贯与衔接：段落安排、衔接手段）、lexicalResource（词汇资源：丰富度、搭配、拼写）、grammarAccuracy（语法多样性与准确性）。
- overallBand 为四项的综合分数段。
- summary、strengths、improvements 全部用简体中文书写，语气鼓励但指出问题要具体。
- corrections 选出 3–6 处最值得改的句子：original 逐字摘自考生作文，corrected 给修改后的版本，note 用中文说明问题。
- rewrite 用英文把考生作文按其原有观点重写成一篇约同等长度、明显更高分（Band 7.5+）的版本，保留考生立场，不要另起炉灶换立场。`,
        {
          schema: z.object({
            overallBand: z.number().min(0).max(9),
            taskResponse: z.number().min(0).max(9),
            coherenceCohesion: z.number().min(0).max(9),
            lexicalResource: z.number().min(0).max(9),
            grammarAccuracy: z.number().min(0).max(9),
            summary: z.string(),
            strengths: z.array(z.string()),
            improvements: z.array(z.string()),
            corrections: z.array(
              z.object({ original: z.string(), corrected: z.string(), note: z.string() }),
            ),
            rewrite: z.string(),
          }),
        },
      );
      await touchStudyDay(ctx, args.today);
      await db.insert(schema.writingHistory).values({
        prompt: args.prompt,
        essay: args.essay,
        overallBand: result.overallBand,
        summary: result.summary,
      });
      await logEvent(ctx, args.today, "writing", 1);
      ctx.invalidateQueries();
      return { blocked: false, message: "", ...result };
    },
  }),

  getWritingHistory: defineAction({
    description: "列出过去提交批改的雅思作文题目与预估分数段，最近的在前。",
    request: z.object({ limit: z.number().int().positive().max(50).default(10) }),
    response: z.object({
      items: z.array(
        z.object({
          id: z.number(),
          prompt: z.string(),
          overallBand: z.number(),
          summary: z.string(),
          createdAt: z.string(),
        }),
      ),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const rows = await db
        .select()
        .from(schema.writingHistory)
        .orderBy(desc(schema.writingHistory.id))
        .limit(args.limit);
      return {
        items: rows.map((r) => ({
          id: r.id,
          prompt: r.prompt,
          overallBand: r.overallBand,
          summary: r.summary,
          createdAt: r.createdAt.toISOString(),
        })),
      };
    },
  }),

  buyItem: defineAction({
    description: "在 XP 奖励商店兑换一件商品：服务端核对 XP 余额与是否已拥有，扣 XP 后放入背包。",
    request: z.object({ itemKey: z.string().min(1).max(40) }),
    response: z.object({ ok: z.boolean(), message: z.string(), xp: z.number() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const prog = await ensureProgress(ctx);
      const item = SHOP_ITEMS[args.itemKey];
      if (!item) return { ok: false, message: "没有这件商品。", xp: prog.xp };
      const existing = await db.select().from(schema.inventory).where(eq(schema.inventory.itemKey, args.itemKey));
      const owned = existing[0]?.quantity ?? 0;
      if (!item.consumable && owned > 0) return { ok: false, message: "这件已经在你的背包里了。", xp: prog.xp };
      if (prog.xp < item.price) {
        return { ok: false, message: `XP 不够：需要 ${item.price} XP，你现在有 ${prog.xp} XP。`, xp: prog.xp };
      }
      await db.update(schema.progress).set({ xp: prog.xp - item.price }).where(eq(schema.progress.id, 1));
      await db
        .insert(schema.inventory)
        .values({ itemKey: args.itemKey, quantity: owned + 1 })
        .onConflictDoUpdate({
          target: schema.inventory.itemKey,
          set: { quantity: owned + 1, updatedAt: new Date() },
        });
      ctx.invalidateQueries();
      return { ok: true, message: `兑换成功，花了 ${item.price} XP。`, xp: prog.xp - item.price };
    },
  }),

  useCard: defineAction({
    description: "在测验中使用一张背包里的道具卡（提示卡或免错卡），服务端核对库存后扣减一张。",
    request: z.object({ itemKey: z.enum(["hint_card", "shield_card"]) }),
    response: z.object({ ok: z.boolean(), message: z.string(), remaining: z.number() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.inventory).where(eq(schema.inventory.itemKey, args.itemKey));
      const qty = rows[0]?.quantity ?? 0;
      if (qty <= 0) return { ok: false, message: "背包里没有这张卡了。", remaining: 0 };
      await db
        .update(schema.inventory)
        .set({ quantity: qty - 1, updatedAt: new Date() })
        .where(eq(schema.inventory.itemKey, args.itemKey));
      ctx.invalidateQueries();
      return { ok: true, message: "已使用一张卡。", remaining: qty - 1 };
    },
  }),

  claimChallenge: defineAction({
    description: "领取本周挑战的完成奖励：服务端按真实进度复核达标后发 +30 XP 宝箱并点亮当周限定徽章。",
    request: z.object({ today: z.string().regex(dateRe) }),
    response: z.object({ ok: z.boolean(), message: z.string(), xpAwarded: z.number() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const prog = await ensureProgress(ctx);
      const state = await weekChallengeState(ctx, args.today);
      if (state.claimed) return { ok: false, message: "本周挑战奖励已经领过了，下周一见。", xpAwarded: 0 };
      if (state.progress < state.target) {
        return { ok: false, message: `还差 ${state.target - state.progress} 才能完成本周挑战。`, xpAwarded: 0 };
      }
      await db.insert(schema.chestClaims).values({ key: `challenge:${state.weekKey}`, xpAwarded: CHALLENGE_XP });
      await db.insert(schema.badgeUnlocks).values({ key: `challenge:${state.weekKey}` }).onConflictDoNothing();
      await db.update(schema.progress).set({ xp: prog.xp + CHALLENGE_XP }).where(eq(schema.progress.id, 1));
      ctx.invalidateQueries();
      return { ok: true, message: `本周挑战完成！宝箱 +${CHALLENGE_XP} XP，限定徽章已点亮。`, xpAwarded: CHALLENGE_XP };
    },
  }),

  feedPet: defineAction({
    description: "喂学习伙伴豆豆：今天已学习（打卡）且今天还没喂过才能喂，喂食次数会保存。",
    request: z.object({ today: z.string().regex(dateRe) }),
    response: z.object({ ok: z.boolean(), message: z.string(), feeds: z.number() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const pet = await ensurePet(ctx);
      const days = await db.select().from(schema.studyDays).where(eq(schema.studyDays.date, args.today));
      if (days.length === 0) {
        return { ok: false, message: "先完成今天的学习打卡，再来喂豆豆吧。", feeds: pet.feeds };
      }
      if (pet.lastFedDate === args.today) {
        return { ok: false, message: "豆豆今天已经吃饱啦，明天再来喂它。", feeds: pet.feeds };
      }
      await db
        .update(schema.petState)
        .set({ feeds: pet.feeds + 1, lastFedDate: args.today })
        .where(eq(schema.petState.id, 1));
      ctx.invalidateQueries();
      return { ok: true, message: "豆豆吃得可开心了！", feeds: pet.feeds + 1 };
    },
  }),

  markPetSeen: defineAction({
    description: "记录学习伙伴豆豆已被看到的最高等级，升级动画只在真正升级后播一次。",
    request: z.object({ level: z.number().int().min(1).max(5) }),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx, args): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      const pet = await ensurePet(ctx);
      if (args.level > pet.seenLevel) {
        await db.update(schema.petState).set({ seenLevel: args.level }).where(eq(schema.petState.id, 1));
        ctx.invalidateQueries();
      }
      return { ok: true };
    },
  }),

  resetProgress: defineAction({
    description: "清空全部学习进度（XP、连续天数、课程完成、复习标记、牌组、历史与写作记录），从种子重新开始。",
    request: z.object({}),
    response: z.object({ ok: z.literal(true) }),
    async handler(ctx): Promise<{ ok: true }> {
      const db = ctx.db<typeof schema>();
      await db.delete(schema.lessonProgress);
      await db.delete(schema.reviewMarks);
      await db.delete(schema.studyDays);
      await db.delete(schema.writingHistory);
      await db.delete(schema.attempts);
      await db.delete(schema.unlocks);
      await db.delete(schema.reviewDeck);
      await db.delete(schema.activityEvents);
      await db.delete(schema.chestClaims);
      await db.delete(schema.badgeUnlocks);
      await db.delete(schema.inventory);
      await db.delete(schema.petState);
      await db
        .insert(schema.progress)
        .values({ id: 1, xp: 0, streak: 0, lastStudyDate: null })
        .onConflictDoUpdate({
          target: schema.progress.id,
          set: { xp: 0, streak: 0, lastStudyDate: null },
        });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),
} satisfies ActionsModule;
