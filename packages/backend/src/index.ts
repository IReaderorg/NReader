import { Hono } from 'hono'
import { cors } from 'hono/cors'
import path from 'node:path'
import { healthApp } from './api/health.js'
import { createSourcesRouter } from './api/sources.js'
import { proxyApp } from './api/proxy.js'
import { NodeVmSandbox } from '@ireader/plugin-system'
import { PluginService } from './plugins/plugin-service.js'
import { MockPluginService } from './plugins/mock-plugin-service.js'

const app = new Hono()
app.use('/api/*', cors({ origin: ['http://localhost:5173', 'http://localhost:8080'] }))

const pluginsDir = path.resolve(process.cwd(), '../../plugins')

export async function startApp(): Promise<Hono> {
  let sourcesRouter
  try {
    const pluginService = new PluginService(pluginsDir, new NodeVmSandbox())
    await pluginService.start()
    console.log(`Plugin service active, watching ${pluginsDir}`)
    sourcesRouter = createSourcesRouter(pluginService)
  } catch (err) {
    console.warn('Plugin service unavailable, using mock:', err instanceof Error ? err.message : err)
    const mock = new MockPluginService()
    sourcesRouter = createSourcesRouter(mock as any)
  }

  app.route('/api/v1/sources', sourcesRouter)
  app.route('/api/v1', healthApp)
  app.route('/proxy', proxyApp)
  return app
}
