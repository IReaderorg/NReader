import type { SQLiteDriver } from '../drivers/interface.js'

export interface Migration {
  version: number
  name: string
  sql: string
}

export async function runMigrations(driver: SQLiteDriver, migrations: Migration[]): Promise<void> {
  const result = await driver.queryOne<{ user_version: number }>('PRAGMA user_version')
  const currentVersion = result?.user_version ?? 0

  const pending = migrations
    .filter(m => m.version > currentVersion)
    .sort((a, b) => a.version - b.version)

  if (pending.length === 0) return

  for (const migration of pending) {
    await driver.transaction(async () => {
      await driver.execute(migration.sql)
      await driver.execute(`PRAGMA user_version = ${migration.version}`)
    })
  }
}
