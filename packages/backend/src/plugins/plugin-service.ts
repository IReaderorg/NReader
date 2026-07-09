import { PluginLoader } from '@ireader/plugin-system'
import type { SandboxAdapter, SandboxInstance } from '@ireader/plugin-system'

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

    const loadedPluginIds: string[] = []

    this.loader = new PluginLoader({
      pluginsDir: this.pluginsDir,
      sandbox: this.instance,
      debounceMs: 300,
      onLoaded: async (pluginId: string) => {
        const info = await this.extractInfoFromSandbox(pluginId)
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

  private async extractInfoFromSandbox(pluginId: string): Promise<SourcePluginMeta | null> {
    try {
      const info = await this.instance!.execute(pluginId, 'info', []) as Record<string, unknown>
      if (!info || typeof info.id !== 'string') return null
      return {
        id: info.id as string,
        name: (info.name as string) || pluginId,
        lang: (info.lang as string) || 'en',
        baseUrl: (info.baseUrl as string) || `https://${pluginId}.com`,
        version: (info.version as string) || '1.0.0',
        capabilities: (Array.isArray(info.capabilities) ? info.capabilities : []) as string[],
      }
    } catch {
      // Fallback to the plugin's info property via code evaluation
      try {
        const rawInfo = await this.instance!.execute(pluginId, 'getInfo', []) as Record<string, unknown>
        if (rawInfo && typeof rawInfo.id === 'string') {
          return {
            id: rawInfo.id as string,
            name: (rawInfo.name as string) || pluginId,
            lang: (rawInfo.lang as string) || 'en',
            baseUrl: (rawInfo.baseUrl as string) || `https://${pluginId}.com`,
            version: (rawInfo.version as string) || '1.0.0',
            capabilities: (Array.isArray(rawInfo.capabilities) ? rawInfo.capabilities : []) as string[],
          }
        }
      } catch { /* fall through to defaults */ }

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
