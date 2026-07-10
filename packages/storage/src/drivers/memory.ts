import initSqlJs from 'sql.js'
import type { SqlJsStatic, Database as SqlJsDatabase } from 'sql.js'
import type { DatabaseDriver, SQLiteDriver, QueryResult } from './interface.js'

export class MemoryDriver implements DatabaseDriver, SQLiteDriver {
  protected db: SqlJsDatabase
  protected SQL: SqlJsStatic

  constructor(db: SqlJsDatabase, SQL: SqlJsStatic) {
    this.db = db
    this.SQL = SQL
  }

  exec(sql: string, params?: any[]): any[] {
    const stmt = this.db.prepare(sql)
    if (params && params.length > 0) stmt.bind(params)
    const results: any[] = []
    while (stmt.step()) results.push(stmt.getAsObject())
    stmt.free()
    return results
  }

  run(sql: string, params?: any[]): { changes: number; lastInsertRowid: number } {
    this.db.run(sql, params)
    const changes = this.db.getRowsModified()
    const stmt = this.db.prepare('SELECT last_insert_rowid() as id')
    let lastInsertRowid = 0
    if (stmt.step()) {
      const row = stmt.getAsObject() as Record<string, number>
      lastInsertRowid = row.id ?? 0
    }
    stmt.free()
    return { changes, lastInsertRowid }
  }

  get(sql: string, params?: any[]): any {
    const stmt = this.db.prepare(sql)
    if (params && params.length > 0) stmt.bind(params)
    let result: any = null
    if (stmt.step()) result = stmt.getAsObject()
    stmt.free()
    return result
  }

  all(sql: string, params?: any[]): any[] {
    return this.exec(sql, params)
  }

  transaction<T>(fn: () => T): T {
    try {
      this.db.run('BEGIN')
      const result = fn()
      this.db.run('COMMIT')
      return result
    } catch (err) {
      this.db.run('ROLLBACK')
      throw err
    }
  }

  close(): Promise<void> {
    this.db.close()
    return Promise.resolve()
  }

  export(): Uint8Array {
    return this.db.export()
  }

  import(data: Uint8Array): void {
    this.db.close()
    this.db = new this.SQL.Database(data)
  }

  // SQLiteDriver compatibility
  async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
    return this.exec(sql, params as any[]) as T[]
  }

  async queryOne<T>(sql: string, params?: unknown[]): Promise<T | null> {
    const result = this.get(sql, params as any[])
    return (result as T) ?? null
  }

  async execute(sql: string, params?: unknown[]): Promise<QueryResult> {
    const { changes, lastInsertRowid } = this.run(sql, params as any[])
    return { changes, lastInsertRowid: lastInsertRowid || undefined }
  }
}

export async function createMemoryDriver(): Promise<MemoryDriver> {
  const SQL = await initSqlJs()
  return new MemoryDriver(new SQL.Database(), SQL)
}
