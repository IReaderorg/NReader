import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import initSqlJs from 'sql.js'
import type { SqlJsStatic, Database as SqlJsDatabase } from 'sql.js'
import { MemoryDriver } from './memory.js'

export class NodeFileDriver extends MemoryDriver {
  private dbPath: string

  constructor(db: SqlJsDatabase, SQL: SqlJsStatic, dbPath: string) {
    super(db, SQL)
    this.dbPath = dbPath
  }

  private async persist(): Promise<void> {
    const data = this.export()
    await mkdir(dirname(this.dbPath), { recursive: true })
    await writeFile(this.dbPath, data)
  }

  async close(): Promise<void> {
    await this.persist()
    this.db.close()
  }
}

export async function createNodeFileDriver(
  dbPath?: string
): Promise<NodeFileDriver> {
  const resolvedPath = dbPath || process.env.IREADER_DB_PATH || './data/ireader.db'
  const SQL = await initSqlJs()

  let db: SqlJsDatabase
  try {
    const bytes = await readFile(resolvedPath)
    db = new SQL.Database(bytes)
  } catch {
    db = new SQL.Database()
    await mkdir(dirname(resolvedPath), { recursive: true })
  }

  return new NodeFileDriver(db, SQL, resolvedPath)
}
