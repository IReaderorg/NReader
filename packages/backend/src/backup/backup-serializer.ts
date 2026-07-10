// Backup serialization with schema validation and version checks
// ponytail: JSON-only, upgrade to schema registry when >2 versions exist

import type { BackupPayload } from '@ireader/core'

export interface BackupEnvelope {
  formatVersion: number
  schemaVersion: number
  createdAt: string
  appName: string
  payload: BackupPayload
}

const CURRENT_FORMAT_VERSION = 2
const APP_NAME = 'IReader-Next'

function safeStringify(obj: unknown, space = 0): string {
  const seen = new WeakSet()
  return JSON.stringify(obj, (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]'
      seen.add(value)
    }
    return value
  }, space)
}

function validatePayload(data: unknown): BackupPayload {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid backup: payload must be an object')
  }
  const p = data as Record<string, unknown>
  if (!Array.isArray(p.library)) throw new Error('Invalid backup: library must be an array')
  if (!Array.isArray(p.categories)) throw new Error('Invalid backup: categories must be an array')
  if (!Array.isArray(p.history)) throw new Error('Invalid backup: history must be an array')
  if (!Array.isArray(p.settings)) throw new Error('Invalid backup: settings must be an array')
  if (!Array.isArray(p.downloads)) throw new Error('Invalid backup: downloads must be an array')
  if (!Array.isArray(p.glossary)) throw new Error('Invalid backup: glossary must be an array')
  if (!Array.isArray(p.plugins)) throw new Error('Invalid backup: plugins must be an array')
  return p as unknown as BackupPayload
}

export class BackupSerializer {
  /** Serialize a BackupPayload into a Buffer with envelope metadata */
  serialize(data: BackupPayload): Buffer {
    const envelope: BackupEnvelope = {
      formatVersion: CURRENT_FORMAT_VERSION,
      schemaVersion: data.schemaVersion,
      createdAt: new Date().toISOString(),
      appName: APP_NAME,
      payload: data,
    }
    return Buffer.from(safeStringify(envelope))
  }

  /** Deserialize a Buffer back into a BackupPayload with validation */
  deserialize(buffer: Buffer): BackupPayload {
    const text = buffer.toString('utf-8')
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      throw new Error('Invalid backup: invalid JSON')
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid backup: not an object')
    }

    const env = parsed as Record<string, unknown>

    // Support both envelope and raw payload formats
    if (env.formatVersion !== undefined) {
      // Envelope format
      if (typeof env.formatVersion !== 'number') {
        throw new Error('Invalid backup: formatVersion must be a number')
      }
      if (env.formatVersion < 1 || env.formatVersion > CURRENT_FORMAT_VERSION) {
        throw new Error(`Unsupported backup format version: ${env.formatVersion}`)
      }
      if (!env.payload) {
        throw new Error('Invalid backup: missing payload in envelope')
      }
      return validatePayload(env.payload)
    }

    // Raw payload format (legacy)
    return validatePayload(parsed)
  }

  /** Check if a buffer is in envelope format */
  isEnvelopeFormat(buffer: Buffer): boolean {
    try {
      const parsed = JSON.parse(buffer.toString('utf-8'))
      return typeof parsed === 'object' && parsed !== null && typeof parsed.formatVersion === 'number'
    } catch {
      return false
    }
  }

  /** Get format version without full deserialization */
  peekVersion(buffer: Buffer): number {
    try {
      const parsed = JSON.parse(buffer.toString('utf-8'))
      if (typeof parsed === 'object' && parsed !== null) {
        const env = parsed as Record<string, unknown>
        if (typeof env.formatVersion === 'number') return env.formatVersion
        if (typeof env.schemaVersion === 'number') return env.schemaVersion
      }
    } catch {
      // ignore
    }
    return 1
  }
}

export const backupSerializer = new BackupSerializer()
