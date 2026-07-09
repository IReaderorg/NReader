import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type SourceInfo } from '../api/client'

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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sources</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sources.map((src) => (
          <Link key={src.id} to={`/sources/${src.id}`}
            className="border rounded-lg p-4 hover:bg-muted transition-colors">
            <h3 className="font-semibold">{src.name}</h3>
            <p className="text-sm text-muted-foreground">{src.lang} · v{src.version}</p>
            <div className="flex gap-1 mt-2 flex-wrap">
              {src.capabilities.map((cap) => (
                <span key={cap} className="text-xs bg-secondary px-1.5 py-0.5 rounded">{cap}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function LoadingState() {
  return <div className="max-w-4xl mx-auto"><h1 className="text-2xl font-bold mb-4">Sources</h1><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{Array.from({length:3},(_,i)=>i).map(i=><div key={i} className="border rounded-lg p-4 animate-pulse"><div className="h-4 bg-muted rounded w-24 mb-2"/><div className="h-3 bg-muted rounded w-16"/></div>)}</div></div>
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="max-w-4xl mx-auto text-center py-12"><p className="text-destructive mb-4">{message}</p><button onClick={onRetry} className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">Retry</button></div>
}

function EmptyState() {
  return <div className="max-w-4xl mx-auto text-center py-12"><h2 className="text-xl font-semibold mb-2">No sources installed</h2><p className="text-muted-foreground mb-4">Add your first source to get started</p><p className="text-sm text-muted-foreground">Drop a .js plugin file in the plugins/ directory and it will appear here automatically.</p></div>
}
