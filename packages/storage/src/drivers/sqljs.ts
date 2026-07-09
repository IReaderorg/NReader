import initSqlJs from 'sql.js'
import type { Database as SqlJsDatabase } from 'sql.js'
import { readFile } from 'node:fs/promises'
import type { SQLiteDriver, QueryResult } from './interface.js'

export class SqlJsDriver implements SQLiteDriver {
  private db: SqlJsDatabase
  private writeQueue: Promise<void> = Promise.resolve()

  constructor(db: SqlJsDatabase) {
    this.db = db
  }

  async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
    const stmt = this.db.prepare(sql)
    if (params && params.length > 0) {
      stmt.bind(params)
    }
    const results: T[] = []
    while (stmt.step()) {
      results.push(stmt.getAsObject() as T)
    }
    stmt.free()
    return results
  }

  async queryOne<T>(sql: string, params?: unknown[]): Promise<T | null> {
    const results = await this.query<T>(sql, params)
    return results[0] ?? null
  }

  async execute(sql: string, params?: unknown[]): Promise<QueryResult> {
    this.db.run(sql, params)
    const changes = this.db.getRowsModified()
    let lastInsertRowid: number | undefined
    const rowidStmt = this.db.prepare('SELECT last_insert_rowid()')
    if (rowidStmt.step()) {
      const row = rowidStmt.getAsObject() as Record<string, number>
      const val = Object.values(row)[0]
      if (typeof val === 'number' && val > 0) {
        lastInsertRowid = val
      }
    }
    rowidStmt.free()
    return { changes, lastInsertRowid }
  }

  async transaction<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.writeQueue = this.writeQueue.then(async () => {
        try {
          this.db.run('BEGIN')
          const result = await fn()
          this.db.run('COMMIT')
          resolve(result)
        } catch (err) {
          this.db.run('ROLLBACK')
          reject(err)
        }
      })
    })
  }

  async close(): Promise<void> {
    this.db.close()
  }

  static async createInMemory(): Promise<SqlJsDriver> {
    const SQL = await initSqlJs()
    return new SqlJsDriver(new SQL.Database())
  }

  static async create(path: string, dbFactory: (bytes: Uint8Array) => SqlJsDatabase): Promise<SqlJsDriver> {
    const bytes = await readFile(path)
    const db = dbFactory(bytes)
    return new SqlJsDriver(db)
  }
}
