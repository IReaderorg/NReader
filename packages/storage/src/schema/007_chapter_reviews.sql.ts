import type { Migration } from './migrate.js'

export const migration_007: Migration = {
  version: 7,
  name: 'chapter_reviews',
  sql: `
    CREATE TABLE IF NOT EXISTS chapter_reviews (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE INDEX IF NOT EXISTS idx_chapter_reviews_chapter ON chapter_reviews(chapter_id);
  `
}
