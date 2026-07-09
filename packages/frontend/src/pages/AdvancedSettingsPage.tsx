import { Bug, Database, Trash2, FlaskConical } from 'lucide-react'

export function AdvancedSettingsPage() {
  return (
    <div>
      <h1 className="text-base font-bold text-text mb-5">Advanced Settings</h1>

      <div className="space-y-4">
        {/* Debug Mode */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Bug className="w-4.5 h-4.5 text-amber-500" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Debug Mode</p>
              <p className="text-xs text-text-secondary">Show detailed logs and network information</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent" />
            <span className="text-xs text-text-secondary">Enable debug logging</span>
          </label>
        </div>

        {/* Cache Management */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Cache Management</p>
              <p className="text-xs text-text-secondary">Manage image and data cache</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">Image cache: ~200MB</span>
            <span className="text-xs text-text-muted/40">(LRU, Max 500MB)</span>
          </div>
          <button className="mt-2 px-3 py-1.5 rounded-lg bg-surface-hover text-text-secondary text-xs hover:bg-danger/10 hover:text-danger transition-colors">
            Clear Image Cache
          </button>
        </div>

        {/* Data Reset */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Trash2 className="w-4.5 h-4.5 text-danger" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Reset Data</p>
              <p className="text-xs text-text-secondary">Clear all local data and start fresh</p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-danger/10 text-danger text-xs font-medium hover:bg-danger/20 transition-colors">
            Reset All Data
          </button>
          <p className="text-[10px] text-text-muted mt-1">Warning: This cannot be undone. Export a backup first.</p>
        </div>

        {/* Experimental Features */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <FlaskConical className="w-4.5 h-4.5 text-violet-500" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Experimental Features</p>
              <p className="text-xs text-text-secondary">Try features still in development</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent" />
              <span className="text-xs text-text-secondary">AI-powered manga recommendations</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent" />
              <span className="text-xs text-text-secondary">Web Worker backend (PWA-only mode)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
