import { Hono } from 'hono'
import type { SqliteSettingsRepository } from '@ireader/storage'
import { GoogleDriveAuth } from '../backup/googledrive-auth.js'
import { GoogleDriveService } from '../backup/googledrive-service.js'

export function createCloudBackupRouter(
  settingsRepo: SqliteSettingsRepository,
): Hono {
  const app = new Hono()

  const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID ?? ''
  const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET ?? ''
  const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI ?? 'http://localhost:5173/backup/cloud'

  if (!clientId || !clientSecret) {
    console.warn('Google Drive OAuth not configured — cloud backup unavailable')
  }

  function getAuth(): GoogleDriveAuth {
    const auth = new GoogleDriveAuth(settingsRepo, clientId, clientSecret, redirectUri)
    return auth
  }

  function getService(): GoogleDriveService {
    return new GoogleDriveService(getAuth())
  }

  // GET /auth-url — return OAuth URL
  app.get('/auth-url', (c) => {
    if (!clientId) return c.json({ error: 'Google Drive not configured', code: 'CONFIG_ERROR', status: 503 }, 503)
    const url = getAuth().getAuthUrl()
    return c.json({ url })
  })

  // POST /callback — handle OAuth callback
  app.post('/callback', async (c) => {
    try {
      const { code } = await c.req.json<{ code: string }>()
      if (!code) return c.json({ error: 'Authorization code required' }, 400)
      const tokens = await getAuth().handleCallback(code)
      return c.json({ success: true, email: tokens.email })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'OAuth callback failed'
      return c.json({ error: msg, code: 'OAUTH_ERROR', status: 500 }, 500)
    }
  })

  // GET /status — check auth status
  app.get('/status', async (c) => {
    try {
      const status = await getAuth().getStatus()
      return c.json(status)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Status check failed'
      return c.json({ error: msg }, 500)
    }
  })

  // POST /upload — upload backup to Drive
  app.post('/upload', async (c) => {
    try {
      const body = await c.req.parseBody()
      const file = body['file'] as File | undefined
      if (!file) return c.json({ error: 'File required' }, 400)

      const buffer = new Uint8Array(await file.arrayBuffer())
      const result = await getService().upload(buffer, file.name)
      return c.json(result)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      return c.json({ error: msg, code: 'UPLOAD_ERROR', status: 500 }, 500)
    }
  })

  // GET /list — list Drive backups
  app.get('/list', async (c) => {
    try {
      const files = await getService().list()
      return c.json(files)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'List failed'
      return c.json({ error: msg, code: 'DRIVE_ERROR', status: 500 }, 500)
    }
  })

  // GET /download/:id — download from Drive
  app.get('/download/:id', async (c) => {
    try {
      const { id } = c.req.param()
      const data = await getService().download(id)
      return c.body(data as ArrayBuffer)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Download failed'
      return c.json({ error: msg, code: 'DRIVE_ERROR', status: 500 }, 500)
    }
  })

  // DELETE /:id — delete from Drive
  app.delete('/:id', async (c) => {
    try {
      const { id } = c.req.param()
      await getService().delete(id)
      return c.json({ success: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Delete failed'
      return c.json({ error: msg, code: 'DRIVE_ERROR', status: 500 }, 500)
    }
  })

  // POST /revoke — revoke access
  app.post('/revoke', async (c) => {
    try {
      await getAuth().revokeToken()
      return c.json({ success: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Revoke failed'
      return c.json({ error: msg, code: 'REVOKE_ERROR', status: 500 }, 500)
    }
  })

  return app
}
