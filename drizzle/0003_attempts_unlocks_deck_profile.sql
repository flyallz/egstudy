CREATE TABLE attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT '',
  total INTEGER NOT NULL DEFAULT 0,
  answered INTEGER NOT NULL DEFAULT 0,
  correct INTEGER NOT NULL DEFAULT 0,
  score INTEGER NOT NULL DEFAULT 0,
  stars INTEGER NOT NULL DEFAULT 0,
  interrupted INTEGER NOT NULL DEFAULT 0,
  detail TEXT NOT NULL DEFAULT '[]',
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE unlocks (
  key TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE review_deck (
  word_key TEXT PRIMARY KEY,
  word TEXT NOT NULL,
  phonetic TEXT NOT NULL DEFAULT '',
  pos TEXT NOT NULL DEFAULT '',
  meaning TEXT NOT NULL DEFAULT '',
  example TEXT NOT NULL DEFAULT '',
  example_cn TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'added',
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE activity_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  type TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE chest_claims (
  key TEXT PRIMARY KEY,
  xp_awarded INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE profile (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '学习者',
  email TEXT NOT NULL DEFAULT ''
);
