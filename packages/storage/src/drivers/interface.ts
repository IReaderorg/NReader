export interface QueryResult {
  changes: number
  lastInsertRowid?: number
}

export interface DatabaseDriver {
  exec(sql: string, params?: any[]): any[]
  run(sql: string, params?: any[]): { changes: number; lastInsertRowid: number }
  get(sql: string, params?: any[]): any
  all(sql: string, params?: any[]): any[]
  transaction<T>(fn: () => T): T
  close(): Promise<void>
  export(): Uint8Array
  import(data: Uint8Array): void
}

export interface SQLiteDriver {
  query<T>(sql: string, params?: unknown[]): Promise<T[]>
  queryOne<T>(sql: string, params?: unknown[]): Promise<T | null>
  execute(sql: string, params?: unknown[]): Promise<QueryResult>
  transaction<T>(fn: () => Promise<T>): Promise<T>
  close(): Promise<void>
}
