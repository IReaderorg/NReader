import initSqlJs from 'sql.js'
import type { SqlJsStatic, Database as SqlJsDatabase } from 'sql.js'
import { MemoryDriver } from './memory.js'

const DEFAULT_PATH = 'Documents/ireader-next/data.db'

export class CapacitorFileDriver extends MemoryDriver {
  private fileName: string
  private saveTimer: ReturnType<typeof setTimeout> | null = null
  private hasCapacitor: boolean

  constructor(
    db: SqlJsDatabase,
    SQL: SqlJsStatic,
    fileName: string,
    hasCapacitor: boolean
  ) {
    super(db, SQL)
    this.fileName = fileName
    this.hasCapacitor = hasCapacitor
  }

  private scheduleSave(): void {
    if (!this.hasCapacitor) return
    if (this.saveTimer) clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => this.save(), 1000)
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

  async save(): Promise<void> {
    if (!this.hasCapacitor) return
    try {
      const { Filesystem, Directory } = await import('@capacitor/filesystem')
      const data = this.export()
      await Filesystem.writeFile({
        path: this.fileName,
        data: btoa(String.fromCharCode(...data)),
        directory: Directory.Documents,
      })
    } catch {
      // Capacitor not available — no-op
    }
  }

  async close(): Promise<void> {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
      this.saveTimer = null
    }
    await this.save()
    this.db.close()
  }
}

export async function createCapacitorFileDriver(
  name?: string
): Promise<CapacitorFileDriver> {
  const fileName = name || DEFAULT_PATH
  const SQL = await initSqlJs()

  let db: SqlJsDatabase
  let hasCapacitor = false

  try {
    const { Filesystem, Directory } = await import('@capacitor/filesystem')
    hasCapacitor = true
    const result = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Documents,
    })
    const binaryStr = atob(result.data as string)
    const bytes = new Uint8Array(binaryStr.length)
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i)
    }
    db = new SQL.Database(bytes)
  } catch {
    db = new SQL.Database()
  }

  return new CapacitorFileDriver(db, SQL, fileName, hasCapacitor)
}
