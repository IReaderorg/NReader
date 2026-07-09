import { Hono } from 'hono'
import type { BackupService } from '../backup/backup-service.js'

export function createBackupRouter(backupService: BackupService): Hono {
  const app = new Hono()

  // Export backup
  app.post('/export', async (c) => {
    try {
      const body = await c.req.json().catch(() => ({})) as { includeCovers?: boolean }
      const includeCovers = body.includeCovers ?? false
      const zipData = await backupService.exportBackup(includeCovers)

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
      const body = await c.req.json<{ zipBase64: string; strategy?: 'merge' | 'replace' }>()
      if (!body.zipBase64) {
        return c.json({ error: 'zipBase64 is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }

      const zipBuffer = Buffer.from(body.zipBase64, 'base64')
      const result = await backupService.importBackup(new Uint8Array(zipBuffer), body.strategy ?? 'merge')
      return c.json(result)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Import failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  return app
}
