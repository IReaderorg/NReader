import type { DatabaseDriver, SQLiteDriver } from './drivers/interface.js'
import { createDriver } from './drivers/factory.js'

export async function createDatabase(dbType?: 'memory' | 'node' | 'capacitor'): Promise<DatabaseDriver & SQLiteDriver> {
  return createDriver(dbType)
}
