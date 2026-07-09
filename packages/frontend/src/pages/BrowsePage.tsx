import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'
import { MangaCard } from '../components/MangaCard'
import { LoadingState, ErrorState, EmptyState } from '../components/SharedStates'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'

export function BrowsePage() {
  const { sourceId } = useParams<{ sourceId: string }>()
  const [manga, setManga] = useState<MangaSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const load = () => {
    if (!sourceId) return
    setLoading(true)
    setError(null)
    api.getPopular(sourceId, page)
      .then(setManga)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [sourceId, page]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <LoadingState message="Loading manga…" />
  if (error) return <ErrorState message={error} onRetry={load} />
  if (manga.length === 0) return (
    <EmptyState
      icon={<BookOpen className="w-10 h-10 text-text-muted/40" strokeWidth={1} />}
      title="No manga found"
      description="Try searching for something else or check back later."
    />
  )

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


