import type { SQLiteDriver } from '@ireader/storage'
import JSZip from 'jszip'
import type {
  BackupPayload, LibraryEntry, Category, HistoryEntry, Setting,
  DownloadJob, PluginMeta, GlossaryEntry
} from '@ireader/core'

export class BackupService {
  constructor(private db: SQLiteDriver, private getData: () => Promise<BackupPayload>) {}

  async exportBackup(includeCovers = false): Promise<Uint8Array> {
    const data = await this.getData()
    const zip = new JSZip()

    // Metadata
    zip.file('metadata.json', JSON.stringify({
      version: data.version,
      schemaVersion: data.schemaVersion,
      exportedAt: data.exportedAt,
      appName: 'IReader-Next',
    }, null, 2))

    // DB tables
    const tables = zip.folder('db-tables')!
    tables.file('library.json', JSON.stringify(data.library, null, 2))
    tables.file('categories.json', JSON.stringify(data.categories, null, 2))
    tables.file('history.json', JSON.stringify(data.history, null, 2))
    tables.file('settings.json', JSON.stringify(data.settings, null, 2))
    tables.file('downloads.json', JSON.stringify(data.downloads, null, 2))
    tables.file('glossary.json', JSON.stringify(data.glossary, null, 2))
    tables.file('plugins.json', JSON.stringify(data.plugins, null, 2))

    // Covers (optional)
    if (includeCovers && data.covers) {
      const covers = zip.folder('covers')!
      for (const [mangaId, base64] of Object.entries(data.covers)) {
        covers.file(`${mangaId.replace(/[^a-zA-Z0-9_-]/g, '_')}.txt`, base64)
      }
    }

    // Plugin source files
    if (data.plugins.length > 0) {
      const pluginsFolder = zip.folder('plugins')!
      for (const plugin of data.plugins) {
        if (plugin.code) {
          pluginsFolder.file(`${plugin.id}.js`, plugin.code)
        }
      }
    }

    return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' })
  }

  async importBackup(zipData: Uint8Array, strategy: 'merge' | 'replace' = 'merge'): Promise<{ tables: string[]; entries: number }> {
    const zip = await JSZip.loadAsync(zipData)

    // Validate metadata
    const metaFile = zip.file('metadata.json')
    if (!metaFile) throw new Error('Invalid backup: missing metadata.json')
    const metaText = await metaFile.async('string')
    const metadata = JSON.parse(metaText)
    if (!metadata.version || !metadata.exportedAt) {
      throw new Error('Invalid backup: incomplete metadata')
    }

    const tables: string[] = []
    let totalEntries = 0

    // Convert camelCase keys to snake_case for SQL column names
    function toSnakeCase(key: string): string {
      return key.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase())
    }

    // Serialize non-primitive values for SQLite (arrays/objects → JSON string)
    function toSqlValue(val: unknown): unknown {
      if (val === null || val === undefined) return null
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') return val
      return JSON.stringify(val)
    }

    // Helper to read a JSON table from the ZIP
    async function readTable<T>(name: string): Promise<T[]> {
      const file = zip.file(`db-tables/${name}`)
      if (!file) return []
      const text = await file.async('string')
      return JSON.parse(text) as T[]
    }

    // Import tables (merge appends, replace clears first)
    const tableDefs: { name: string; table: string; data: () => Promise<any[]>; clearSql: string }[] = [
      { name: 'library.json', table: 'library', data: () => readTable<LibraryEntry>('library.json'), clearSql: 'DELETE FROM library' },
      { name: 'categories.json', table: 'categories', data: () => readTable<Category>('categories.json'), clearSql: 'DELETE FROM categories' },
      { name: 'history.json', table: 'history', data: () => readTable<HistoryEntry>('history.json'), clearSql: 'DELETE FROM history' },
      { name: 'settings.json', table: 'settings', data: () => readTable<Setting>('settings.json'), clearSql: 'DELETE FROM settings' },
      { name: 'downloads.json', table: 'downloads', data: () => readTable<DownloadJob>('downloads.json'), clearSql: 'DELETE FROM downloads' },
      { name: 'glossary.json', table: 'glossary', data: () => readTable<GlossaryEntry>('glossary.json'), clearSql: 'DELETE FROM glossary' },
      { name: 'plugins.json', table: 'plugins', data: () => readTable<PluginMeta>('plugins.json'), clearSql: 'DELETE FROM plugins' },
    ]

    for (const td of tableDefs) {
      const rows = await td.data()
      if (rows.length === 0) continue

      await this.db.transaction(async () => {
        if (strategy === 'replace') {
          await this.db.execute(td.clearSql)
        }

        for (const row of rows) {
          const keys = Object.keys(row as any).map(toSnakeCase)
          const values = (Object.values(row as any)).map(toSqlValue)
          const placeholders = keys.map(() => '?').join(', ')
          await this.db.execute(
            `INSERT OR REPLACE INTO ${td.table} (${keys.join(', ')}) VALUES (${placeholders})`,
            values
          )
        }
      })

      tables.push(td.table)
      totalEntries += rows.length
    }

    // Import plugin source files
    const pluginFiles = zip.folder('plugins')
    if (pluginFiles) {
      const pluginPromises: Promise<void>[] = []
      pluginFiles.forEach((relPath, file) => {
        if (relPath.endsWith('.js')) {
          const id = relPath.replace(/\.js$/, '')
          pluginPromises.push(
            file.async('string').then(async (code) => {
              await this.db.execute(
                `INSERT OR REPLACE INTO plugins (id, type, name, code, enabled, installed_at) VALUES (?, 'source', ?, ?, 1, datetime('now'))`,
                [id, id, code]
              )
            })
          )
        }
      })
      await Promise.all(pluginPromises)
    }

    return { tables, entries: totalEntries }
  }
}
