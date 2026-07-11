import type { SettingsRepository, Setting } from '@ireader/core'
import type { SQLiteDriver } from '../drivers/interface.js'

function safeParse(value: unknown): unknown {
  if (value == null) return null
  const str = String(value)
  try {
    return JSON.parse(str)
  } catch {
    // Value is a raw string not JSON-encoded (e.g. "amoled"), return as-is
    return str
  }
}

export class SqliteSettingsRepository implements SettingsRepository {
  constructor(private driver: SQLiteDriver) {}

  async getAll(): Promise<Setting[]> {
    const rows = await this.driver.query<{ key: string; value: unknown }>('SELECT * FROM settings')
    return rows.map(row => ({ key: row.key, value: safeParse(row.value) }))
  }
  
  async get(key: string): Promise<Setting | null> {
    const row = await this.driver.queryOne<{ key: string; value: unknown }>('SELECT * FROM settings WHERE key = ?', [key])
    if (!row) return null
    return { key: row.key, value: safeParse(row.value) }
  }

  async set(key: string, value: unknown): Promise<void> {
    await this.driver.execute('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, JSON.stringify(value)])
  }

  async delete(key: string): Promise<void> {
    await this.driver.execute('DELETE FROM settings WHERE key = ?', [key])
  }
}
