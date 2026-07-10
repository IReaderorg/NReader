import { Hono } from 'hono'
import type { BackupService, BackupSection } from '../backup/backup-service.js'
import { BackupOrchestrator } from '../backup/backup-orchestrator.js'
import { LNReaderParser } from '../backup/lnreader-parser.js'
import { backupEncryption } from '../backup/encryption.js'
import { existsSync, readdirSync, unlinkSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export function createBackupRouter(
  backupService: BackupService,
  backupDir: string,
  orchestrator?: BackupOrchestrator,
): Hono {
  const app = new Hono()
  const lnParser = new LNReaderParser()

  // ---- Standard IReader backup endpoints ----

  // Export backup
  app.post('/export', async (c) => {
    try {
      const body = await c.req.json().catch(() => ({})) as {
        includeCovers?: boolean
        sections?: BackupSection[]
      }
      const includeCovers = body.includeCovers ?? false
      const sections = body.sections
      const zipData = await backupService.exportBackup(includeCovers, sections)

      c.header('Content-Type', 'application/zip')
      c.header('Content-Disposition', `attachment; filename="ireader-backup-${Date.now()}.zip"`)
      return c.body(zipData as any)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Export failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // Import backup
  app.post('/import', async (c) => {
    try {
      const body = await c.req.json<{
        zipBase64: string
        strategy?: 'merge' | 'replace'
        sections?: BackupSection[]
      }>()
      if (!body.zipBase64) {
        return c.json({ error: 'zipBase64 is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }

      const zipBuffer = Buffer.from(body.zipBase64, 'base64')
      const result = await backupService.importBackup(
        new Uint8Array(zipBuffer),
        body.strategy ?? 'merge',
        body.sections
      )
      return c.json(result)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Import failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // ---- LNReader import/export ----

  // Import LNReader JSON backup
  app.post('/lnreader/import', async (c) => {
    try {
      const body = await c.req.json<{
        json: string
        strategy?: 'merge' | 'replace'
      }>()
      if (!body.json) {
        return c.json({ error: 'json is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }
      const payload = lnParser.parseLNReaderBackup(body.json)

      // Use orchestrator if available, otherwise return parsed data for client-side import
      if (orchestrator) {
        // Build a synthetic zip from the payload
        const JSZip = (await import('jszip')).default
        const zip = new JSZip()
        zip.file('metadata.json', JSON.stringify({
          version: 2, schemaVersion: payload.schemaVersion, exportedAt: payload.exportedAt,
          createdAt: new Date().toISOString(), appName: 'IReader-Next',
          sections: ['library', 'categories', 'history', 'settings', 'downloads', 'glossary'],
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
        const result = await backupService.importBackup(zipData, body.strategy ?? 'merge')
        return c.json(result)
      }

      // Fallback: just return parsed payload
      return c.json({ message: 'LNReader backup parsed', entryCount: payload.library.length })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'LNReader import failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // Export as LNReader JSON
  app.post('/lnreader/export', async (c) => {
    try {
      // Get current data by calling backupService's getData callback
      // The backupService stores it internally; we use orchestrator if available
      if (orchestrator) {
        const buf = await orchestrator.orchestrateExport(
          ['library', 'categories', 'history'],
          { format: 'lnreader' },
        )
        c.header('Content-Type', 'application/json')
        c.header('Content-Disposition', `attachment; filename="lnreader-backup-${Date.now()}.json"`)
        return c.body(buf as any)
      }
      return c.json({ error: 'Orchestrator not available', code: 'BACKUP_ERROR', status: 500 }, 500)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'LNReader export failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // ---- Encryption endpoints ----

  // Encrypt a backup file
  app.post('/encrypt', async (c) => {
    try {
      const body = await c.req.json<{
        dataBase64: string
        password: string
      }>()
      if (!body.dataBase64 || !body.password) {
        return c.json({ error: 'dataBase64 and password are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }
      const buf = Buffer.from(body.dataBase64, 'base64')
      const encrypted = backupEncryption.encrypt(buf, body.password)
      return c.json({ encryptedBase64: encrypted.toString('base64') })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Encryption failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // Decrypt a backup file
  app.post('/decrypt', async (c) => {
    try {
      const body = await c.req.json<{
        dataBase64: string
        password: string
      }>()
      if (!body.dataBase64 || !body.password) {
        return c.json({ error: 'dataBase64 and password are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }
      const buf = Buffer.from(body.dataBase64, 'base64')
      const decrypted = backupEncryption.decrypt(buf, body.password)
      return c.json({ decryptedBase64: decrypted.toString('base64') })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Decryption failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // ---- Saved backups CRUD ----

  // List saved backups
  app.get('/', (c) => {
    try {
      if (!existsSync(backupDir)) return c.json([])

      const files = readdirSync(backupDir)
        .filter((f: string) => f.startsWith('ireader-backup-') && f.endsWith('.zip'))
        .map((f: string) => {
          const filePath = join(backupDir, f)
          const stats = statSync(filePath)
          return {
            id: f,
            filename: f,
            size: stats.size,
            createdAt: stats.birthtime.toISOString(),
            modifiedAt: stats.mtime.toISOString(),
          }
        })
        .sort((a: { createdAt: string }, b: { createdAt: string }) => b.createdAt.localeCompare(a.createdAt))

      return c.json(files)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to list backups'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // Download a backup file
  app.get('/:id/download', (c) => {
    try {
      const { id } = c.req.param()
      if (id.includes('..') || id.includes('/')) {
        return c.json({ error: 'Invalid backup id', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }
      const filePath = join(backupDir, id)
      if (!existsSync(filePath)) {
        return c.json({ error: 'Backup not found', code: 'NOT_FOUND', status: 404 }, 404)
      }
      const data = readFileSync(filePath)
      c.header('Content-Type', 'application/zip')
      c.header('Content-Disposition', `attachment; filename="${id}"`)
      return c.body(data as any)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Download failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  // Delete a backup file
  app.delete('/:id', (c) => {
    try {
      const { id } = c.req.param()
      if (id.includes('..') || id.includes('/')) {
        return c.json({ error: 'Invalid backup id', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }
      const filePath = join(backupDir, id)
      if (!existsSync(filePath)) {
        return c.json({ error: 'Backup not found', code: 'NOT_FOUND', status: 404 }, 404)
      }
      unlinkSync(filePath)
      return c.json({ success: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Delete failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  return app
}
