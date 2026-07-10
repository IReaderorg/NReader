export const migration_002 = {
    version: 2,
    name: 'downloads',
    sql: `
    CREATE TABLE IF NOT EXISTS downloads (
      id TEXT PRIMARY KEY,
      source_id TEXT NOT NULL,
      manga_id TEXT NOT NULL,
      manga_title TEXT,
      chapter_id TEXT NOT NULL,
      chapter_number REAL,
      chapter_title TEXT,
      status TEXT NOT NULL DEFAULT 'queued',
      progress INTEGER DEFAULT 0,
      bytes_downloaded INTEGER DEFAULT 0,
      total_bytes INTEGER,
      error TEXT,
      pages_path TEXT,
      created_at TEXT NOT NULL,
      completed_at TEXT
    );
  `
};
//# sourceMappingURL=002_downloads.sql.js.map