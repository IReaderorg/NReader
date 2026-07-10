import type { BackupService } from './backup-service.js'
import { writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

export interface AutoBackupConfig {
  enabled: boolean
  intervalHours: number
  maxBackups: number
  includeCovers: boolean
  backupDir: string
}

const DEFAULT_CONFIG: AutoBackupConfig = {
  enabled: false,
  intervalHours: 24,
  maxBackups: 10,
  includeCovers: true,
  backupDir: join(process.cwd(), 'backups'),
}

export class AutoBackupScheduler {
  private config: AutoBackupConfig
  private timer: ReturnType<typeof setInterval> | null = null
  private backupService: BackupService

  constructor(backupService: BackupService) {
    this.backupService = backupService
    this.config = { ...DEFAULT_CONFIG }
  }

  getConfig(): AutoBackupConfig {
    return { ...this.config }
  }

  updateConfig(updates: Partial<AutoBackupConfig>): AutoBackupConfig {
    const wasEnabled = this.config.enabled
    this.config = { ...this.config, ...updates }

    if (!existsSync(this.config.backupDir)) {
      mkdirSync(this.config.backupDir, { recursive: true })
    }

    if (!wasEnabled && this.config.enabled) {
      this.start()
    } else if (wasEnabled && !this.config.enabled) {
      this.stop()
    } else if (this.config.enabled && this.timer) {
      this.stop()
      this.start()
    }

    return this.getConfig()
  }

  start(): void {
    if (this.timer) return

    console.log(`[AutoBackup] Starting — interval: ${this.config.intervalHours}h, max: ${this.config.maxBackups}`)

    if (!existsSync(this.config.backupDir)) {
      mkdirSync(this.config.backupDir, { recursive: true })
    }

    this.checkAndBackup().catch(err => {
      console.error('[AutoBackup] Initial backup failed:', err)
    })

    const intervalMs = this.config.intervalHours * 60 * 60 * 1000
    this.timer = setInterval(() => {
      this.checkAndBackup().catch(err => {
        console.error('[AutoBackup] Scheduled backup failed:', err)
      })
    }, intervalMs)
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      console.log('[AutoBackup] Stopped')
    }
  }

  isRunning(): boolean {
    return this.timer !== null
  }

  async runBackupNow(): Promise<{ filename: string; size: number; path: string }> {
    return this.performBackup()
  }

  private async checkAndBackup(): Promise<void> {
    const { backupDir, maxBackups } = this.config
    const existing = this.listExistingBackups()
    if (existing.length > 0) {
      const newest = existing[0]!
      const ageMs = Date.now() - newest.timestamp
      const thresholdMs = this.config.intervalHours * 60 * 60 * 1000 * 0.9
      if (ageMs < thresholdMs) {
        return
      }
    }
    await this.performBackup()
    await this.cleanupOld(backupDir, maxBackups)
  }

  private async performBackup(): Promise<{ filename: string; size: number; path: string }> {
    const { backupDir, includeCovers } = this.config
    console.log('[AutoBackup] Creating backup...')

    const zipData = await this.backupService.exportBackup(includeCovers)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `ireader-backup-${timestamp}.zip`
    const filePath = join(backupDir, filename)

    writeFileSync(filePath, zipData)
    console.log(`[AutoBackup] Backup saved: ${filename} (${(zipData.length / 1024).toFixed(1)} KB)`)

    return {
      filename,
      size: zipData.length,
      path: filePath,
    }
  }

  private listExistingBackups(): Array<{ filename: string; timestamp: number }> {
    const { backupDir } = this.config
    if (!existsSync(backupDir)) return []

    try {
      const files = readdirSync(backupDir)
        .filter((f: string) => f.startsWith('ireader-backup-') && f.endsWith('.zip'))
        .map((f: string) => {
          const isoString = f
            .replace('ireader-backup-', '')
            .replace('.zip', '')
            .replace(/T/, ' ')
            .replace(/-(\d{2})-(\d{2})-(\d{3})Z$/, ':$1:$2.$3Z')
          const timestamp = new Date(isoString).getTime()
          return { filename: f, timestamp: isNaN(timestamp) ? Date.now() : timestamp }
        })
        .sort((a: { timestamp: number }, b: { timestamp: number }) => b.timestamp - a.timestamp)

      return files
    } catch {
      return []
    }
  }

  private async cleanupOld(backupDir: string, maxBackups: number): Promise<void> {
    try {
      const existing = this.listExistingBackups()
      if (existing.length <= maxBackups) return

      const toDelete = existing.slice(maxBackups)
      for (const backup of toDelete) {
        const filePath = join(backupDir, backup.filename)
        unlinkSync(filePath)
        console.log(`[AutoBackup] Cleaned up old backup: ${backup.filename}`)
      }
    } catch (err) {
      console.error('[AutoBackup] Failed to cleanup old backups:', err)
    }
  }

  destroy(): void {
    this.stop()
  }
}
