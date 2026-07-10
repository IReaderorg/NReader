import type { SandboxAdapter, SandboxInstance, SandboxOptions, SandboxType } from './interface.js'
import { MockSandbox } from './mock.js'

export type { SandboxAdapter, SandboxInstance, SandboxOptions, SandboxType }

let nodeVmAdapter: SandboxAdapter | null = null
let webWorkerAdapter: SandboxAdapter | null = null
let webViewV8Adapter: SandboxAdapter | null = null
let mockAdapter: SandboxAdapter = new MockSandbox()

/**
 * Auto-detect and return the best available sandbox adapter.
 * Order of preference: NodeVM > WebWorker > WebViewV8 > Mock
 */
export async function createSandbox(type?: SandboxType): Promise<SandboxAdapter> {
  if (type) {
    switch (type) {
      case 'node-vm':
        return getOrCreateNodeVm()
      case 'web-worker':
        return getOrCreateWebWorker()
      case 'webview-v8':
        return getOrCreateWebViewV8()
      case 'mock':
        return mockAdapter
    }
  }

  // Auto-detect
  if (!nodeVmAdapter) {
    try {
      const { NodeVmSandbox } = await import('./node-vm.js')
      const vm = new NodeVmSandbox()
      if (vm.isAvailable()) {
        nodeVmAdapter = vm
        return nodeVmAdapter
      }
    } catch { /* node:vm not available */ }
  } else {
    return nodeVmAdapter
  }

  const worker = await getOrCreateWebWorker()
  if (worker) return worker

  const v8 = await getOrCreateWebViewV8()
  if (v8) return v8

  return mockAdapter
}

async function getOrCreateNodeVm(): Promise<SandboxAdapter> {
  if (nodeVmAdapter) return nodeVmAdapter
  const { NodeVmSandbox } = await import('./node-vm.js')
  nodeVmAdapter = new NodeVmSandbox()
  return nodeVmAdapter
}

async function getOrCreateWebWorker(): Promise<SandboxAdapter> {
  if (webWorkerAdapter) return webWorkerAdapter
  try {
    const { WebWorkerSandbox } = await import('./web-worker.js')
    const worker = new WebWorkerSandbox()
    if (worker.isAvailable()) {
      webWorkerAdapter = worker
      return webWorkerAdapter
    }
  } catch { /* Workers not available */ }
  return mockAdapter
}

async function getOrCreateWebViewV8(): Promise<SandboxAdapter> {
  if (webViewV8Adapter) return webViewV8Adapter
  try {
    const { WebViewV8Sandbox } = await import('./webview-v8.js')
    const v8 = new WebViewV8Sandbox()
    if (v8.isAvailable()) {
      webViewV8Adapter = v8
      return webViewV8Adapter
    }
  } catch { /* Function not available */ }
  return mockAdapter
}
