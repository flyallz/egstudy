DROP TABLE entries;
--> statement-breakpoint
CREATE TABLE progress (
  id INTEGER PRIMARY KEY,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_study_date TEXT
);
--> statement-breakpoint
CREATE TABLE study_days (
  date TEXT PRIMARY KEY
);
--> statement-breakpoint
CREATE TABLE lesson_progress (
  lesson_id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  best_score INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  completed_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE review_marks (
  word_key TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE writing_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt TEXT NOT NULL,
  essay TEXT NOT NULL,
  overall_band REAL NOT NULL,
  summary TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
