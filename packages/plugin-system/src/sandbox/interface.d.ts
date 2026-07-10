export interface SandboxOptions {
    timeout?: number;
    memoryLimit?: number;
    allowedDomains?: string[];
    resolveDir?: string;
}
export interface SandboxInstance {
    load(pluginId: string, code: string): Promise<void>;
    execute(pluginId: string, method: string, args: unknown[]): Promise<unknown>;
    destroy(): Promise<void>;
}
export interface SandboxAdapter {
    name: string;
    isAvailable(): boolean;
    create(options: SandboxOptions): Promise<SandboxInstance>;
}
//# sourceMappingURL=interface.d.ts.map