import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'
import { LoadingState, ErrorState, EmptyState } from '../components/SharedStates'
import { ChevronLeft, ChevronRight, BookOpen, TrendingUp, Clock, Tags, ChevronDown } from 'lucide-react'
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

  useEffect(() => { load() }, [sourceId, page])

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
  }, [])

  const handleGenreClick = (genre: string) => {
    addBrowseHistory(genre)
    navigate(`/search/${sourceId}?genre=${encodeURIComponent(genre)}`)
  }

  if (!sourceId) return (
    <div>
      {/* Category/genre pills at top */}
      <h2 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
        <Tags className="w-4 h-4 text-accent" /> Genres
      </h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((g) => (
          <button key={g} onClick={() => handleGenreClick(g)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border-light text-xs text-text-secondary hover:bg-surface-hover hover:text-text hover:border-accent/30 transition-all">
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
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface mb-1.5">
                <img src={m.coverUrl} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-[11px] font-medium text-text truncate">{m.title}</p>
              {m.author && <p className="text-[9px] text-text-muted truncate">{m.author}</p>}
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-accent" /> Recent Updates
      </h2>
      <div className="space-y-1">
        {recentUpdates.slice(0, 15).map((u) => (
          <UpdateRow key={`${u.sourceId}-${u.mangaId}-${u.chapterNumber}`} entry={u} />
        ))}
      </div>
    </div>
  )

  if (loading) return <LoadingState message="Loading manga…" />
  if (error) return <ErrorState message={error} onRetry={load} />
  if (manga.length === 0) return (
    <EmptyState icon={<BookOpen className="w-10 h-10 text-text-muted/40" strokeWidth={1} />}
      title="No manga found" description="Try searching for something else or check back later." />
  )

  return (
    <div>
      {/* Results as clean list items (not cards) */}
      <div className="space-y-0.5">
        {manga.map((m) => (
          <div key={m.id}
            onClick={() => navigate(`/sources/${sourceId}/manga/${encodeURIComponent(m.id)}`)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface transition-colors cursor-pointer">
            <div className="w-10 h-14 shrink-0 rounded-md overflow-hidden bg-surface ring-1 ring-border-light/50">
              <img src={m.coverUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text truncate">{m.title}</p>
              {m.author && <p className="text-[10px] text-text-muted truncate">{m.author}</p>}
              <p className="text-[9px] text-text-muted/60">Updated recently</p>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted/40 shrink-0" strokeWidth={1.5} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 mt-6 mb-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border-light bg-surface text-text-secondary disabled:opacity-30 hover:bg-surface-hover transition-colors">
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <span className="text-xs font-medium tabular-nums text-text-secondary bg-surface px-3 py-1 rounded-lg border border-border-light">{page}</span>
        <button onClick={() => setPage(p => p + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border-light bg-surface text-text-secondary hover:bg-surface-hover transition-colors">
          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

function UpdateRow({ entry }: { entry: UpdateEntry }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
      <img src={entry.coverUrl} alt="" className="w-10 h-14 object-cover rounded shrink-0" loading="lazy" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text truncate">{entry.title}</p>
        <p className="text-[10px] text-text-muted mt-0.5">{entry.sourceName} · Ch. {entry.chapterNumber}{entry.chapterTitle ? ` — ${entry.chapterTitle}` : ''}</p>
        <p className="text-[10px] text-text-muted/60">{new Date(entry.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}


