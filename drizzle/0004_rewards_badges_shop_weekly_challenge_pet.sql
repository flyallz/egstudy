CREATE TABLE badge_unlocks (
  key TEXT PRIMARY KEY,
  unlocked_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE inventory (
  item_key TEXT PRIMARY KEY,
  quantity INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE pet_state (
  id INTEGER PRIMARY KEY,
  feeds INTEGER NOT NULL DEFAULT 0,
  last_fed_date TEXT,
  seen_level INTEGER NOT NULL DEFAULT 1
);
