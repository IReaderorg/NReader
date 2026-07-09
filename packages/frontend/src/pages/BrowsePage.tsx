import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'

export function BrowsePage() {
  const { sourceId } = useParams<{ sourceId: string }>()
  const [manga, setManga] = useState<MangaSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!sourceId) return
    setLoading(true)
    setError(null)
    api.getPopular(sourceId, page)
      .then(setManga)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [sourceId, page])

  if (loading) return <SkeletonGrid />
  if (error) return <ErrorState message={error} onRetry={() => setPage(p=>p)} />
  if (manga.length === 0) return <div className="text-center py-12 text-muted-foreground">No manga found</div>

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{sourceId} · Popular</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {manga.map((m) => (
          <Link key={m.id} to={`/sources/${sourceId}/manga/${encodeURIComponent(m.id)}`}
            className="group">
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-2">
              <img src={m.coverUrl} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/350x500?text=No+Cover' }} />
            </div>
            <h3 className="text-sm font-medium line-clamp-2">{m.title}</h3>
            {m.author && <p className="text-xs text-muted-foreground">{m.author}</p>}
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
          className="px-4 py-2 bg-secondary rounded-md disabled:opacity-50">Previous</button>
        <span className="py-2 text-muted-foreground">Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-secondary rounded-md">Next</button>
      </div>
    </div>
  )
}

function SkeletonGrid() {
  return <div className="max-w-6xl mx-auto"><h1 className="text-2xl font-bold mb-4 animate-pulse bg-muted rounded w-32 h-8"/><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">{Array.from({length:10}).map((_,i)=><div key={i}><div className="aspect-[3/4] bg-muted rounded-lg mb-2 animate-pulse"/><div className="h-3 bg-muted rounded w-24 animate-pulse"/></div>)}</div></div>
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="max-w-4xl mx-auto text-center py-12"><p className="text-destructive mb-4">{message}</p><button onClick={onRetry} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Retry</button></div>
}
