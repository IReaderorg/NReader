import type { DatabaseDriver, SQLiteDriver } from './interface.js'
import { createMemoryDriver } from './memory.js'
import { createNodeFileDriver } from './node-file.js'
import { createCapacitorFileDriver } from './capacitor-filesystem.js'

export async function createDriver(
  type?: 'memory' | 'node' | 'capacitor'
): Promise<DatabaseDriver & SQLiteDriver> {
  if (type) {
    switch (type) {
      case 'node':
        return createNodeFileDriver()
      case 'capacitor':
        return createCapacitorFileDriver()
      default:
        return createMemoryDriver()
    }
  }

  // Auto-detect: Node with env var → node-file, Capacitor → capacitor-filesystem, else memory
  if (typeof process !== 'undefined' && process.env?.IREADER_DB_PATH) {
    return createNodeFileDriver()
  }

  try {
    const { Capacitor } = await import('@capacitor/core')
    if (Capacitor.isNativePlatform()) {
      return createCapacitorFileDriver()
    }
  } catch {
    // Capacitor not available
  }

  try {
    await import('node:fs/promises')
    // node:fs available — use node-file with default path
    return createNodeFileDriver()
  } catch {
    // No filesystem — use memory
  }

  return createMemoryDriver()
}
