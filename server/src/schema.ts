import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Single-learner progress row (id is always 1).
export const progress = sqliteTable("progress", {
  id: integer("id").primaryKey(),
  xp: integer("xp").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  lastStudyDate: text("last_study_date"),
});

// One row per local calendar day the learner studied (YYYY-MM-DD).
export const studyDays = sqliteTable("study_days", {
  date: text("date").primaryKey(),
});

// One row per lesson the learner has attempted.
export const lessonProgress = sqliteTable("lesson_progress", {
  lessonId: text("lesson_id").primaryKey(),
  kind: text("kind", { enum: ["grammar", "vocab-topic", "vocab-cefr"] }).notNull(),
  bestScore: integer("best_score").notNull().default(0),
  xpEarned: integer("xp_earned").notNull().default(0),
  completedAt: integer("completed_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Spaced-review marks per word (key = the English word, lowercased).
export const reviewMarks = sqliteTable("review_marks", {
  wordKey: text("word_key").primaryKey(),
  status: text("status", { enum: ["known", "learning"] }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// One row per quiz attempt (finished or interrupted) — powers the history page.
export const attempts = sqliteTable("attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: text("lesson_id").notNull(),
  kind: text("kind").notNull(),
  title: text("title").notNull(),
  difficulty: text("difficulty").notNull().default(""),
  total: integer("total").notNull().default(0),
  answered: integer("answered").notNull().default(0),
  correct: integer("correct").notNull().default(0),
  score: integer("score").notNull().default(0),
  stars: integer("stars").notNull().default(0),
  interrupted: integer("interrupted").notNull().default(0),
  // JSON: [{q, options, picked, answer, correct}]
  detail: text("detail").notNull().default("[]"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Placement-test unlocks, key e.g. "grammar:A2" / "topic:t-education".
export const unlocks = sqliteTable("unlocks", {
  key: text("key").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Words the learner added to the review deck (from cards or custom creation).
export const reviewDeck = sqliteTable("review_deck", {
  wordKey: text("word_key").primaryKey(),
  word: text("word").notNull(),
  phonetic: text("phonetic").notNull().default(""),
  pos: text("pos").notNull().default(""),
  meaning: text("meaning").notNull().default(""),
  example: text("example").notNull().default(""),
  exampleCn: text("example_cn").notNull().default(""),
  source: text("source").notNull().default("added"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Lightweight per-day activity events for the daily goals / treasure chests.
export const activityEvents = sqliteTable("activity_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(),
  type: text("type").notNull(), // lesson | review | writing | placement | cards
  amount: integer("amount").notNull().default(1),
});

// Claimed treasure chests, key e.g. "daily:2026-11-14" / "weekly:2026-W46".
export const chestClaims = sqliteTable("chest_claims", {
  key: text("key").primaryKey(),
  xpAwarded: integer("xp_awarded").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Learner profile (single row, id = 1).
export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().default("学习者"),
  email: text("email").notNull().default(""),
});

// Achievement badges the learner has unlocked (key = badge id, e.g. "perfect"
// or "challenge:2026-11-16" for a weekly-challenge limited badge).
export const badgeUnlocks = sqliteTable("badge_unlocks", {
  key: text("key").primaryKey(),
  unlockedAt: integer("unlocked_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Reward-shop inventory: consumable cards stack (quantity > 1 possible),
// one-time skins / avatar frames sit at quantity 1 once owned.
export const inventory = sqliteTable("inventory", {
  itemKey: text("item_key").primaryKey(),
  quantity: integer("quantity").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Study-buddy pet state (single row, id = 1). The pet's level itself is
// derived from total XP; this row only stores feeding + seen-level state.
export const petState = sqliteTable("pet_state", {
  id: integer("id").primaryKey(),
  feeds: integer("feeds").notNull().default(0),
  lastFedDate: text("last_fed_date"),
  seenLevel: integer("seen_level").notNull().default(1),
});

// Past IELTS Writing Task 2 gradings.
export const writingHistory = sqliteTable("writing_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  prompt: text("prompt").notNull(),
  essay: text("essay").notNull(),
  overallBand: real("overall_band").notNull(),
  summary: text("summary").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
