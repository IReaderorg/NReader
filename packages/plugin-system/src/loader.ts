import fs from 'node:fs'
import path from 'node:path'
import type { SandboxInstance } from './sandbox/interface.js'
import { validatePlugin } from './validator.js'
import { isIReaderSource, createIReaderAdapter, createJsDependencies } from './ireader-bridge.js'
import { isTachiyomiSource, createTachiyomiAdapter } from './tachiyomi-bridge.js'
import { isLNReaderSource, createLNReaderAdapter } from './lnreader-bridge.js'
import { isJarFile, loadJarSource } from './jar-loader.js'
import type { IReaderPluginAdapter } from './ireader-bridge.js'

interface PluginWatcherOptions {
  pluginsDir: string
  sandbox: SandboxInstance
  debounceMs?: number
  onLoaded?: (pluginId: string) => void | Promise<void>
  onError?: (fileName: string, error: Error) => void
  onUnloaded?: (pluginId: string) => void | Promise<void>
}

export class PluginLoader {
  /** IReader adapters loaded by this loader instance */
  private ireaderAdapters = new Map<string, IReaderPluginAdapter>()
  private watcher: fs.FSWatcher | null = null
  private sandbox: SandboxInstance
  private pluginsDir: string
  private debounceMs: number
  private debounceTimers = new Map<string, ReturnType<typeof setTimeout>>()
  private loadedPlugins = new Map<string, string>()
  private onLoaded?: (pluginId: string) => void | Promise<void>
  private onError?: (pluginId: string, error: Error) => void
  private onUnloaded?: (pluginId: string) => void | Promise<void>
  /** Additional hooks for IReader source loading */
  private onIReaderLoaded?: (pluginId: string, adapter: IReaderPluginAdapter) => void | Promise<void>

  constructor(options: PluginWatcherOptions) {
    this.sandbox = options.sandbox
    this.pluginsDir = options.pluginsDir
    this.debounceMs = options.debounceMs ?? 300
    this.onLoaded = options.onLoaded
    this.onError = options.onError
    this.onUnloaded = options.onUnloaded
  }

  /**
   * Register a callback for when IReader sources are loaded/wrapped.
   */
  setOnIReaderLoaded(handler: (pluginId: string, adapter: IReaderPluginAdapter) => void | Promise<void>): void {
    this.onIReaderLoaded = handler
  }

  async start(): Promise<void> {
    if (!fs.existsSync(this.pluginsDir)) {
      fs.mkdirSync(this.pluginsDir, { recursive: true })
    }

    // Load existing plugins
    await this.scanExisting()

    // Watch for changes
    this.watcher = fs.watch(this.pluginsDir, { recursive: true }, (_eventType: string | null, filename: string | null) => {
      if (!filename || !filename.endsWith('.js')) return
      this.debounceReload(filename.toString())
    })
  }

  async stop(): Promise<void> {
    this.watcher?.close()
    this.watcher = null
    for (const timer of this.debounceTimers.values()) clearTimeout(timer)
    this.debounceTimers.clear()
  }

  private debounceReload(filename: string): void {
    const existing = this.debounceTimers.get(filename)
    if (existing) clearTimeout(existing)

    this.debounceTimers.set(filename, setTimeout(async () => {
      this.debounceTimers.delete(filename)
      try {
        await this.reloadPlugin(filename)
      } catch (err) {
        this.onError?.(filename, err instanceof Error ? err : new Error(String(err)))
      }
    }, this.debounceMs))
  }

  private async reloadPlugin(filename: string): Promise<void> {
    const filePath = path.join(this.pluginsDir, filename)
    // Derive the plugin ID from the parent directory name or filename
    const pluginId = filename.includes('/')
      ? (filename.split('/')[0] ?? filename.replace(/\.js$/i, ''))
      : filename.replace(/\.js$/i, '')

    if (!fs.existsSync(filePath)) {
      this.loadedPlugins.delete(filename)
      if (pluginId) {
        this.ireaderAdapters.delete(pluginId)
        await this.onUnloaded?.(pluginId)
      }
      return
    }

    const rawCode = fs.readFileSync(filePath, 'utf-8')
    // Transform ESM export default to CommonJS module.exports so the sandbox
    // (which uses a (function(module,exports,require){...}) wrapper) can load it
    const code = rawCode.replace(/export\s+default\s+/g, 'module.exports = ')

    // Validate the plugin code by evaluating it first
    try {
      const mockContext = { module: { exports: {} }, exports: {}, console }
      const fn = new Function('module', 'exports', 'console', code)
      fn(mockContext.module, mockContext.exports, console)
      const pluginExports = mockContext.module.exports || mockContext.exports
      const plugin = (pluginExports as any).default || pluginExports

      // Auto-detect source format: IReader → Tachiyomi → LNReader
      let detectedAdapter: IReaderPluginAdapter | null = null
      const pluginObj = plugin as Record<string, unknown>

      if (isIReaderSource(pluginObj)) {
        const deps = createJsDependencies((plugin as any).baseUrl || `https://${pluginId}.local`)
        detectedAdapter = createIReaderAdapter(plugin as any, deps)
      } else if (isTachiyomiSource(pluginObj)) {
        const deps = createJsDependencies((plugin as any).baseUrl || `https://${pluginId}.local`)
        detectedAdapter = createTachiyomiAdapter(plugin as any, deps)
      } else if (isLNReaderSource(pluginObj)) {
        const deps = createJsDependencies((plugin as any).baseUrl || `https://${pluginId}.local`)
        detectedAdapter = createLNReaderAdapter(plugin as any, deps)
      }

      if (detectedAdapter) {
        this.ireaderAdapters.set(detectedAdapter.info.id, detectedAdapter)
        await this.sandbox.load(detectedAdapter.info.id, code)
        this.loadedPlugins.set(filename, detectedAdapter.info.id)
        await this.onLoaded?.(detectedAdapter.info.id)
        await this.onIReaderLoaded?.(detectedAdapter.info.id, detectedAdapter)
        return
      }

      // Also try JAR files (already extracted to JS code)
      if (isJarFile(filePath)) {
        const jarAdapter = await loadJarSource(filePath)
        if (jarAdapter) {
          this.ireaderAdapters.set(jarAdapter.info.id, jarAdapter)
          await this.sandbox.load(jarAdapter.info.id, code)
          this.loadedPlugins.set(filename, jarAdapter.info.id)
          await this.onLoaded?.(jarAdapter.info.id)
          await this.onIReaderLoaded?.(jarAdapter.info.id, jarAdapter)
          return
        }
      }

      // Standard validation for native plugins
      const validation = validatePlugin(plugin)
      if (!validation.valid) {
        throw new Error(`Plugin validation failed: ${validation.errors.join(', ')}`)
      }
    } catch (err) {
      throw new Error(`Invalid plugin code in ${filename}: ${err instanceof Error ? err.message : err}`)
    }

    await this.sandbox.load(pluginId, code)
    this.loadedPlugins.set(filename, pluginId)
    await this.onLoaded?.(pluginId)
  }

  private async scanExisting(): Promise<void> {
    const entries = fs.readdirSync(this.pluginsDir, { recursive: true })
    for (const entry of entries) {
      if (typeof entry === 'string' && entry.endsWith('.js')) {
        try {
          await this.reloadPlugin(entry)
        } catch (err) {
          console.error(`Failed to load plugin ${entry}:`, err)
        }
      }
    }
  }

  getLoadedPlugins(): Map<string, string> {
    return new Map(this.loadedPlugins)
  }
}
