import { useEffect, useState } from 'react'
import { api, type SourceInfo } from '../api/client'
import { SourceCard } from '../components/SourceCard'
import { ErrorState, EmptyState } from '../components/SharedStates'
import { Compass, Puzzle } from 'lucide-react'

export function SourcesPage() {
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

  if (loading) return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
        <h2 className="font-semibold text-sm text-text">Sources</h2>
      </div>
      <div className="space-y-2.5 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl bg-surface border border-border-light p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-hover" />
              <div className="flex-1">
                <div className="h-3 bg-surface-hover rounded w-24 mb-1" />
                <div className="h-2 bg-surface-hover rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  if (error) return <ErrorState message={error} onRetry={load} />
  if (sources.length === 0) return (
    <EmptyState
      icon={<Puzzle className="w-10 h-10 text-text-muted/40" strokeWidth={1} />}
      title="No sources installed"
      description="Add source plugins to start browsing manga and novels from your favorite sites."
      action={{ label: 'Manage Plugins', to: '/plugins' }}
    />
  )

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
        <h2 className="font-semibold text-sm text-text">Sources</h2>
        <span className="text-[11px] text-text-muted bg-surface px-2 py-0.5 rounded-full ml-auto">
          {sources.length}
        </span>
      </div>
      <div className="space-y-2.5">
        {sources.map((src) => (
          <SourceCard key={src.id} {...src} />
        ))}
      </div>
    </div>
  )
}
