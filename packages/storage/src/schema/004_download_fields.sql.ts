import type { Migration } from './migrate.js'

export const migration_004: Migration = {
  version: 4,
  name: 'download_fields',
  sql: `
    ALTER TABLE downloads ADD COLUMN priority INTEGER DEFAULT 0;
    ALTER TABLE downloads ADD COLUMN retry_count INTEGER DEFAULT 0;
    ALTER TABLE downloads ADD COLUMN max_retries INTEGER DEFAULT 3;
  `
}
