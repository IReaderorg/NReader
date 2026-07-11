import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import initSqlJs from 'sql.js'
import type { SqlJsStatic, Database as SqlJsDatabase } from 'sql.js'
import { MemoryDriver } from './memory.js'

export class NodeFileDriver extends MemoryDriver {
  private dbPath: string
  private saveTimer: ReturnType<typeof setTimeout> | null = null
  private persistPromise: Promise<void> = Promise.resolve()

  constructor(db: SqlJsDatabase, SQL: SqlJsStatic, dbPath: string) {
    super(db, SQL)
    this.dbPath = dbPath
  }

  private scheduleSave(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => this.flush(), 1000)
  }

  private async flush(): Promise<void> {
    this.persistPromise = this.persist()
    await this.persistPromise
  }

  private async persist(): Promise<void> {
    const data = this.export()
    await mkdir(dirname(this.dbPath), { recursive: true })
    await writeFile(this.dbPath, data)
  }

  run(sql: string, params?: any[]): { changes: number; lastInsertRowid: number } {
    const result = super.run(sql, params)
    this.scheduleSave()
    return result
  }

  transaction<T>(fn: () => T): T {
    const result = super.transaction(fn)
    this.scheduleSave()
    return result
  }

  async close(): Promise<void> {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
      this.saveTimer = null
    }
    await this.persistPromise
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
