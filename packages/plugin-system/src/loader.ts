import fs from 'node:fs'
import path from 'node:path'
import type { SandboxInstance } from './sandbox/interface.js'
import { validatePlugin } from './validator.js'
import { isIReaderSource, createIReaderAdapter, createJsDependencies, isJsonConfigSource, createJsonConfigAdapter } from './ireader-bridge.js'
import { isTachiyomiSource, createTachiyomiAdapter } from './tachiyomi-bridge.js'
import { isLNReaderSource, createLNReaderAdapter } from './lnreader-bridge.js'
import { isMadaraSource, createMadaraAdapter } from './madara-bridge.js'
import { isMultisrcSource, createMultisrcAdapter } from './multisrc-bridge.js'
import { isJarFile, loadJarSource } from './jar-loader.js'
import type { IReaderPluginAdapter } from './ireader-bridge.js'
import type { IReaderJsonConfig } from './ireader-bridge.js'

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

    // Watch for changes — .js AND .json files for IReader config sources
    this.watcher = fs.watch(this.pluginsDir, { recursive: true }, (_eventType: string | null, filename: string | null) => {
      if (!filename) return
      const name = filename.toString()
      if (name.endsWith('.js') || name.endsWith('.json')) {
        this.debounceReload(name)
      }
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
      ? (filename.split('/')[0] ?? filename.replace(/\.[^/.]+$/i, ''))
      : filename.replace(/\.[^/.]+$/i, '')

    if (!fs.existsSync(filePath)) {
      this.loadedPlugins.delete(filename)
      if (pluginId) {
        this.ireaderAdapters.delete(pluginId)
        await this.onUnloaded?.(pluginId)
      }
      return
    }

    // --- Handle IReader JSON config sources (selector-based definitions) ---
    if (filename.endsWith('.json')) {
      try {
        const config: IReaderJsonConfig = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        if (isJsonConfigSource(config)) {
          const deps = createJsDependencies(config.baseUrl || `https://${pluginId}.local`)
          const adapter = createJsonConfigAdapter(config, deps, pluginId)
          this.ireaderAdapters.set(adapter.info.id, adapter)
          this.loadedPlugins.set(filename, adapter.info.id)
          await this.onLoaded?.(adapter.info.id)
          await this.onIReaderLoaded?.(adapter.info.id, adapter)
          return
        }
      } catch (err) {
        throw new Error(`Invalid JSON config in ${filename}: ${err instanceof Error ? err.message : err}`)
      }
      return // Not a valid JSON config source, skip
    }

    // --- Handle JS files ---
    const rawCode = fs.readFileSync(filePath, 'utf-8')

    // --- Detect UMD bundle format (IReaderSources.SourceRegistry) ---
    if (rawCode.includes('IReaderSources') || rawCode.includes('SourceRegistry')) {
      // UMD bundle: we can't easily extract individual sources, but we can register
      // the bundle as a whole and let it self-initialize via SourceRegistry
      try {
        const mockContext = { module: { exports: {} }, exports: {}, console, global: globalThis }
        const fn = new Function('module', 'exports', 'console', 'global', rawCode)
        fn(mockContext.module, mockContext.exports, console, globalThis)

        // Check if SourceRegistry was populated
        const globalObj = globalThis as any
        if (globalObj.IReaderSources?.SourceRegistry) {
          const registry = globalObj.IReaderSources.SourceRegistry
          const sourceIds = typeof registry.getSourceIds === 'function' ? registry.getSourceIds() : []
          const allSources = typeof registry.getAllSources === 'function' ? registry.getAllSources() : []

          for (const src of allSources) {
            const s = src as Record<string, unknown>
            if (isIReaderSource(s)) {
              const deps = createJsDependencies((s as any).baseUrl || `https://${pluginId}.local`)
              const adapter = createIReaderAdapter(s as any, deps)
              const id = adapter.info.id
              this.ireaderAdapters.set(id, adapter)
              this.loadedPlugins.set(`${filename}::${id}`, id)
              await this.onLoaded?.(id)
              await this.onIReaderLoaded?.(id, adapter)
            }
          }

          if (allSources.length > 0) return
        }
      } catch { /* fall through to normal JS loading */ }
    }

    // Transform ESM export default to CommonJS module.exports so the sandbox
    // (which uses a (function(module,exports,require){...}) wrapper) can load it
    const code = rawCode.replace(/export\s+default\s+/g, 'module.exports = ')

    // Validate the plugin code by evaluating it first
    try {
      const mockContext = { module: { exports: {} }, exports: {}, console }
      const fn = new Function('module', 'exports', 'console', code)
      fn(mockContext.module, mockContext.exports, console)
      // Prefer exports over module.exports: some bundled plugins (e.g. Madara/LNReader)
      // set module.exports = this at the end, corrupting the proper export path.
      const pluginExports = (mockContext.exports && Object.keys(mockContext.exports).length > 0)
        ? mockContext.exports
        : mockContext.module.exports
      const plugin = (pluginExports as any).default || pluginExports

      // Auto-detect source format: IReader → Tachiyomi → LNReader → Madara → Multisrc
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
      } else if (isMadaraSource(pluginObj)) {
        const deps = createJsDependencies((plugin as any).baseUrl || `https://${pluginId}.local`)
        detectedAdapter = createMadaraAdapter(plugin as any, deps)
      } else if (isMultisrcSource(pluginObj)) {
        const deps = createJsDependencies((plugin as any).baseUrl || `https://${pluginId}.local`)
        detectedAdapter = createMultisrcAdapter(plugin as any, deps)
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
      if (typeof entry === 'string') {
        // Match .js, .json (IReader config), and source.js in directories
        if (entry.endsWith('.js') || entry.endsWith('.json')) {
          try {
            await this.reloadPlugin(entry)
          } catch (err) {
            console.error(`Failed to load plugin ${entry}:`, err)
          }
        }
      }
    }

    // Also scan for directory-format sources (source.js inside extension dirs)
    this.scanDirectorySources(this.pluginsDir)
  }

  /**
   * Scan for IReader extension directories that contain source.js files
   * (directory format: sources/en/freewebnovel/main/source.js → pluginId: freewebnovel)
   */
  private scanDirectorySources(dir: string): void {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = path.join(dir, entry.name)
        // Check for direct source.js
        const sourceJs = path.join(subPath, 'source.js')
        if (fs.existsSync(sourceJs)) {
          const relativePath = path.relative(this.pluginsDir, sourceJs)
          this.reloadPlugin(relativePath).catch(err =>
            console.error(`Failed to load directory source ${relativePath}:`, err)
          )
        } else {
          // Recurse
          this.scanDirectorySources(subPath)
        }
      }
    }
  }

  getLoadedPlugins(): Map<string, string> {
    return new Map(this.loadedPlugins)
  }
}
