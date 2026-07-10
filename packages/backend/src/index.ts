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
import { BackupService } from './backup/backup-service.js'
import { AutoBackupScheduler } from './backup/auto-backup-scheduler.js'
import { proxyApp } from './api/proxy.js'
import { NodeVmSandbox } from '@ireader/plugin-system'
import { PluginService } from './plugins/plugin-service.js'
import { MockPluginService } from './plugins/mock-plugin-service.js'
import { createDatabase, runMigrations, migration_001, migration_002, migration_003 } from '@ireader/storage'
import { SqliteLibraryRepository, SqliteHistoryRepository, SqliteSettingsRepository, SqliteDownloadRepository, SqliteGlossaryRepository } from '@ireader/storage'

const app = new Hono()
app.use('/api/*', cors({ origin: ['http://localhost:5173', 'http://localhost:8080'] }))

const pluginsDir = path.resolve(process.cwd(), 'plugins')

export async function startApp(): Promise<Hono> {
  // Initialize database
  const db = await createDatabase(':memory:')
  await runMigrations(db, [migration_001, migration_002, migration_003])

  // Create repositories
  const libraryRepo = new SqliteLibraryRepository(db)
  const historyRepo = new SqliteHistoryRepository(db)
  const settingsRepo = new SqliteSettingsRepository(db)
  const downloadRepo = new SqliteDownloadRepository(db)
  const glossaryRepo = new SqliteGlossaryRepository(db)

  // Backup service
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

  // Create source plugin routes
  let sourcesRouter
  let pluginService: PluginService | null = null
  try {
    pluginService = new PluginService(pluginsDir, new NodeVmSandbox())
    await pluginService.start()
    console.log(`Plugin service active, watching ${pluginsDir}`)
    // If no plugins were found on disk, fall back to mock for demo/dev support
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

  // Mount all routes
  app.route('/api/v1/sources', sourcesRouter)
  app.route('/api/v1', healthApp)
  app.route('/api/v1/library', createLibraryRouter(libraryRepo))
  app.route('/api/v1/history', createHistoryRouter(historyRepo))
  app.route('/api/v1/settings', createSettingsRouter(settingsRepo))
  app.route('/api/v1/downloads', createDownloadsRouter(downloadRepo))
  app.route('/api/v1/glossary', createGlossaryRouter(glossaryRepo))
  app.route('/api/v1/backup', createBackupRouter(backupService))

  // Auto-backup scheduler
  const autoBackupScheduler = new AutoBackupScheduler(backupService)
  app.route('/api/v1/auto-backup', createAutoBackupRouter(autoBackupScheduler))

  // Reader themes
  const settingsRepoForThemes = settingsRepo
  app.route('/api/v1/reader/themes', createReaderThemesRouter(settingsRepoForThemes))

  // Custom fonts
  app.route('/api/v1/fonts', createFontsRouter(settingsRepo))

  // Reports
  app.route('/api/v1/reports', createReportRouter())

  // Bookmarks
  app.route('/api/v1/bookmarks', createBookmarkRouter())

  // Reading Stats
  app.route('/api/v1/reading-stats', createReadingStatsRouter())

  // Streaks
  app.route('/api/v1/streaks', createStreaksRouter())

  // Goals
  app.route('/api/v1/goals', createReadingGoalsRouter())

  // Plugin list endpoint — returns mock data when no real plugins loaded
  app.get('/api/v1/plugins', (c) => {
    if (pluginService && pluginService.getAllPlugins().length > 0) return c.json(pluginService.getAllPlugins())
    // Fall back to mock data for dev/demo
    return c.json([
      { id: 'demo', name: 'Demo Source', lang: 'en', baseUrl: 'https://demo.local', version: '1.0.0', capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'] },
      { id: 'manganato', name: 'Manganato', lang: 'en', baseUrl: 'https://manganato.com', version: '1.0.0', capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'] },
      { id: 'mangadex', name: 'MangaDex', lang: 'en', baseUrl: 'https://mangadex.org', version: '1.0.0', capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'] },
    ])
  })

  // Plugin marketplace
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
