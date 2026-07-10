import type { Migration } from './migrate.js'

export const migration_001: Migration = {
  version: 1,
  name: 'initial',
  sql: `
    CREATE TABLE IF NOT EXISTS library (
          id TEXT PRIMARY KEY,
          source_id TEXT NOT NULL,
          manga_id TEXT NOT NULL,
          title TEXT NOT NULL,
          cover_url TEXT,
          author TEXT,
          status TEXT,
          rating REAL,
          genres TEXT,
          description TEXT,
          last_read_at TEXT,
          chapters_read INTEGER DEFAULT 0,
          total_chapters INTEGER,
          score INTEGER,
          favorited INTEGER DEFAULT 0,
          archived INTEGER DEFAULT 0,
          date_added TEXT,
          date_updated TEXT,
          category_ids TEXT,
          UNIQUE(source_id, manga_id)
        );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sort_order INTEGER,
      color TEXT
    );

    CREATE TABLE IF NOT EXISTS history (
      id TEXT PRIMARY KEY,
      manga_id TEXT NOT NULL,
      source_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      chapter_number REAL,
      chapter_title TEXT,
      page INTEGER DEFAULT 0,
      scroll_position REAL DEFAULT 0,
      read_at TEXT,
      UNIQUE(source_id, manga_id, chapter_id)
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS plugins (
      id TEXT PRIMARY KEY,
      type TEXT DEFAULT 'source',
      name TEXT,
      version TEXT,
      code TEXT,
      enabled INTEGER DEFAULT 1,
      installed_at TEXT
    );
  `
}
