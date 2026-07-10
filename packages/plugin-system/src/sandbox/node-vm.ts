import vm from 'node:vm'
import { parseHTML } from '../html-parser.js'
import type { SandboxAdapter, SandboxInstance, SandboxOptions } from './interface.js'

interface VmContext {
  pluginId: string
  exports: Record<string, unknown>
  sandbox: Record<string, unknown>
  script: vm.Script | null
}

export class NodeVmSandbox implements SandboxAdapter {
  readonly type = 'node-vm' as const
  readonly name = 'NodeVM Sandbox'

  isAvailable(): boolean {
    return typeof vm.Script === 'function'
  }

  async create(options: SandboxOptions): Promise<SandboxInstance> {
    return new NodeVmInstance(options)
  }
}

class NodeVmInstance implements SandboxInstance {
  private contexts = new Map<string, VmContext>()
  private timeout: number
  constructor(options: SandboxOptions) {
    this.timeout = options.timeout ?? 30_000
    void options.allowedDomains
  }

  async load(pluginId: string, code: string): Promise<void> {
    this.unload(pluginId)
    const sandbox = this.createSandbox(pluginId)
    const context = vm.createContext(sandbox)
    const wrappedCode = `(function(module, exports, require) {\n${code}\n})(module, exports, require)`

    const script = new vm.Script(wrappedCode, {
      filename: `${pluginId}.js`,
    } as vm.ScriptOptions)

    script.runInContext(context, { timeout: this.timeout } as vm.RunningScriptOptions)

    const sandboxObj = sandbox as { module?: { exports: Record<string, unknown> } }
    this.contexts.set(pluginId, {
      pluginId,
      exports: sandboxObj.module?.exports ?? {},
      sandbox: sandbox,
      script,
    })
  }

  async execute(pluginId: string, method: string, args: unknown[]): Promise<unknown> {
    const ctx = this.contexts.get(pluginId)
    if (!ctx) throw new Error(`Plugin not loaded: ${pluginId}`)

    const pluginObj = (ctx.exports as Record<string, unknown>)?.['default'] ?? ctx.exports
    if (typeof pluginObj !== 'object' || !pluginObj) throw new Error(`Plugin ${pluginId} has no exports`)

    // Run the method call inside the existing vm context so the plugin retains access
    // to its own methods, fetch, parseHTML, etc.
    const execCode = `
      (function() {
        var plugin = module.exports.default || module.exports;
        var val = plugin['${method}'];
        if (typeof val === 'function') {
          var args = ${JSON.stringify(args)};
          return val.apply(plugin, args);
        }
        // Property access (e.g. plugin.info → returns the object)
        return val;
      })()
    `

    const execScript = new vm.Script(execCode, {
      filename: `${pluginId}.${method}.js`,
    } as vm.ScriptOptions)

    // Use the original sandbox context (not a fresh one) so the plugin's own
    // references to fetch/parseHTML/setTimeout still work
    const contextWithMethods = vm.createContext({
      ...ctx.sandbox,
      fetch: async (url: string, opts?: RequestInit) => {
        return globalThis.fetch(url, opts)
      },
      parseHTML,
      setTimeout: (fn: () => void, ms: number) => setTimeout(fn, Math.min(ms, 30_000)),
    })

    return execScript.runInContext(contextWithMethods, { timeout: this.timeout })
  }

  async destroy(): Promise<void> {
    this.contexts.clear()
  }

  private unload(pluginId: string): void {
    this.contexts.delete(pluginId)
  }

  private createSandbox(pluginId: string): Record<string, unknown> {
    return {
      module: { exports: {} },
      exports: {},
      require: (id: string) => { throw new Error(`require() is not available in plugin sandbox (${pluginId} tried to require '${id}')`) },
      console: {
        log: (...args: unknown[]) => console.log(`[plugin:${pluginId}]`, ...args),
        warn: (...args: unknown[]) => console.warn(`[plugin:${pluginId}]`, ...args),
        error: (...args: unknown[]) => console.error(`[plugin:${pluginId}]`, ...args),
      },
      fetch: async (url: string, opts?: RequestInit) => globalThis.fetch(url, opts),
      setTimeout: (fn: () => void, ms: number) => setTimeout(fn, Math.min(ms, 30_000)),
      clearTimeout,
      JSON, Math, Date, RegExp, Array, Object, String, Number, Boolean, Map, Set, Promise,
      parseInt, parseFloat, isNaN, encodeURI, decodeURI, encodeURIComponent, decodeURIComponent,
      URL, URLSearchParams,
    }
  }
}
