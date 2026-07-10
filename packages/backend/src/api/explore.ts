import { Hono } from 'hono'
import type { PluginService } from '../plugins/plugin-service.js'

const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural',
  'Thriller', 'Martial Arts', 'Mecha', 'Psychological', 'Historical', 'Harem',
  'School Life', 'Shounen', 'Shoujo', 'Seinen', 'Josei', 'Isekai',
]

export function createExploreRouter(pluginService: PluginService): Hono {
  const app = new Hono()

  app.get('/genres', (c) => {
    return c.json(GENRES)
  })

  app.get('/trending', async (c) => {
    try {
      const plugins = pluginService.getAllPlugins()
      const results: any[] = []
      for (const p of plugins.slice(0, 3)) {
        try {
          const manga = await pluginService.executePluginMethod(p.id, 'popular', [1])
          if (Array.isArray(manga)) results.push(...manga)
        } catch { /* skip */ }
      }
      return c.json(results.slice(0, 20))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.get('/updates', async (c) => {
    try {
      const plugins = pluginService.getAllPlugins()
      const results: any[] = []
      for (const p of plugins.slice(0, 3)) {
        try {
          const latest = await pluginService.executePluginMethod(p.id, 'latest', [1])
          if (Array.isArray(latest)) {
            for (const m of latest) {
              results.push({
                mangaId: m.id,
                title: m.title,
                coverUrl: m.coverUrl || '',
                sourceId: p.id,
                sourceName: p.name,
                chapterNumber: m.latestChapter ?? 0,
                chapterTitle: m.latestChapterTitle ?? '',
                updatedAt: m.lastUpdated || new Date().toISOString(),
              })
            }
          }
        } catch { /* skip */ }
      }
      results.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      return c.json(results.slice(0, 30))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  return app
}
