import type { Migration } from './migrate.js'

export const migration_006: Migration = {
  version: 6,
  name: 'character_art',
  sql: `
    CREATE TABLE IF NOT EXISTS character_art (
      id TEXT PRIMARY KEY,
      mangaId TEXT NOT NULL,
      userId TEXT,
      imageUrl TEXT NOT NULL,
      caption TEXT,
      artist TEXT,
      source TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (mangaId) REFERENCES library(mangaId)
    );
    CREATE INDEX IF NOT EXISTS idx_char_art_manga ON character_art(mangaId);
  `
}
