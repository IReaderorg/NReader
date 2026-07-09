import { Hono } from 'hono'

export function createSourcesRouter(pluginService: { getAllPlugins(): any[]; getPlugin(id: string): any; executePluginMethod(id: string, method: string, args: unknown[]): Promise<any> }): Hono {
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

  return app
}
