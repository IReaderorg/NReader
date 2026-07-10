// Backup orchestrator — multi-step pipeline with progress callbacks
// ponytail: sequential pipeline, upgrade to parallel stages when latency becomes an issue

import type { BackupPayload } from '@ireader/core'
import type { BackupSection } from './backup-service.js'
import { BackupService } from './backup-service.js'
import { BackupSerializer, backupSerializer } from './backup-serializer.js'
import { BackupEncryption, backupEncryption } from './encryption.js'
import { LNReaderParser, lnreaderParser } from './lnreader-parser.js'
import { LegacyMigrator, legacyMigrator } from './legacy-migrator.js'
import JSZip from 'jszip'

export type PipelineStep = 'collect' | 'serialize' | 'compress' | 'encrypt' | 'store'

export interface ExportOptions {
  password?: string
  sections?: BackupSection[]
  includeCovers?: boolean
  format?: 'ireader' | 'lnreader'
}

export interface ImportOptions {
  password?: string
  strategy?: 'merge' | 'replace'
  sections?: BackupSection[]
  format?: 'ireader' | 'lnreader'
}

export type ProgressCallback = (step: string, pct: number) => void

export class BackupOrchestrator {
  constructor(
    private backupService: BackupService,
    private getData: () => Promise<BackupPayload>,
    private serializer: BackupSerializer = backupSerializer,
    private encryption: BackupEncryption = backupEncryption,
    private parser: LNReaderParser = lnreaderParser,
    private migrator: LegacyMigrator = legacyMigrator,
  ) {}

  /** Export pipeline: collect → serialize → (encrypt) → return Buffer */
  async orchestrateExport(
    _sections: BackupSection[],
    options: ExportOptions = {},
    onProgress?: ProgressCallback,
  ): Promise<Buffer> {
    onProgress?.('collect', 10)
    const payload = await this.getData()
    onProgress?.('collect', 30)

    if (options.format === 'lnreader') {
      const json = this.parser.exportLNReaderBackup(payload)
      onProgress?.('serialize', 60)
      let buf: Buffer = Buffer.from(json, 'utf-8')
      if (options.password) {
        onProgress?.('encrypt', 80)
        buf = this.encryption.encrypt(buf, options.password)
      }
      onProgress?.('store', 100)
      return buf
    }

    onProgress?.('serialize', 50)
    let buf = this.serializer.serialize(payload)

    if (options.password) {
      onProgress?.('encrypt', 75)
      buf = this.encryption.encrypt(buf, options.password)
    }

    onProgress?.('store', 100)
    return buf
  }

  /** Import pipeline: (decrypt) → deserialize → migrate → import via BackupService */
  async orchestrateImport(
    buffer: Buffer,
    options: ImportOptions = {},
    onProgress?: ProgressCallback,
  ): Promise<{ tables: string[]; entries: number }> {
    onProgress?.('decrypt', 10)
    let data = buffer

    if (options.password) {
      if (!this.encryption.isEncrypted(data)) {
        throw new Error('Password provided but backup is not encrypted')
      }
      data = this.encryption.decrypt(data, options.password)
    }

    const text = data.toString('utf-8')
    const parsed = JSON.parse(text)
    onProgress?.('deserialize', 30)

    let payload: BackupPayload

    if (options.format === 'lnreader' || (parsed && parsed.mangas !== undefined)) {
      payload = this.parser.parseLNReaderBackup(text)
    } else {
      onProgress?.('migrate', 50)
      const raw: Record<string, unknown> = JSON.parse(text)
      const migrated = this.migrator.ensureV2(raw)
      payload = this.serializer.deserialize(Buffer.from(JSON.stringify(migrated)))
    }

    onProgress?.('import', 70)

    // Build a synthetic zip from the parsed payload for the existing import pipeline
    const zip = new JSZip()
    zip.file('metadata.json', JSON.stringify({
      version: 2,
      schemaVersion: payload.schemaVersion,
      exportedAt: payload.exportedAt,
      createdAt: new Date().toISOString(),
      appName: 'IReader-Next',
      sections: options.sections ?? ['library', 'categories', 'history', 'settings', 'downloads', 'glossary'],
    }))
    const tables = zip.folder('db-tables')!
    tables.file('library.json', JSON.stringify(payload.library))
    tables.file('categories.json', JSON.stringify(payload.categories))
    tables.file('history.json', JSON.stringify(payload.history))
    tables.file('settings.json', JSON.stringify(payload.settings))
    tables.file('downloads.json', JSON.stringify(payload.downloads))
    tables.file('glossary.json', JSON.stringify(payload.glossary))
    tables.file('plugins.json', JSON.stringify(payload.plugins))

    const zipData = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' })
    onProgress?.('import', 85)

    const result = await this.backupService.importBackup(
      zipData,
      options.strategy ?? 'merge',
      options.sections,
    )

    onProgress?.('import', 100)
    return result
  }
}
