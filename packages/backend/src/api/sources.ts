import { Hono } from 'hono'
import fs from 'node:fs'
import path from 'node:path'

export function createSourcesRouter(pluginService: {
  getAllPlugins(): any[]
  getPlugin(id: string): any
  executePluginMethod(id: string, method: string, args: unknown[]): Promise<any>
  isIReaderPlugin?(id: string): boolean
}): Hono {
  const app = new Hono()

  app.get('/', (c) => {
    return c.json(pluginService.getAllPlugins())
  })

  app.get('/:id', (c) => {
    const { id } = c.req.param()
    const plugin = pluginService.getPlugin(id)
    if (!plugin) return c.json({ error: 'Source not found', code: 'NOT_FOUND', status: 404 }, 404)
    return c.json(plugin)
  })

  app.get('/:id/popular', async (c) => {
    const { id } = c.req.param()
    const page = Number(c.req.query('page')) || 1
    try {
      return c.json(await pluginService.executePluginMethod(id, 'popular', [page]))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  app.get('/:id/search', async (c) => {
    const { id } = c.req.param()
    const query = c.req.query('q')
    const page = Number(c.req.query('page')) || 1
    if (!query) return c.json({ error: 'Query parameter q is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    try {
      return c.json(await pluginService.executePluginMethod(id, 'search', [query, page]))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  app.get('/:id/latest', async (c) => {
    const { id } = c.req.param()
    const page = Number(c.req.query('page')) || 1
    try {
      return c.json(await pluginService.executePluginMethod(id, 'latest', [page]))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  app.get('/:id/detail/:mangaId', async (c) => {
    const { id, mangaId } = c.req.param()
    try {
      return c.json(await pluginService.executePluginMethod(id, 'mangaDetail', [mangaId]))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  app.get('/:id/chapters/:mangaId', async (c) => {
    const { id, mangaId } = c.req.param()
    try {
      return c.json(await pluginService.executePluginMethod(id, 'chapters', [mangaId]))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  app.get('/:id/pages/:chapterId', async (c) => {
    const { id, chapterId } = c.req.param()
    try {
      return c.json(await pluginService.executePluginMethod(id, 'pages', [chapterId]))
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  /**
   * Get text content for a chapter (for novel-type sources).
   * Returns a JSON array of text strings.
   */
  app.get('/:id/text/:chapterId', async (c) => {
    const { id, chapterId } = c.req.param()
    try {
      // IReader sources route to getText; native plugins fall back to pages filter
      const isIReader = pluginService.isIReaderPlugin?.(id) ?? false
      if (isIReader) {
        const text = await pluginService.executePluginMethod(id, 'getText', [chapterId])
        return c.json(text)
      }
      // Native plugins: get pages and filter for text-based ones
      const pages = await pluginService.executePluginMethod(id, 'pages', [chapterId]) as any[]
      const textPages = pages.filter((p: any) => !p.url || p.url === '')
      if (textPages.length > 0) {
        return c.json(textPages.map((p: any) => p.text || ''))
      }
      return c.json([])
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  // --- Source Repository Support ---

  /**
   * Get categories/genres for a source.
   */
  app.get('/:id/categories', async (c) => {
    const { id } = c.req.param()
    try {
      const categories = await pluginService.executePluginMethod(id, 'categories', [])
      return c.json(categories)
    } catch {
      // Fallback: return empty list if plugin doesn't support categories
      return c.json([])
    }
  })

  /**
   * Browse manga by category/genre for a source.
   */
  app.get('/:id/browse/:category', async (c) => {
    const { id, category } = c.req.param()
    const page = Number(c.req.query('page')) || 1
    try {
      const results = await pluginService.executePluginMethod(id, 'browse', [category, page])
      return c.json(results)
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PLUGIN_ERROR', status: 502 }, 502)
    }
  })

  /**
   * Install a source from a URL. Downloads the JS file and saves to plugins directory.
   */
  app.post('/install', async (c) => {
    const { url, id } = await c.req.json<{ url: string; id?: string }>()
    if (!url) return c.json({ error: 'url is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Failed to fetch source: ${res.statusText}`)
      const code = await res.text()

      const pluginId = id || url.split('/').pop()?.replace(/\.js$/i, '') || 'installed-source'
      const pluginsDir = process.env.PLUGINS_DIR || path.resolve(process.cwd(), 'plugins')
      if (!fs.existsSync(pluginsDir)) fs.mkdirSync(pluginsDir, { recursive: true })
      const dest = path.join(pluginsDir, `${pluginId}.js`)
      fs.writeFileSync(dest, code, 'utf-8')

      return c.json({ success: true, pluginId, path: dest })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'INSTALL_ERROR', status: 502 }, 502)
    }
  })

  /**
   * List available sources from a repository URL.
   * The repo should return a JSON array of source descriptors.
   */
  app.get('/repository', async (c) => {
    const repoUrl = c.req.query('url')
    if (!repoUrl) return c.json({ error: 'url query param is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    try {
      const res = await fetch(repoUrl)
      if (!res.ok) throw new Error(`Failed to fetch repo: ${res.statusText}`)
      const sources = await res.json()
      return c.json(sources)
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'REPO_ERROR', status: 502 }, 502)
    }
  })

  // --- Source Migration ---

  /**
   * Get a list of sources that can serve as migration targets for a manga.
   * Uses the manga title to search across all sources.
   */
  app.get('/migration/targets', async (c) => {
    const query = c.req.query('q')
    const excludeSourceId = c.req.query('exclude')
    if (!query) return c.json({ error: 'q query param is required', code: 'VALIDATION_ERROR', status: 400 }, 400)

    const results: Array<{ sourceId: string; sourceName: string; mangaId: string; title: string; coverUrl: string; matchScore: number }> = []
    const sources = pluginService.getAllPlugins()

    for (const src of sources) {
      if (src.id === excludeSourceId) continue
      try {
        const searchResults = await pluginService.executePluginMethod(src.id, 'search', [query, 1]) as any[]
        if (Array.isArray(searchResults)) {
          searchResults.forEach((m: any) => {
            // Simple title similarity check
            const score = titleSimilarity(query, m.title || '')
            if (score > 0.3) {
              results.push({
                sourceId: src.id,
                sourceName: src.name,
                mangaId: m.id,
                title: m.title,
                coverUrl: m.coverUrl || '',
                matchScore: Math.round(score * 100) / 100,
              })
            }
          })
        }
      } catch { /* skip sources that error */ }
    }

    // Sort by match score descending
    results.sort((a, b) => b.matchScore - a.matchScore)
    return c.json(results.slice(0, 50))
  })

  /**
   * Migrate a manga from one source to another.
   * Takes the source manga detail and chapter list and maps chapter URLs.
   */
  app.post('/migration/migrate', async (c) => {
    const { sourceId, mangaId, targetSourceId, targetMangaId } = await c.req.json<{
      sourceId: string
      mangaId: string
      targetSourceId: string
      targetMangaId: string
    }>()
    if (!sourceId || !mangaId || !targetSourceId || !targetMangaId) {
      return c.json({ error: 'sourceId, mangaId, targetSourceId, targetMangaId required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    try {
      // Get source chapters
      const sourceChapters = await pluginService.executePluginMethod<any[]>(sourceId, 'chapters', [mangaId])
      // Get target chapters
      const targetChapters = await pluginService.executePluginMethod(targetSourceId, 'chapters', [targetMangaId]) as any[]

      // Match chapters by number
      const chapterMap = new Map<string, string>()
      for (const sc of sourceChapters) {
        // Find closest match in target
        const match = targetChapters.find((tc: any) => {
          if (tc.number === sc.number) return true
          // Fuzzy number match
          if (Math.abs(tc.number - sc.number) < 0.1) return true
          return false
        })
        if (match) {
          chapterMap.set(sc.id, match.id)
        }
      }

      return c.json({
        success: true,
        sourceId,
        mangaId,
        targetSourceId,
        targetMangaId,
        totalChapters: sourceChapters.length,
        matchedChapters: chapterMap.size,
        chapterMap: Object.fromEntries(chapterMap),
      })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err), code: 'MIGRATION_ERROR', status: 502 }, 502)
    }
  })

  return app
}

/**
 * Simple title similarity: checks for shared words and substring containment.
 */
function titleSimilarity(a: string, b: string): number {
  const aLower = a.toLowerCase().trim()
  const bLower = b.toLowerCase().trim()
  if (aLower === bLower) return 1.0
  if (aLower.includes(bLower) || bLower.includes(aLower)) return 0.8

  const wordsA = aLower.split(/\s+/).filter(Boolean)
  const wordsB = bLower.split(/\s+/).filter(Boolean)
  if (wordsA.length === 0 || wordsB.length === 0) return 0

  const common = wordsA.filter(w => wordsB.includes(w)).length
  return common / Math.max(wordsA.length, wordsB.length)
}
