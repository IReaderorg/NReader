import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, type MangaDetail } from '../api/client'
import { BookOpen, ArrowUpDown, AlertCircle, Star } from 'lucide-react'

export function MangaDetailPage() {
  const { sourceId, mangaId } = useParams<{ sourceId: string; mangaId: string }>()
  const [manga, setManga] = useState<MangaDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    if (!sourceId || !mangaId) return
    setLoading(true)
    setError(null)
    api.getDetail(sourceId, mangaId)
      .then(setManga)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [sourceId, mangaId])

  if (loading) return <DetailSkeleton />
  if (error) return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-9 h-9 text-danger mb-3" strokeWidth={1.5} />
      <p className="text-sm text-danger">{error}</p>
    </div>
  )
  if (!manga) return null

  const chapters = [...manga.chapters].sort((a, b) =>
    sortOrder === 'asc' ? a.number - b.number : b.number - a.number
  )

  return (
    <div>
      {/* Cover + Info */}
      <div className="flex gap-4 mb-5">
        <div className="w-24 md:w-28 shrink-0">
          <div className="aspect-[3/4] bg-surface rounded-lg overflow-hidden ring-1 ring-border-light/50">
            <img
              src={manga.coverUrl}
              alt={manga.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"><rect fill="%2318181a" width="3" height="4"/><text x="1.5" y="2" text-anchor="middle" fill="%23666" font-size="0.3">?</text></svg>'
              }}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <h1 className="font-bold text-base leading-tight mb-1 text-text">{manga.title}</h1>
          {manga.author && (
            <p className="text-xs text-text-secondary mb-2">{manga.author}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {manga.genres?.slice(0, 4).map((g) => (
              <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-text-muted border border-border-light font-medium">
                {g}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            {manga.status && (
              <span className={`px-2 py-0.5 rounded-full font-medium ${
                manga.status === 'ongoing' ? 'bg-green-500/10 text-green-400' :
                manga.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
                'bg-amber-500/10 text-amber-400'
              }`}>
                {manga.status}
              </span>
            )}
            {manga.rating ? (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" strokeWidth={0} />
                <span className="text-text-muted">{manga.rating}/10</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Description */}
      {manga.description && (
        <p className="text-xs text-text-secondary leading-relaxed mb-5 line-clamp-3">
          {manga.description}
        </p>
      )}

      {/* Chapters header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-xs text-text flex items-center gap-1.5 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
          <span>Chapters</span>
          <span className="text-text-muted font-normal normal-case tracking-normal">
            ({manga.chapters.length})
          </span>
        </h2>
        <button
          onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text transition-colors"
        >
          <ArrowUpDown className="w-3 h-3" strokeWidth={1.5} />
          {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
        </button>
      </div>

      {/* Chapter list */}
      <div className="space-y-0.5">
        {chapters.map((ch, i) => (
          <div
            key={ch.id}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer active:bg-surface-hover ${
              i % 2 === 0 ? 'bg-surface/50' : 'bg-transparent'
            } hover:bg-surface-hover`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {ch.read && <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
              <span className={`text-xs truncate ${ch.read ? 'text-text-muted' : 'text-text font-medium'}`}>
                Ch. {ch.number}{ch.title ? <span className="text-text-muted font-normal"> — {ch.title}</span> : ''}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {ch.downloaded && (
                <span className="text-[9px] text-text-muted bg-surface px-1.5 py-0.5 rounded">DL</span>
              )}
              {ch.date && (
                <span className="text-[10px] text-text-muted tabular-nums">
                  {new Date(ch.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-4 mb-5">
        <div className="w-24 md:w-28 aspect-[3/4] rounded-lg bg-surface" />
        <div className="flex-1">
          <div className="h-4 bg-surface rounded w-3/4 mb-2" />
          <div className="h-3 bg-surface rounded w-1/2 mb-3" />
          <div className="flex gap-1.5 mb-3">
            {[1, 2, 3].map(i => <div key={i} className="h-4 bg-surface rounded-full w-12" />)}
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-5">
        <div className="h-2 bg-surface rounded w-full" />
        <div className="h-2 bg-surface rounded w-5/6" />
      </div>
      <div className="h-3 bg-surface rounded w-20 mb-3" />
      <div className="space-y-0.5">
        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 bg-surface rounded-lg" />)}
      </div>
    </div>
  )
}
