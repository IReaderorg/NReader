export const migration_004 = {
    version: 4,
    name: 'download_fields',
    sql: `
    ALTER TABLE downloads ADD COLUMN priority INTEGER DEFAULT 0;
    ALTER TABLE downloads ADD COLUMN retry_count INTEGER DEFAULT 0;
    ALTER TABLE downloads ADD COLUMN max_retries INTEGER DEFAULT 3;
  `
};
//# sourceMappingURL=004_download_fields.sql.js.map