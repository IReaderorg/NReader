import { PluginLoader } from '@ireader/plugin-system'
import type { SandboxAdapter, SandboxInstance } from '@ireader/plugin-system'
import type { IReaderPluginAdapter } from '@ireader/plugin-system'

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
  /** IReader source adapters loaded alongside native plugins */
  private ireaderAdapterMap = new Map<string, IReaderPluginAdapter>()

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
        this.ireaderAdapterMap.delete(pluginId)
      },
    })

    // Handle IReader source loading
    this.loader.setOnIReaderLoaded((pluginId: string, adapter: IReaderPluginAdapter) => {
      this.ireaderAdapterMap.set(pluginId, adapter)
      this.pluginInfoMap.set(pluginId, adapter.info)
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

  /**
   * Check if a plugin is an IReader source.
   */
  isIReaderPlugin(pluginId: string): boolean {
    return this.ireaderAdapterMap.has(pluginId)
  }

  /**
   * Execute a method on any plugin (native or IReader).
   * For IReader sources, routes through the adapter.
   */
  async executePluginMethod<T>(pluginId: string, method: string, args: unknown[]): Promise<T> {
    // Check if it's an IReader source adapter first
    const adapter = this.ireaderAdapterMap.get(pluginId)
    if (adapter) {
      // Route IReader adapter methods
      switch (method) {
        case 'popular':
          return adapter.popular(args[0] as number) as Promise<T>
        case 'search':
          return adapter.search(args[0] as string, args[1] as number) as Promise<T>
        case 'mangaDetail':
          return adapter.mangaDetail(args[0] as string) as Promise<T>
        case 'chapters':
          return adapter.chapters(args[0] as string) as Promise<T>
        case 'pages':
          return adapter.pages(args[0] as string) as Promise<T>
        case 'getText':
          return adapter.getText!(args[0] as string) as Promise<T>
        default:
          throw new Error(`Unknown IReader adapter method: ${method}`)
      }
    }

    // Fall back to sandbox execution for native plugins
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
