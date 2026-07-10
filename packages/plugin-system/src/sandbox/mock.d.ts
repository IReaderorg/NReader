import type { SandboxAdapter, SandboxInstance, SandboxOptions } from './interface.js';
export declare class MockSandbox implements SandboxAdapter, SandboxInstance {
    private code;
    get name(): string;
    isAvailable(): boolean;
    create(_options: SandboxOptions): Promise<SandboxInstance>;
    load(_pluginId: string, code: string): Promise<void>;
    execute(_method: string, _args: unknown[]): Promise<unknown>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=mock.d.ts.map