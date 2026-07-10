import { Hono } from 'hono'
import type { BackupService, BackupSection } from '../backup/backup-service.js'
import { existsSync, readdirSync, unlinkSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export function createBackupRouter(
  backupService: BackupService,
  backupDir: string
): Hono {
  const app = new Hono()

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
