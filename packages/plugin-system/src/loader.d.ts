import type { SandboxInstance } from './sandbox/interface.js';
import type { IReaderPluginAdapter } from './ireader-bridge.js';
interface PluginWatcherOptions {
    pluginsDir: string;
    sandbox: SandboxInstance;
    debounceMs?: number;
    onLoaded?: (pluginId: string) => void | Promise<void>;
    onError?: (fileName: string, error: Error) => void;
    onUnloaded?: (pluginId: string) => void | Promise<void>;
}
export declare class PluginLoader {
    /** IReader adapters loaded by this loader instance */
    private ireaderAdapters;
    private watcher;
    private sandbox;
    private pluginsDir;
    private debounceMs;
    private debounceTimers;
    private loadedPlugins;
    private onLoaded?;
    private onError?;
    private onUnloaded?;
    /** Additional hooks for IReader source loading */
    private onIReaderLoaded?;
    constructor(options: PluginWatcherOptions);
    /**
     * Register a callback for when IReader sources are loaded/wrapped.
     */
    setOnIReaderLoaded(handler: (pluginId: string, adapter: IReaderPluginAdapter) => void | Promise<void>): void;
    start(): Promise<void>;
    stop(): Promise<void>;
    private debounceReload;
    private reloadPlugin;
    private scanExisting;
    getLoadedPlugins(): Map<string, string>;
}
export {};
//# sourceMappingURL=loader.d.ts.map