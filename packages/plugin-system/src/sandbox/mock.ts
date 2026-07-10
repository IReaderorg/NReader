import type { SandboxAdapter, SandboxInstance, SandboxOptions } from './interface.js'

export class MockSandbox implements SandboxAdapter, SandboxInstance {
  get type(): 'mock' {
    return 'mock'
  }

  get name(): string {
    return 'Mock Sandbox'
  }

  isAvailable(): boolean {
    return true
  }

  create(_options: SandboxOptions): Promise<SandboxInstance> {
    return Promise.resolve(this)
  }

  load(_pluginId: string, _code: string): Promise<void> {
    return Promise.resolve()
  }

  execute(_pluginId: string, _method: string, _args: unknown[]): Promise<unknown> {
    return Promise.resolve([])
  }

  destroy(): Promise<void> {
    return Promise.resolve()
  }
}
