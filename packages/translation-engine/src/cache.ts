/**
 * LRU translation cache with optional SQLite persistence.
 * Key format: `${sourceLang}:${targetLang}:${paragraphHash}`
 */

interface CacheEntry {
  value: string
  accessed: number
}

export class TranslationCache {
  private maxSize: number
  private store: Map<string, CacheEntry>
  private db: any = null
  private ready = false

  constructor(maxSize = 500) {
    this.maxSize = maxSize
    this.store = new Map()
  }

  /** Optionally attach SQLite backend. Call after init. */
  async attachSqlite(db: any): Promise<void> {
    this.db = db
    await this.db.exec(`CREATE TABLE IF NOT EXISTS translation_cache (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      accessed INTEGER NOT NULL
    )`)
    this.ready = true
    const rows = await this.db.all('SELECT key, value, accessed FROM translation_cache ORDER BY accessed DESC LIMIT ?', this.maxSize)
    for (const r of rows) {
      this.store.set(r.key, { value: r.value, accessed: r.accessed })
    }
  }

  private hash(s: string): string {
    let h = 0
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0
    }
    return (h >>> 0).toString(36)
  }

  key(sourceLang: string, targetLang: string, text: string): string {
    return `${sourceLang}:${targetLang}:${this.hash(text)}`
  }

  get(k: string): string | undefined {
    const entry = this.store.get(k)
    if (!entry) return undefined
    entry.accessed = Date.now()
    this.store.delete(k)
    this.store.set(k, entry)
    return entry.value
  }

  set(k: string, value: string): void {
    if (this.store.size >= this.maxSize) {
      const oldest = this.store.keys().next().value
      if (oldest !== undefined) this.store.delete(oldest)
    }
    this.store.set(k, { value, accessed: Date.now() })

    if (this.ready && this.db) {
      this.db.run(
        'INSERT OR REPLACE INTO translation_cache (key, value, accessed) VALUES (?, ?, ?)',
        k, value, Date.now()
      ).catch(() => {})
    }
  }

  has(k: string): boolean {
    return this.store.has(k)
  }

  clear(): void {
    this.store.clear()
    if (this.ready && this.db) {
      this.db.run('DELETE FROM translation_cache').catch(() => {})
    }
  }

  get size(): number {
    return this.store.size
  }
}
