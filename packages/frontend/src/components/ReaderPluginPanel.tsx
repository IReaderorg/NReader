import { useCallback, useEffect, useState } from 'react'
import {
  X,
  Puzzle,
  ExternalLink,
  Loader2,
  Play,
} from 'lucide-react'
import { api } from '../api/client'

interface PluginInfo {
  id: string
  name: string
  description?: string
  type?: string
  version?: string
  author?: string
  installUrl?: string
}

interface ReaderPluginPanelProps {
  /** Current chapter ID to pass to plugin actions */
  chapterId: string
  /** Callback when panel is closed */
  onClose: () => void
  /** Whether the panel is visible */
  visible: boolean
}

/**
 * ReaderPluginPanel - Shows installed plugins that can act on the current chapter.
 * Based on IReader's ReaderPluginPanel.kt
 * Accessible from reader top bar via puzzle icon button.
 */
export function ReaderPluginPanel({ chapterId, onClose, visible }: ReaderPluginPanelProps) {
  const [plugins, setPlugins] = useState<PluginInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [executing, setExecuting] = useState<string | null>(null)

  useEffect(() => {
    if (!visible) return
    setLoading(true)
    Promise.all([
      api.getPlugins().catch(() => [] as PluginInfo[]),
      api.getSources().catch(() => [] as PluginInfo[]),
    ]).then(([installedPlugins, sources]) => {
      // Combine installed plugins + sources as available "plugins"
      const all: PluginInfo[] = [
        ...installedPlugins.map(p => ({ ...p, type: p.type || 'plugin' })),
        ...sources.filter(s => s.id !== 'local').map(s => ({
          id: s.id,
          name: s.name,
          description: `Source: ${s.lang} — ${s.baseUrl}`,
          type: 'source',
          version: s.version,
        })),
      ]
      setPlugins(all)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [visible])

  const executePluginAction = useCallback(async (pluginId: string, action: string) => {
    setExecuting(pluginId)
    try {
      await api.proxyFetch(`/api/v1/plugins/${pluginId}/action`, {
        method: 'POST',
        body: JSON.stringify({ action, chapterId }),
      })
    } catch {
      // Plugin actions are fire-and-forget
    }
    setExecuting(null)
  }, [chapterId])

  // Close on Escape
  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Right sidebar panel */}
      <div className="absolute right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-surface flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-light">
          <div className="flex items-center gap-2">
            <Puzzle className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-text">Plugins</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Plugin list */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
            </div>
          ) : plugins.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <Puzzle className="w-8 h-8 text-text-muted/30 mb-3" />
              <p className="text-sm text-text-muted font-medium">No plugins available</p>
              <p className="text-xs text-text-muted/60 mt-1">Install sources to see them here</p>
            </div>
          ) : (
            <div className="py-2">
              {plugins.map(plugin => {
                const isExecuting = executing === plugin.id
                return (
                  <div
                    key={plugin.id}
                    className="px-4 py-3 hover:bg-surface-hover transition-colors border-b border-border-light/50 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-text truncate">
                            {plugin.name}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-text-muted/50 font-semibold bg-surface-hover/50 px-1.5 py-0.5 rounded">
                            {plugin.type || 'plugin'}
                          </span>
                        </div>
                        {plugin.description && (
                          <p className="text-[11px] text-text-muted mt-0.5 line-clamp-2">
                            {plugin.description}
                          </p>
                        )}
                        {plugin.author && (
                          <p className="text-[10px] text-text-muted/50 mt-0.5">
                            by {plugin.author}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => executePluginAction(plugin.id, 'analyze')}
                          disabled={isExecuting}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors disabled:opacity-40"
                          title="Analyze chapter"
                        >
                          {isExecuting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Play className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {plugin.installUrl && (
                          <a
                            href={plugin.installUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                            title="Open plugin"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Safe area */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </div>
    </div>
  )
}
