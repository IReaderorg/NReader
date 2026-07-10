import type { SandboxAdapter, SandboxInstance, SandboxOptions } from './interface.js';
export declare class NodeVmSandbox implements SandboxAdapter {
    name: "node-vm";
    private contexts;
    isAvailable(): boolean;
    create(options: SandboxOptions): Promise<SandboxInstance>;
}
//# sourceMappingURL=node-vm.d.ts.map