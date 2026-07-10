import vm from 'node:vm';
import { parseHTML } from '../html-parser.js';
export class NodeVmSandbox {
    name = 'node-vm';
    contexts = new Map();
    isAvailable() {
        return typeof vm.Script === 'function';
    }
    async create(options) {
        return new NodeVmInstance(options);
    }
}
class NodeVmInstance {
    contexts = new Map();
    timeout;
    allowedDomains;
    resolveDir;
    constructor(options) {
        this.timeout = options.timeout ?? 30_000;
        this.allowedDomains = options.allowedDomains ?? [];
        this.resolveDir = options.resolveDir ?? process.cwd();
    }
    async load(pluginId, code) {
        this.unload(pluginId);
        const sandbox = this.createSandbox(pluginId);
        const context = vm.createContext(sandbox);
        const wrappedCode = `(function(module, exports, require) {\n${code}\n})(module, exports, require)`;
        const script = new vm.Script(wrappedCode, {
            filename: `${pluginId}.js`,
            timeout: this.timeout,
        });
        script.runInContext(context, { timeout: this.timeout });
        this.contexts.set(pluginId, {
            pluginId,
            exports: sandbox.module?.exports ?? {},
            sandbox: sandbox,
            script,
        });
    }
    async execute(pluginId, method, args) {
        const ctx = this.contexts.get(pluginId);
        if (!ctx)
            throw new Error(`Plugin not loaded: ${pluginId}`);
        const pluginObj = ctx.exports?.['default'] ?? ctx.exports;
        if (typeof pluginObj !== 'object' || !pluginObj)
            throw new Error(`Plugin ${pluginId} has no exports`);
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
    `;
        const execScript = new vm.Script(execCode, {
            filename: `${pluginId}.${method}.js`,
            timeout: this.timeout,
        });
        // Use the original sandbox context (not a fresh one) so the plugin's own
        // references to fetch/parseHTML/setTimeout still work
        const contextWithMethods = vm.createContext({
            ...ctx.sandbox,
            fetch: async (url, opts) => {
                return globalThis.fetch(url, opts);
            },
            parseHTML,
            setTimeout: (fn, ms) => setTimeout(fn, Math.min(ms, 30_000)),
        });
        return execScript.runInContext(contextWithMethods, { timeout: this.timeout });
    }
    async destroy() {
        this.contexts.clear();
    }
    unload(pluginId) {
        this.contexts.delete(pluginId);
    }
    createSandbox(pluginId) {
        return {
            module: { exports: {} },
            exports: {},
            require: (id) => { throw new Error(`require() is not available in plugin sandbox (${pluginId} tried to require '${id}')`); },
            console: {
                log: (...args) => console.log(`[plugin:${pluginId}]`, ...args),
                warn: (...args) => console.warn(`[plugin:${pluginId}]`, ...args),
                error: (...args) => console.error(`[plugin:${pluginId}]`, ...args),
            },
            fetch: async (url, opts) => globalThis.fetch(url, opts),
            setTimeout: (fn, ms) => setTimeout(fn, Math.min(ms, 30_000)),
            clearTimeout,
            JSON, Math, Date, RegExp, Array, Object, String, Number, Boolean, Map, Set, Promise,
            parseInt, parseFloat, isNaN, encodeURI, decodeURI, encodeURIComponent, decodeURIComponent,
            URL, URLSearchParams,
        };
    }
}
function createScopedFetch(baseUrl, allowedDomains) {
    const allowed = [new URL(baseUrl).hostname, ...allowedDomains];
    return async function scopedFetch(url, options) {
        const reqUrl = new URL(url, baseUrl);
        if (!allowed.some(d => reqUrl.hostname === d || reqUrl.hostname.endsWith('.' + d))) {
            throw new Error(`fetch() to ${reqUrl.hostname} not allowed (scoped to ${allowed.join(', ')})`);
        }
        return globalThis.fetch(reqUrl.toString(), options);
    };
}
//# sourceMappingURL=node-vm.js.map