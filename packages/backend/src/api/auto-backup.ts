import { Hono } from 'hono'
import type { AutoBackupScheduler } from '../backup/auto-backup-scheduler.js'

export function createAutoBackupRouter(scheduler: AutoBackupScheduler): Hono {
  const app = new Hono()

  // Get auto-backup status and config
  app.get('/', (c) => {
    return c.json({
      ...scheduler.getConfig(),
      isRunning: scheduler.isRunning(),
    })
  })

  // Update auto-backup config
  app.put('/config', async (c) => {
    try {
      const body = await c.req.json()
      const config = scheduler.updateConfig(body)
      return c.json({ ...config, isRunning: scheduler.isRunning() })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update config'
      return c.json({ error: msg, code: 'BACKUP_CONFIG_ERROR', status: 500 }, 500)
    }
  })

  // Run backup now (manual trigger)
  app.post('/run', async (c) => {
    try {
      const result = await scheduler.runBackupNow()
      return c.json({ success: true, ...result })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Backup failed'
      return c.json({ error: msg, code: 'BACKUP_ERROR', status: 500 }, 500)
    }
  })

  return app
}
