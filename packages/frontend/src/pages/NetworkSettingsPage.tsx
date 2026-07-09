import { Wifi, Globe, Clock, Shield } from 'lucide-react'

export function NetworkSettingsPage() {
  return (
    <div>
      <h1 className="text-base font-bold text-text mb-5">Network Settings</h1>

      <div className="space-y-4">
        {/* DNS Override */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">DNS Override</p>
              <p className="text-xs text-text-secondary">Use custom DNS for source requests</p>
            </div>
          </div>
          <input
            type="text"
            placeholder="8.8.8.8"
            className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-border-light text-text text-xs focus:outline-none focus:border-accent/50"
          />
          <p className="text-[10px] text-text-muted mt-1.5">Leave empty to use system default DNS</p>
        </div>

        {/* Request Timeout */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Request Timeout</p>
              <p className="text-xs text-text-secondary">Maximum time to wait for source responses</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="range" min={5} max={60} defaultValue={30} className="flex-1 accent-[hsl(var(--accent))]" />
            <span className="text-xs text-text-muted w-12 text-right">30s</span>
          </div>
        </div>

        {/* Rate Limit */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Rate Limit</p>
              <p className="text-xs text-text-secondary">Delay between requests to prevent IP bans</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="range" min={200} max={3000} step={100} defaultValue={500} className="flex-1 accent-[hsl(var(--accent))]" />
            <span className="text-xs text-text-muted w-16 text-right">500ms</span>
          </div>
        </div>

        {/* User Agent */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Wifi className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">User Agent</p>
              <p className="text-xs text-text-secondary">Browser identification for source requests</p>
            </div>
          </div>
          <input
            type="text"
            placeholder="Mozilla/5.0 (compatible; IReader/1.0)"
            className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-border-light text-text text-xs focus:outline-none focus:border-accent/50"
          />
          <p className="text-[10px] text-text-muted mt-1.5">Custom user-agent string for HTTP requests</p>
        </div>
      </div>
    </div>
  )
}
