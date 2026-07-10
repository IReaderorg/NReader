export const migration_003 = {
    version: 3,
    name: 'glossary',
    sql: `
    CREATE TABLE IF NOT EXISTS glossary (
      id TEXT PRIMARY KEY,
      source_lang TEXT NOT NULL,
      target_lang TEXT NOT NULL DEFAULT 'en',
      source_text TEXT NOT NULL,
      target_text TEXT NOT NULL,
      context TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_glossary_lookup ON glossary(source_lang, target_lang, source_text);
  `
};
//# sourceMappingURL=003_glossary.sql.js.map