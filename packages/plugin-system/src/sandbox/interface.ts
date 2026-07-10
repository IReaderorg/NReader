export type SandboxType = 'node-vm' | 'web-worker' | 'webview-v8' | 'mock'

export interface SandboxOptions {
  timeout?: number
  memoryLimit?: number
  allowedDomains?: string[]
}

export interface SandboxInstance {
  load(pluginId: string, code: string): Promise<void>
  execute(pluginId: string, method: string, args: unknown[]): Promise<unknown>
  destroy(): Promise<void>
}

export interface SandboxAdapter {
  readonly type: SandboxType
  readonly name: string
  isAvailable(): boolean
  create(options: SandboxOptions): Promise<SandboxInstance>
}
