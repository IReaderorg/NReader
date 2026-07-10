import { Hono } from 'hono'
import { cors } from 'hono/cors'
import path from 'node:path'
import { healthApp } from './api/health.js'
import { createSourcesRouter } from './api/sources.js'
import { createLibraryRouter } from './api/library.js'
import { createHistoryRouter } from './api/history.js'
import { createSettingsRouter } from './api/settings.js'
import { createDownloadsRouter } from './api/downloads.js'
import { createGlossaryRouter } from './api/glossary.js'
import { createBackupRouter } from './api/backup.js'
import { createAutoBackupRouter } from './api/auto-backup.js'
import { createReaderThemesRouter } from './api/reader-themes.js'
import { createFontsRouter } from './api/fonts.js'
import { createReportRouter } from './api/report.js'
import { createBookmarkRouter } from './api/bookmarks.js'
import { createReadingStatsRouter } from './api/reading-stats.js'
import { createStreaksRouter } from './api/streaks.js'
import { createReadingGoalsRouter } from './api/reading-goals.js'
import { createReaderPresetsRouter } from './api/reader-presets.js'
import { BackupService } from './backup/backup-service.js'
import { AutoBackupScheduler } from './backup/auto-backup-scheduler.js'
import { proxyApp } from './api/proxy.js'
import { NodeVmSandbox } from '@ireader/plugin-system'
import { PluginService } from './plugins/plugin-service.js'
import { MockPluginService } from './plugins/mock-plugin-service.js'
import { createDatabase, runMigrations, migration_001, migration_002, migration_003 } from '@ireader/storage'
import { migration_004 } from '@ireader/storage'
import { SqliteLibraryRepository, SqliteHistoryRepository, SqliteSettingsRepository, SqliteDownloadRepository, SqliteGlossaryRepository } from '@ireader/storage'

const app = new Hono()
app.use('/api/*', cors({ origin: ['http://localhost:5173', 'http://localhost:8080'] }))

const pluginsDir = path.resolve(process.cwd(), 'plugins')

export async function startApp(): Promise<Hono> {
  const db = await createDatabase(':memory:')
  await runMigrations(db, [migration_001, migration_002, migration_003, migration_004])

  const libraryRepo = new SqliteLibraryRepository(db)
  const historyRepo = new SqliteHistoryRepository(db)
  const settingsRepo = new SqliteSettingsRepository(db)
  const downloadRepo = new SqliteDownloadRepository(db)
  const glossaryRepo = new SqliteGlossaryRepository(db)

  const backupService = new BackupService(db, async () => ({
    version: '0.1.0',
    schemaVersion: 3,
    exportedAt: new Date().toISOString(),
    library: await libraryRepo.getAll(),
    categories: await libraryRepo.getCategories(),
    history: await historyRepo.getAll(),
    settings: await settingsRepo.getAll(),
    downloads: await downloadRepo.getAll(),
    glossary: await glossaryRepo.getAll(),
    plugins: [],
  }))

  let sourcesRouter
  let pluginService: PluginService | null = null
  try {
    pluginService = new PluginService(pluginsDir, new NodeVmSandbox())
    await pluginService.start()
    console.log(`Plugin service active, watching ${pluginsDir}`)
    if (pluginService.getAllPlugins().length === 0) {
      console.log('No plugins found on disk, falling back to mock plugin service')
      const mock = new MockPluginService()
      sourcesRouter = createSourcesRouter(mock as any)
    } else {
      sourcesRouter = createSourcesRouter(pluginService)
    }
  } catch (err) {
    console.warn('Plugin service unavailable, using mock:', err instanceof Error ? err.message : err)
    const mock = new MockPluginService()
    sourcesRouter = createSourcesRouter(mock as any)
  }

  app.route('/api/v1/sources', sourcesRouter)
  app.route('/api/v1', healthApp)
  app.route('/api/v1/library', createLibraryRouter(libraryRepo))
  app.route('/api/v1/history', createHistoryRouter(historyRepo))
  app.route('/api/v1/settings', createSettingsRouter(settingsRepo))
  app.route('/api/v1/downloads', createDownloadsRouter(downloadRepo))
  app.route('/api/v1/glossary', createGlossaryRouter(glossaryRepo))

  const backupDir = path.resolve(process.cwd(), 'backups')
  app.route('/api/v1/backup', createBackupRouter(backupService, backupDir))
  const autoBackupScheduler = new AutoBackupScheduler(backupService)
  app.route('/api/v1/auto-backup', createAutoBackupRouter(autoBackupScheduler))
  app.route('/api/v1/reader/themes', createReaderThemesRouter(settingsRepo))
  app.route('/api/v1/fonts', createFontsRouter(settingsRepo))
  app.route('/api/v1/reports', createReportRouter())
  app.route('/api/v1/bookmarks', createBookmarkRouter())
  app.route('/api/v1/reading-stats', createReadingStatsRouter())
  app.route('/api/v1/streaks', createStreaksRouter())
  app.route('/api/v1/goals', createReadingGoalsRouter())
  app.route('/api/v1/reader/presets', createReaderPresetsRouter(settingsRepo))

  app.get('/api/v1/plugins', (c) => {
    if (pluginService && pluginService.getAllPlugins().length > 0) return c.json(pluginService.getAllPlugins())
    return c.json([
      { id: 'demo', name: 'Demo Source', lang: 'en', baseUrl: 'https://demo.local', version: '1.0.0', capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'] },
      { id: 'manganato', name: 'Manganato', lang: 'en', baseUrl: 'https://manganato.com', version: '1.0.0', capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'] },
      { id: 'mangadex', name: 'MangaDex', lang: 'en', baseUrl: 'https://mangadex.org', version: '1.0.0', capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'] },
    ])
  })

  app.get('/api/v1/plugins/marketplace', (c) => {
    return c.json([
      { id: 'manganato', name: 'Manganato', description: 'Read manga from Manganato.com', type: 'source', version: '1.0.0', author: 'IReader', installUrl: '/plugins/manganato/source.js', downloads: 1520, rating: 4.5, updatedAt: '2026-06-15T10:00:00Z' },
      { id: 'mangadex', name: 'MangaDex', description: 'Read manga from MangaDex.org', type: 'source', version: '1.0.0', author: 'IReader', installUrl: '/plugins/mangadex/source.js', downloads: 2340, rating: 4.8, updatedAt: '2026-06-20T10:00:00Z' },
      { id: 'dark-theme', name: 'Deep Dark', description: 'AMOLED-optimized dark theme with custom colors', type: 'theme', version: '1.0.0', author: 'ThemeStudio', installUrl: '/themes/dark-theme/theme.js', downloads: 890, rating: 4.2, updatedAt: '2026-07-01T10:00:00Z' },
    ])
  })

  app.route('/proxy', proxyApp)

  return app
}
