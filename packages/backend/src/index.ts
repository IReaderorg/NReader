import { Hono } from 'hono'
import { createAuthRouter } from './api/auth.js'
import { createCommunityRouter } from './api/community.js'
import { createLeaderboardRouter } from './api/leaderboard.js'
import { createQuotesRouter } from './api/quotes.js'
import { createChapterReviewsRouter } from './api/chapter-reviews.js'
import { createChapterArtRouter } from './api/chapter-art.js'
import { cors } from 'hono/cors'
import path from 'node:path'
import { errorHandler } from './middleware/error-handler.js'
import { healthApp } from './api/health.js'
import { createSourcesRouter } from './api/sources.js'
import { createLibraryRouter } from './api/library.js'
import { createHistoryRouter } from './api/history.js'
import { createSettingsRouter } from './api/settings.js'
import { createDownloadsRouter } from './api/downloads.js'
import { createGlossaryRouter } from './api/glossary.js'
import { createBackupRouter } from './api/backup.js'
import { createCloudBackupRouter } from './api/cloud-backup.js'
import { createAutoBackupRouter } from './api/auto-backup.js'
import { createReaderThemesRouter } from './api/reader-themes.js'
import { createCharacterArtRouter } from './api/character-art.js'
import { createFontsRouter } from './api/fonts.js'
import { createReportRouter } from './api/report.js'
import { createBookmarkRouter } from './api/bookmarks.js'
import { createReadingStatsRouter } from './api/reading-stats.js'
import { createStreaksRouter } from './api/streaks.js'
import { createReadingGoalsRouter } from './api/reading-goals.js'
import { createReaderPresetsRouter } from './api/reader-presets.js'
import { createExploreRouter } from './api/explore.js'
import { createStatsRouter } from './api/stats.js'
import { BackupService } from './backup/backup-service.js'
import { BackupOrchestrator } from './backup/backup-orchestrator.js'
import { AutoBackupScheduler } from './backup/auto-backup-scheduler.js'
import { proxyApp } from './api/proxy.js'
import { NodeVmSandbox } from '@ireader/plugin-system'
import { PluginService } from './plugins/plugin-service.js'
import { createDatabase, runMigrations, migration_001, migration_002, migration_003 } from '@ireader/storage'
import { migration_004, migration_005, migration_006, migration_007 } from '@ireader/storage'
import { SqliteLibraryRepository, SqliteHistoryRepository, SqliteSettingsRepository, SqliteDownloadRepository, SqliteGlossaryRepository } from '@ireader/storage'
import type { DatabaseDriver, SQLiteDriver } from '@ireader/storage'

const app = new Hono()
app.use('/api/*', cors({ origin: ['http://localhost:5173', 'http://localhost:8080'] }))
app.onError(errorHandler)

const pluginsDir = path.resolve(process.cwd(), 'plugins')

let _db: (DatabaseDriver & SQLiteDriver) | null = null

export function getDb(): (DatabaseDriver & SQLiteDriver) | null {
  return _db
}

export async function shutdownApp(): Promise<void> {
  if (_db) {
    await _db.close()
    _db = null
  }
}

export async function startApp(dbType?: 'memory' | 'node' | 'capacitor'): Promise<Hono> {
  const db = await createDatabase(dbType)
  _db = db
  await runMigrations(db, [migration_001, migration_002, migration_003, migration_004, migration_005, migration_006, migration_007])

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
    sourcesRouter = createSourcesRouter(pluginService)
  } catch (err) {
    console.warn('Plugin service unavailable:', err instanceof Error ? err.message : err)
    // Use a minimal router that returns empty
    sourcesRouter = createSourcesRouter({
      getAllPlugins: () => [],
      getPlugin: () => undefined,
      executePluginMethod: async () => { throw new Error('Plugin service unavailable') },
      isIReaderPlugin: () => false,
    })
  }

  app.route('/api/v1/sources', sourcesRouter)
  app.route('/api/v1/explore', createExploreRouter(pluginService ?? { getAllPlugins: () => [], getPlugin: () => undefined, executePluginMethod: async () => { throw new Error('Plugin service unavailable') }, isIReaderPlugin: () => false } as any))
  app.route('/api/v1', healthApp)
  app.route('/api/v1/library', createLibraryRouter(libraryRepo))
  app.route('/api/v1/history', createHistoryRouter(historyRepo))
  app.route('/api/v1/settings', createSettingsRouter(settingsRepo))
  app.route('/api/v1/downloads', createDownloadsRouter(downloadRepo))
  app.route('/api/v1/glossary', createGlossaryRouter(glossaryRepo))

  const backupDir = path.resolve(process.cwd(), 'backups')
  const backupOrchestrator = new BackupOrchestrator(backupService, async () => ({
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
  app.route('/api/v1/backup', createBackupRouter(backupService, backupDir, backupOrchestrator))
  app.route('/api/v1/backup/cloud', createCloudBackupRouter(settingsRepo))
  const autoBackupScheduler = new AutoBackupScheduler(backupService)
  app.route('/api/v1/auto-backup', createAutoBackupRouter(autoBackupScheduler))
  app.route('/api/v1/reader/themes', createReaderThemesRouter(settingsRepo))
  app.route('/api/v1/fonts', createFontsRouter(settingsRepo))
  app.route('/api/v1/reports', createReportRouter(settingsRepo))
  app.route('/api/v1/bookmarks', createBookmarkRouter(settingsRepo))
  app.route('/api/v1/reading-stats', createReadingStatsRouter(settingsRepo))
  app.route('/api/v1/streaks', createStreaksRouter(settingsRepo))
  app.route('/api/v1/goals', createReadingGoalsRouter(settingsRepo))
  app.route('/api/v1/reader/presets', createReaderPresetsRouter(settingsRepo))
  app.route('/api/v1/character-art', createCharacterArtRouter(settingsRepo))

  // Plugins list from plugin service
  app.get('/api/v1/plugins', (c) => {
    if (pluginService) return c.json(pluginService.getAllPlugins())
    return c.json([])
  })

  app.get('/api/v1/plugins/marketplace', (c) => {
    return c.json([
      { id: 'demo-source', name: 'Demo Source', type: 'source', version: '1.0.0', description: 'Built-in demo source', author: 'IReader' },
      { id: 'jsonplaceholder', name: 'JSONPlaceholder', type: 'source', version: '1.0.0', description: 'Test source using JSONPlaceholder API', author: 'IReader' },
    ])
  })

  // Social routes
  app.route('/api/v1/auth', createAuthRouter(db))
  app.route('/api/v1/community', createCommunityRouter(db))
  app.route('/api/v1/leaderboard', createLeaderboardRouter(db))
  app.route('/api/v1/quotes', createQuotesRouter(db))

  // Chapter reviews & art
  app.route('/api/v1/chapter/reviews', createChapterReviewsRouter(db))
  app.route('/api/v1/chapter/art', createChapterArtRouter(db))

  app.route('/api/v1/proxy', proxyApp)
  app.route('/api/v1', createStatsRouter(libraryRepo, downloadRepo))

  return app
}
