// AES-256-GCM backup encryption with PBKDF2 key derivation
// ponytail: Node.js crypto only; upgrade to Web Crypto for browser env when needed

import { createCipheriv, createDecipheriv, randomBytes, pbkdf2Sync } from 'node:crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 16 // 128 bits
const SALT_LENGTH = 32
const ITERATIONS = 100_000
const DIGEST = 'sha512'

export interface EncryptedBackup {
  salt: string   // hex
  iv: string     // hex
  tag: string    // hex (auth tag)
  data: string   // hex (ciphertext)
}

function deriveKey(password: string, salt: Buffer): Buffer {
  return pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
}

export class BackupEncryption {
  /** Encrypt a buffer with a password. Returns serialized EncryptedBackup as Buffer (JSON). */
  encrypt(buffer: Buffer, password: string): Buffer {
    if (!password || password.length < 4) {
      throw new Error('Password must be at least 4 characters')
    }

    const salt = randomBytes(SALT_LENGTH)
    const iv = randomBytes(IV_LENGTH)
    const key = deriveKey(password, salt)

    const cipher = createCipheriv(ALGORITHM, key, iv)
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()])
    const tag = cipher.getAuthTag()

    const result: EncryptedBackup = {
      salt: salt.toString('hex'),
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
      data: encrypted.toString('hex'),
    }

    return Buffer.from(JSON.stringify(result))
  }

  /** Decrypt an encrypted buffer with a password. Returns original Buffer. */
  decrypt(encryptedBuffer: Buffer, password: string): Buffer {
    if (!password || password.length < 4) {
      throw new Error('Password must be at least 4 characters')
    }

    let parsed: EncryptedBackup
    try {
      parsed = JSON.parse(encryptedBuffer.toString('utf-8')) as EncryptedBackup
    } catch {
      throw new Error('Invalid encrypted backup format')
    }

    if (!parsed.salt || !parsed.iv || !parsed.tag || !parsed.data) {
      throw new Error('Invalid encrypted backup: missing fields')
    }

    const salt = Buffer.from(parsed.salt, 'hex')
    const iv = Buffer.from(parsed.iv, 'hex')
    const tag = Buffer.from(parsed.tag, 'hex')
    const encrypted = Buffer.from(parsed.data, 'hex')
    const key = deriveKey(password, salt)

    const decipher = createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(tag)

    try {
      return Buffer.concat([decipher.update(encrypted), decipher.final()])
    } catch {
      throw new Error('Decryption failed: wrong password or corrupted data')
    }
  }

  /** Check if a buffer looks like an encrypted backup */
  isEncrypted(buffer: Buffer): boolean {
    try {
      const parsed = JSON.parse(buffer.toString('utf-8'))
      return typeof parsed === 'object' && parsed !== null
        && typeof parsed.salt === 'string'
        && typeof parsed.iv === 'string'
        && typeof parsed.tag === 'string'
        && typeof parsed.data === 'string'
    } catch {
      return false
    }
  }
}

export const backupEncryption = new BackupEncryption()
