import { PluginLoader } from '@ireader/plugin-system'
import type { SandboxAdapter, SandboxInstance } from '@ireader/plugin-system'
import fs from 'node:fs'
import path from 'node:path'

export interface SourcePluginMeta {
  id: string
  name: string
  lang: string
  baseUrl: string
  version: string
  capabilities: string[]
}

export class PluginService {
  private instance: SandboxInstance | null = null
  private loader: PluginLoader | null = null
  private pluginInfoMap = new Map<string, SourcePluginMeta>()

  constructor(
    private pluginsDir: string,
    private sandboxFactory: SandboxAdapter,
  ) {}

  async start(): Promise<void> {
    this.instance = await this.sandboxFactory.create({
      timeout: 30_000,
      allowedDomains: [],
      resolveDir: this.pluginsDir,
    })

    this.loader = new PluginLoader({
      pluginsDir: this.pluginsDir,
      sandbox: this.instance,
      debounceMs: 300,
      onLoaded: (pluginId: string) => {
        const info = this.extractPluginInfo(pluginId)
        if (info) this.pluginInfoMap.set(pluginId, info)
      },
      onUnloaded: (pluginId: string) => {
        this.pluginInfoMap.delete(pluginId)
      },
    })

    await this.loader.start()
  }

  async stop(): Promise<void> {
    this.loader?.stop()
    await this.instance?.destroy()
  }

  getAllPlugins(): SourcePluginMeta[] {
    return [...this.pluginInfoMap.values()]
  }

  getPlugin(id: string): SourcePluginMeta | undefined {
    return this.pluginInfoMap.get(id)
  }

  async executePluginMethod<T>(pluginId: string, method: string, args: unknown[]): Promise<T> {
    const inst = this.instance
    if (!inst) throw new Error('PluginService has not been started')
    try {
      const result = await inst.execute(pluginId, method, args)
      return result as T
    } catch (err) {
      throw new Error(
        `Plugin ${pluginId}.${method}() failed: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  private extractPluginInfo(pluginId: string): SourcePluginMeta {
    // Try to read source.json metadata from the plugin directory
    try {
      const manifestPath = path.join(this.pluginsDir, pluginId, 'source.json')
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
      return {
        id: manifest.id || pluginId,
        name: manifest.name || pluginId,
        lang: manifest.lang || 'en',
        baseUrl: manifest.baseUrl || `https://${pluginId}.com`,
        version: manifest.version || '1.0.0',
        capabilities: manifest.capabilities || ['popular', 'search', 'mangaDetail', 'chapters', 'pages'],
      }
    } catch {
      // Fallback: generate metadata from plugin ID
      return {
        id: pluginId,
        name: pluginId.charAt(0).toUpperCase() + pluginId.slice(1),
        lang: 'en',
        baseUrl: `https://${pluginId}.com`,
        version: '1.0.0',
        capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'],
      }
    }
  }
}
