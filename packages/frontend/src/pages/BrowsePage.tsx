import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'
import { MangaCard } from '../components/MangaCard'
import { LoadingState, ErrorState, EmptyState } from '../components/SharedStates'
import { ChevronLeft, ChevronRight, BookOpen, TrendingUp, Clock, Tags } from 'lucide-react'
import { useExploreStore, type UpdateEntry } from '../store/explore-store'

const GENRE_EMOJIS: Record<string, string> = {
  Action: '⚔️', Adventure: '🗺️', Comedy: '😂', Drama: '🎭',
  Fantasy: '🧙', Horror: '👻', Mystery: '🔍', Romance: '💕',
  'Sci-Fi': '🚀', 'Slice of Life': '☕', Sports: '🏀', Supernatural: '👁️',
  Thriller: '🔪', 'Martial Arts': '🥋', Mecha: '🤖', Psychological: '🧠',
  Historical: '🏛️', Harem: '👥', 'School Life': '📚', Shounen: '🔥',
  Shoujo: '✨', Seinen: '🎯', Josei: '🌸', Isekai: '🌍',
}

export function BrowsePage() {
  const { sourceId } = useParams<{ sourceId: string }>()
  const navigate = useNavigate()
  const [manga, setManga] = useState<MangaSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const {
    genres, setGenres, trending, setTrending,
    recentUpdates, setRecentUpdates, addBrowseHistory,
    setLoading: setExploreLoading,
  } = useExploreStore()

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

  useEffect(() => {
    if (genres.length === 0) {
      setExploreLoading('genres', true)
      api.getGenres().then(setGenres).finally(() => setExploreLoading('genres', false))
    }
    if (trending.length === 0) {
      setExploreLoading('trending', true)
      api.getTrending().then(setTrending).finally(() => setExploreLoading('trending', false))
    }
    if (recentUpdates.length === 0) {
      setExploreLoading('updates', true)
      api.getUpdates().then(setRecentUpdates).finally(() => setExploreLoading('updates', false))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleGenreClick = (genre: string) => {
    addBrowseHistory(genre)
    navigate(`/search/${sourceId}?genre=${encodeURIComponent(genre)}`)
  }

  if (!sourceId) return (
    <div>
      <h2 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
        <Tags className="w-4 h-4 text-accent" /> Genres
      </h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => handleGenreClick(g)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border-light text-xs text-text-secondary hover:bg-surface-hover hover:text-text hover:border-accent/30 transition-all"
          >
            <span>{GENRE_EMOJIS[g] ?? '📖'}</span> {g}
          </button>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-accent" /> Trending
      </h2>
      <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4">
        <div className="flex gap-3 min-w-max">
          {trending.map((m) => (
            <div key={m.id} className="w-28 flex-shrink-0">
              <MangaCard id={m.id} title={m.title} coverUrl={m.coverUrl} author={m.author} sourceId="popular" />
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-accent" /> Recent Updates
      </h2>
      <div className="space-y-2">
        {recentUpdates.slice(0, 15).map((u) => (
          <UpdateRow key={`${u.sourceId}-${u.mangaId}-${u.chapterNumber}`} entry={u} />
        ))}
      </div>
    </div>
  )

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

function UpdateRow({ entry }: { entry: UpdateEntry }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors">
      <img src={entry.coverUrl} alt="" className="w-10 h-14 object-cover rounded" loading="lazy" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text truncate">{entry.title}</p>
        <p className="text-[10px] text-text-muted mt-0.5">
          {entry.sourceName} · Ch. {entry.chapterNumber}{entry.chapterTitle ? ` — ${entry.chapterTitle}` : ''}
        </p>
        <p className="text-[10px] text-text-muted/60">{new Date(entry.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}


