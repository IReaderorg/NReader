import { useEffect, useState } from 'react'
import { api, type SourceInfo } from '../api/client'
import { LoadingState, ErrorState, EmptyState } from '../components/SharedStates'
import { Power, Settings2, Link } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'

export function SourceManagerPage() {
  const [sources, setSources] = useState<SourceInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    setError(null)
    api.getSources()
      .then(setSources)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  if (loading) return <LoadingState message="Loading sources…" />
  if (error) return <ErrorState message={error} onRetry={load} />
  if (sources.length === 0) return (
    <EmptyState
      title="No sources installed"
      description="Install source plugins from the Plugin Manager to see them here."
      action={{ label: 'Open Plugin Manager', to: '/plugins' }}
    />
  )

  return (
    <div>
      <h1 className="text-base font-bold text-text mb-4">Source Manager</h1>
      <div className="space-y-2">
        {sources.map((src) => (
          <div
            key={src.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:border-accent/20 transition-colors"
          >
            {/* Source icon */}
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Link className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            </div>

            {/* Source info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text">{src.name}</p>
              <p className="text-[11px] text-text-muted truncate">
                {src.baseUrl} • {src.lang.toUpperCase()} • v{src.version}
              </p>
              {/* Capabilities */}
              <div className="flex gap-1 mt-1 flex-wrap">
                {src.capabilities?.map((cap) => (
                  <span key={cap} className="text-[9px] text-text-muted/60 bg-surface-hover px-1.5 py-0.5 rounded">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <RouterLink
                to={`/sources/${src.id}`}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                title="Browse"
              >
                <Settings2 className="w-4 h-4" strokeWidth={1.5} />
              </RouterLink>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                title="Disable source"
              >
                <Power className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
