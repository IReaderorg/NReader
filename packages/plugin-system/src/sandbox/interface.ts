export interface SandboxOptions {
  timeout?: number
  memoryLimit?: number
  allowedDomains?: string[]
}

export interface SandboxInstance {
  load(pluginId: string, code: string): Promise<void>
  execute(method: string, args: unknown[]): Promise<unknown>
  destroy(): Promise<void>
}

export interface SandboxAdapter {
  name: string
  isAvailable(): boolean
  create(options: SandboxOptions): Promise<SandboxInstance>
}
