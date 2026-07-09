import type { SandboxAdapter, SandboxInstance, SandboxOptions } from './interface.js'

export class MockSandbox implements SandboxAdapter, SandboxInstance {
  private code = ''

  get name(): string {
    return 'mock'
  }

  isAvailable(): boolean {
    return true
  }

  create(_options: SandboxOptions): Promise<SandboxInstance> {
    return Promise.resolve(this)
  }

  load(_pluginId: string, code: string): Promise<void> {
    this.code = code
    return Promise.resolve()
  }

  execute(_method: string, _args: unknown[]): Promise<unknown> {
    return Promise.resolve([])
  }

  destroy(): Promise<void> {
    return Promise.resolve()
  }
}
