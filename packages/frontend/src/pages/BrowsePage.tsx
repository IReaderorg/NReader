import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'
import { MangaCard } from '../components/MangaCard'
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'

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
  if (error) return <ErrorState message={error} onRetry={() => setPage(p => p)} />
  if (manga.length === 0) return <EmptyState />

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {manga.map((m) => (
          <MangaCard
            key={m.id}
            id={m.id}
            title={m.title}
            coverUrl={m.coverUrl}
            author={m.author}
            sourceId={sourceId!}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 mt-6 mb-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border-light bg-surface text-text-secondary disabled:opacity-30 hover:bg-surface-hover transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <span className="text-xs font-medium tabular-nums text-text-secondary bg-surface px-3 py-1 rounded-lg border border-border-light">
          {page}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border-light bg-surface text-text-secondary hover:bg-surface-hover transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-surface rounded-lg ring-1 ring-border-light/50" />
          <div className="h-3 bg-surface rounded mt-1.5 w-3/4" />
        </div>
      ))}
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-9 h-9 text-danger mb-3" strokeWidth={1.5} />
      <p className="text-sm text-danger mb-4 text-center">{message}</p>
      <button onClick={onRetry} className="px-4 py-2 bg-accent text-black rounded-lg text-sm font-semibold hover:opacity-90">
        Retry
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-sm text-text-secondary">No manga found</p>
    </div>
  )
}
