import { parseHTML } from '../html-parser.js'
import type { SandboxAdapter, SandboxInstance, SandboxOptions } from './interface.js'
import { safeConsole, safeSetTimeout, safeAtob, safeBtoa } from './shims.js'

interface SandboxedContext {
  pluginId: string
  exports: Record<string, unknown>
  scope: Record<string, unknown>
}

export class WebViewV8Sandbox implements SandboxAdapter {
  readonly type = 'webview-v8' as const
  readonly name = 'WebView V8 Sandbox'

  isAvailable(): boolean {
    return typeof Function === 'function' && typeof Worker === 'undefined'
  }

  async create(options: SandboxOptions): Promise<SandboxInstance> {
    return new WebViewV8Instance(options)
  }
}

class WebViewV8Instance implements SandboxInstance {
  private contexts = new Map<string, SandboxedContext>()
  private timeout: number
  private allowedDomains: string[]

  constructor(options: SandboxOptions) {
    this.timeout = options.timeout ?? 30_000
    this.allowedDomains = options.allowedDomains ?? []
  }

  async load(pluginId: string, code: string): Promise<void> {
    this.unload(pluginId)

    const scope = this.createScope(pluginId)
    const wrappedCode = `(function(module, exports, require, fetch, console, setTimeout, parseHTML, atob, btoa) {\n${code}\n})`

    const fn = new Function('module', 'exports', 'require', 'fetch', 'console', 'setTimeout', 'parseHTML', 'atob', 'btoa', 'pluginId', wrappedCode)
    const mod = { exports: {} } as { exports: Record<string, unknown> }

    try {
      fn(
        mod,
        mod.exports,
        scope.require,
        scope.fetch,
        scope.console,
        scope.setTimeout,
        scope.parseHTML,
        scope.atob,
        scope.btoa,
        pluginId,
      )
    } catch (err) {
      throw new Error(`Failed to load plugin ${pluginId}: ${err instanceof Error ? err.message : err}`)
    }

    this.contexts.set(pluginId, {
      pluginId,
      exports: mod.exports.default ? (mod.exports.default as Record<string, unknown>) : mod.exports,
      scope,
    })
  }

  async execute(_pluginId: string, method: string, args: unknown[]): Promise<unknown> {
    // We just find the first context that has the method
    for (const ctx of this.contexts.values()) {
      const pluginObj = ctx.exports
      const val = (pluginObj as Record<string, unknown>)[method]
      if (typeof val === 'function') {
        return (val as (...a: unknown[]) => unknown).apply(pluginObj, args)
      }
      if (val !== undefined) return val
    }
    throw new Error(`Method ${method} not found in any loaded plugin`)
  }

  async destroy(): Promise<void> {
    this.contexts.clear()
  }

  private unload(pluginId: string): void {
    this.contexts.delete(pluginId)
  }

  private createScope(pluginId: string): Record<string, unknown> {
    const maxMs = this.timeout
    const self = this
    return {
      require: (id: string) => { throw new Error(`require() is not available in plugin sandbox (${pluginId} tried to require '${id}')`) },
      console: safeConsole,
      setTimeout: safeSetTimeout(maxMs),
      clearTimeout,
      fetch: async (input: URL | RequestInfo, init?: RequestInit) => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
        if (self.allowedDomains.length > 0) {
          const hostname = new URL(url).hostname
          const ok = self.allowedDomains.some(d => hostname === d || hostname.endsWith('.' + d))
          if (!ok) throw new Error(`fetch to ${hostname} not allowed`)
        }
        return globalThis.fetch(url, init)
      },
      parseHTML,
      atob: safeAtob,
      btoa: safeBtoa,
      JSON, Math, Date, RegExp, Array, Object, String, Number, Boolean, Map, Set, Promise,
      parseInt, parseFloat, isNaN, encodeURI, decodeURI, encodeURIComponent, decodeURIComponent,
      URL, URLSearchParams,
    }
  }
}
