import { Hono } from 'hono'
import { cors } from 'hono/cors'
import path from 'node:path'
import { healthApp } from './api/health.js'
import { createSourcesRouter } from './api/sources.js'
import { createLibraryRouter } from './api/library.js'
import { createHistoryRouter } from './api/history.js'
import { createSettingsRouter } from './api/settings.js'
import { createDownloadsRouter } from './api/downloads.js'
import { proxyApp } from './api/proxy.js'
import { NodeVmSandbox } from '@ireader/plugin-system'
import { PluginService } from './plugins/plugin-service.js'
import { MockPluginService } from './plugins/mock-plugin-service.js'
import { createDatabase, runMigrations, migration_001, migration_002 } from '@ireader/storage'
import { SqliteLibraryRepository, SqliteHistoryRepository, SqliteSettingsRepository, SqliteDownloadRepository } from '@ireader/storage'

const app = new Hono()
app.use('/api/*', cors({ origin: ['http://localhost:5173', 'http://localhost:8080'] }))

const pluginsDir = path.resolve(process.cwd(), '../../plugins')

export async function startApp(): Promise<Hono> {
  // Initialize database
  const db = await createDatabase(':memory:')
  await runMigrations(db, [migration_001, migration_002])

  // Create repositories
  const libraryRepo = new SqliteLibraryRepository(db)
  const historyRepo = new SqliteHistoryRepository(db)
  const settingsRepo = new SqliteSettingsRepository(db)
  const downloadRepo = new SqliteDownloadRepository(db)

  // Create source plugin routes
  let sourcesRouter
  let pluginService: PluginService | null = null
  try {
    pluginService = new PluginService(pluginsDir, new NodeVmSandbox())
    await pluginService.start()
    console.log(`Plugin service active, watching ${pluginsDir}`)
    sourcesRouter = createSourcesRouter(pluginService)
  } catch (err) {
    console.warn('Plugin service unavailable, using mock:', err instanceof Error ? err.message : err)
    const mock = new MockPluginService()
    sourcesRouter = createSourcesRouter(mock as any)
  }

  // Mount all routes
  app.route('/api/v1/sources', sourcesRouter)
  app.route('/api/v1', healthApp)
  app.route('/api/v1/library', createLibraryRouter(libraryRepo))
  app.route('/api/v1/history', createHistoryRouter(historyRepo))
  app.route('/api/v1/settings', createSettingsRouter(settingsRepo))
  app.route('/api/v1/downloads', createDownloadsRouter(downloadRepo))

  // Plugin management endpoint
  app.get('/api/v1/plugins', (c) => {
    if (pluginService) return c.json(pluginService.getAllPlugins())
    return c.json([])
  })

  app.route('/proxy', proxyApp)

  return app
}
