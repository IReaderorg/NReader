import type { Migration } from './migrate.js'

export const migration_005: Migration = {
  version: 5,
  name: 'social',
  sql: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      avatar_url TEXT,
      bio TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS community_posts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT DEFAULT 'post',
      parent_id TEXT,
      likes INTEGER DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (parent_id) REFERENCES community_posts(id)
    );

    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      manga_id TEXT,
      source_id TEXT,
      chapter_id TEXT,
      text TEXT NOT NULL,
      context TEXT,
      likes INTEGER DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS reading_activity (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      manga_id TEXT,
      source_id TEXT,
      chapter_id TEXT,
      action TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `
}
