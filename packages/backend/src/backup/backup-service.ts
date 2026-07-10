import type { SQLiteDriver } from '@ireader/storage'
import JSZip from 'jszip'
import type {
  BackupPayload, LibraryEntry, Category, HistoryEntry, Setting,
  DownloadJob, PluginMeta, GlossaryEntry
} from '@ireader/core'

export const BACKUP_FORMAT_VERSION = 2

export interface BackupMeta {
  version: number
  schemaVersion: number
  exportedAt: string
  createdAt: string
  appName: string
  sections: string[]
}

export function migrateBackupV1ToV2(data: Record<string, unknown>): Record<string, unknown> {
  // V1 didn't have version field in data; we add it
  data.version = BACKUP_FORMAT_VERSION
  data.createdAt = data.exportedAt ?? new Date().toISOString()
  return data
}

export type BackupSection = 'library' | 'categories' | 'history' | 'settings' | 'downloads' | 'glossary'

export class BackupService {
  constructor(
    private db: SQLiteDriver,
    private getData: () => Promise<BackupPayload>,
    private onProgress?: (stage: string, pct: number) => void
  ) {}

  async exportBackup(includeCovers = false, sections?: BackupSection[]): Promise<Uint8Array> {
    const data = await this.getData()
    const zip = new JSZip()
    const allSections: BackupSection[] = sections ?? ['library', 'categories', 'history', 'settings', 'downloads', 'glossary']

    this.onProgress?.('export', 5)

    // Metadata
    const meta: BackupMeta = {
      version: BACKUP_FORMAT_VERSION,
      schemaVersion: data.schemaVersion,
      exportedAt: data.exportedAt,
      createdAt: new Date().toISOString(),
      appName: 'IReader-Next',
      sections: allSections,
    }
    zip.file('metadata.json', JSON.stringify(meta, null, 2))

    this.onProgress?.('export', 15)

    // DB tables (selective)
    const tables = zip.folder('db-tables')!
    const sectionMap: Record<BackupSection, { data: unknown; file: string }> = {
      library: { data: data.library, file: 'library.json' },
      categories: { data: data.categories, file: 'categories.json' },
      history: { data: data.history, file: 'history.json' },
      settings: { data: data.settings, file: 'settings.json' },
      downloads: { data: data.downloads, file: 'downloads.json' },
      glossary: { data: data.glossary, file: 'glossary.json' },
    }

    let step = 0
    for (const section of allSections) {
      const entry = sectionMap[section]
      if (entry) {
        tables.file(entry.file, JSON.stringify(entry.data, null, 2))
      }
      step++
      this.onProgress?.('export', 15 + (step / allSections.length) * 60)
    }

    // Plugins
    tables.file('plugins.json', JSON.stringify(data.plugins, null, 2))
    this.onProgress?.('export', 80)

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

    this.onProgress?.('export', 95)

    const result = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' })
    this.onProgress?.('export', 100)
    return result
  }

  async importBackup(
    zipData: Uint8Array,
    strategy: 'merge' | 'replace' = 'merge',
    sections?: BackupSection[]
  ): Promise<{ tables: string[]; entries: number }> {
    const zip = await JSZip.loadAsync(zipData)
    this.onProgress?.('import', 10)

    // Validate metadata
    const metaFile = zip.file('metadata.json')
    if (!metaFile) throw new Error('Invalid backup: missing metadata.json')
    const metaText = await metaFile.async('string')
    let metadata = JSON.parse(metaText)

    // Migration: if version is 1 or missing, migrate
    if (!metadata.version || metadata.version < BACKUP_FORMAT_VERSION) {
      metadata = migrateBackupV1ToV2(metadata)
    }

    if (!metadata.createdAt) {
      throw new Error('Invalid backup: incomplete metadata')
    }

    this.onProgress?.('import', 20)

    const tables: string[] = []
    let totalEntries = 0

    function toSnakeCase(key: string): string {
      return key.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase())
    }

    function toSqlValue(val: unknown): unknown {
      if (val === null || val === undefined) return null
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') return val
      return JSON.stringify(val)
    }

    async function readTable<T>(name: string): Promise<T[]> {
      const file = zip.file(`db-tables/${name}`)
      if (!file) return []
      const text = await file.async('string')
      return JSON.parse(text) as T[]
    }

    const allSections: BackupSection[] = sections ?? ['library', 'categories', 'history', 'settings', 'downloads', 'glossary']
    const importSections = metadata.sections
      ? allSections.filter((s: BackupSection) => metadata.sections.includes(s))
      : allSections

    const tableDefs: { name: string; table: string; data: () => Promise<any[]>; clearSql: string; section: BackupSection }[] = [
      { name: 'library.json', table: 'library', data: () => readTable<LibraryEntry>('library.json'), clearSql: 'DELETE FROM library', section: 'library' },
      { name: 'categories.json', table: 'categories', data: () => readTable<Category>('categories.json'), clearSql: 'DELETE FROM categories', section: 'categories' },
      { name: 'history.json', table: 'history', data: () => readTable<HistoryEntry>('history.json'), clearSql: 'DELETE FROM history', section: 'history' },
      { name: 'settings.json', table: 'settings', data: () => readTable<Setting>('settings.json'), clearSql: 'DELETE FROM settings', section: 'settings' },
      { name: 'downloads.json', table: 'downloads', data: () => readTable<DownloadJob>('downloads.json'), clearSql: 'DELETE FROM downloads', section: 'downloads' },
      { name: 'glossary.json', table: 'glossary', data: () => readTable<GlossaryEntry>('glossary.json'), clearSql: 'DELETE FROM glossary', section: 'glossary' },
      { name: 'plugins.json', table: 'plugins', data: () => readTable<PluginMeta>('plugins.json'), clearSql: 'DELETE FROM plugins', section: 'glossary' },
    ]

    let step = 0
    for (const td of tableDefs) {
      if (!importSections.includes(td.section)) continue

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
      step++
      this.onProgress?.('import', 20 + (step / tableDefs.length) * 60)
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

    this.onProgress?.('import', 100)
    return { tables, entries: totalEntries }
  }
}
