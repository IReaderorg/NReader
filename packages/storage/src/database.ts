import { SqlJsDriver } from './drivers/sqljs.js'

export async function createDatabase(path: string): Promise<SqlJsDriver> {
  return SqlJsDriver.createInMemory()
}
