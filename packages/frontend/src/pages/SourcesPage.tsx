import { useEffect, useState } from 'react'
import { api, type SourceInfo } from '../api/client'
import { SourceCard } from '../components/SourceCard'
import { Compass, AlertCircle } from 'lucide-react'

export function SourcesPage() {
  const [sources, setSources] = useState<SourceInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getSources()
      .then(setSources)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={() => { setLoading(true); setError(null); api.getSources().then(setSources).catch(setError).finally(() => setLoading(false)) }} />
  if (sources.length === 0) return <EmptyState />

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

function LoadingState() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
        <h2 className="font-semibold text-sm text-text">Sources</h2>
      </div>
      <div className="space-y-2.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl bg-surface border border-border-light p-4 animate-pulse">
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
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-9 h-9 text-danger mb-3" strokeWidth={1.5} />
      <p className="text-sm text-danger mb-4">{message}</p>
      <button onClick={onRetry} className="px-4 py-2 bg-accent text-black rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
        Retry
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Compass className="w-9 h-9 text-text-muted mb-3" strokeWidth={1.5} />
      <h2 className="font-semibold text-sm text-text mb-1">No sources installed</h2>
      <p className="text-xs text-text-secondary text-center max-w-xs">
        Drop a .js plugin file in the plugins/ directory and it will appear here.
      </p>
    </div>
  )
}
