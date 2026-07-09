import { Shield, Key, Fingerprint, AlertTriangle } from 'lucide-react'

export function SecuritySettingsPage() {
  return (
    <div>
      <h1 className="text-base font-bold text-text mb-5">Security Settings</h1>

      <div className="space-y-4">
        {/* App Lock */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Fingerprint className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">App Lock</p>
              <p className="text-xs text-text-secondary">Require biometric authentication to open the app</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent" />
            <span className="text-xs text-text-secondary">Enable biometric lock</span>
          </label>
        </div>

        {/* API Key Encryption */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Key className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">API Key Storage</p>
              <p className="text-xs text-text-secondary">API keys are encrypted with AES-256-GCM</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-text-secondary">Encryption active</span>
          </div>
          <p className="text-[11px] text-text-muted">
            Keys are encrypted per-platform: Android Keystore (hardware-backed), OS keychain (desktop), or crypto.subtle (web).
          </p>
        </div>

        {/* Backup Encryption */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Backup Password</p>
              <p className="text-xs text-text-secondary">Protect exported backups with a password</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent" />
            <span className="text-xs text-text-secondary">Encrypt backups with AES-256</span>
          </label>
        </div>

        {/* Data Privacy */}
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-500" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-amber-400">Privacy Notice</p>
              <p className="text-xs text-text-secondary">
                All data is stored locally on your device. Source plugins make direct requests to third-party websites.
                Your reading history never leaves your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
