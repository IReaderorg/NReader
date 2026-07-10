import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type MangaDetail } from '../api/client'
import { BookOpen, ArrowUpDown, AlertCircle, Star, ArrowRightLeft, Download, Heart, Image } from 'lucide-react'

export function MangaDetailPage() {
  const { sourceId, mangaId } = useParams<{ sourceId: string; mangaId: string }>()
  const navigate = useNavigate()
  const [manga, setManga] = useState<MangaDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [activeTab, setActiveTab] = useState<'chapters' | 'details' | 'related'>('chapters')

  // Migration state
  const [showMigration, setShowMigration] = useState(false)
  const [migrationQuery, setMigrationQuery] = useState('')
  const [migrationTargets, setMigrationTargets] = useState<Array<{ sourceId: string; sourceName: string; mangaId: string; title: string; coverUrl: string; matchScore: number }>>([])
  const [migrationLoading, setMigrationLoading] = useState(false)

  useEffect(() => {
    if (!sourceId || !mangaId) return
    setLoading(true)
    setError(null)
    api.getDetail(sourceId, mangaId)
      .then(setManga)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [sourceId, mangaId])

  const handleMigrate = useCallback(async (targetSourceId: string, targetMangaId: string) => {
    if (!sourceId || !mangaId) return
    try {
      await api.migrateManga({ sourceId, mangaId, targetSourceId, targetMangaId })
      navigate(`/manga/${targetSourceId}/${encodeURIComponent(targetMangaId)}`)
    } catch (err) {
      alert(`Migration failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [sourceId, mangaId, navigate])

  const searchMigrationTargets = useCallback(async () => {
    if (!manga) return
    const query = migrationQuery || manga.title
    setMigrationLoading(true)
    try {
      const results = await api.getMigrationTargets(query, sourceId)
      setMigrationTargets(results)
    } catch {
      setMigrationTargets([])
    } finally {
      setMigrationLoading(false)
    }
  }, [manga, migrationQuery, sourceId])

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
      {/* Hero cover with gradient overlay */}
      <div className="relative -mx-4 -mt-3 mb-4 overflow-hidden">
        <div className="aspect-[3/4] max-h-[240px] overflow-hidden">
          <img
            src={manga.coverUrl}
            alt={manga.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"><rect fill="%2318181a" width="3" height="4"/><text x="1.5" y="2" text-anchor="middle" fill="%23666" font-size="0.3">?</text></svg>'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg))] via-transparent to-transparent" />
      </div>

      {/* Title + metadata */}
      <div className="mb-4">
        <h1 className="font-bold text-lg leading-tight mb-1 text-text">{manga.title}</h1>
        {manga.author && (
          <p className="text-xs text-text-secondary mb-2">{manga.author}</p>
        )}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {manga.status && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              manga.status === 'ongoing' ? 'bg-green-500/10 text-green-400' :
              manga.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
              'bg-amber-500/10 text-amber-400'
            }`}>
              {manga.status}
            </span>
          )}
          {manga.rating ? (
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" strokeWidth={0} />
              {manga.rating}/10
            </span>
          ) : null}
          {manga.genres?.slice(0, 4).map((g) => (
            <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-text-muted border border-border-light font-medium">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mb-4">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-accent text-black text-xs font-semibold hover:brightness-110 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          Download All
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border-light text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
        >
          <Heart className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => navigate(`/character-art/${encodeURIComponent(mangaId!)}`)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border-light text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
          title="Character Art"
        >
          <Image className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-border-light mb-4">
        {(['chapters', 'details', 'related'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 pb-2 text-xs font-medium transition-colors relative capitalize ${
              activeTab === tab ? 'text-accent' : 'text-text-muted hover:text-text'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-accent rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'chapters' && (
        <>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-xs text-text flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              <span>Chapters ({manga.chapters.length})</span>
            </h2>
            <button
              onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text transition-colors"
            >
              <ArrowUpDown className="w-3 h-3" strokeWidth={1.5} />
              {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
            </button>
          </div>

          <div className="space-y-0.5">
            {chapters.map((ch, i) => (
              <div
                key={ch.id}
                onClick={() => navigate(`/reader/${sourceId}/${encodeURIComponent(mangaId!)}/${encodeURIComponent(ch.id)}`)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer active:bg-surface-hover hover:bg-surface-hover"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {ch.read && <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                  <span className={`text-xs truncate ${ch.read ? 'text-text-muted' : 'text-text font-medium'}`}>
                    Ch. {ch.number}{ch.title ? <span className="text-text-muted font-normal"> — {ch.title}</span> : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {ch.downloaded && (
                    <span className="text-[9px] text-accent bg-accent/10 px-1.5 py-0.5 rounded">DL</span>
                  )}
                  {/* Mini progress bar */}
                  <div className="w-16 h-1 rounded-full bg-surface overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: ch.read ? '100%' : ch.downloaded ? '60%' : '0%' }}
                    />
                  </div>
                  {ch.date && (
                    <span className="text-[10px] text-text-muted tabular-nums">
                      {new Date(ch.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <div>
          {manga.description && (
            <p className="text-xs text-text-secondary leading-relaxed mb-4">{manga.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {manga.genres?.map((g) => (
              <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-text-muted border border-border-light font-medium">
                {g}
              </span>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'related' && (
        <p className="text-xs text-text-muted text-center py-8">Related manga will appear here.</p>
      )}

      {/* Migrate button */}
      <button
        onClick={() => { setShowMigration(!showMigration); if (!showMigration) setMigrationQuery(manga.title) }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-light text-xs text-text-secondary hover:text-text hover:bg-surface-hover transition-colors mb-3 mt-3"
      >
        <ArrowRightLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
        Migrate to another source
      </button>

      {showMigration && (
        <div className="mb-4 p-3 rounded-xl bg-surface border border-border-light space-y-2">
          <p className="text-xs font-medium text-text">Source Migration</p>
          <p className="text-[10px] text-text-muted">Find this manga on another source to migrate your library entry.</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={migrationQuery}
              onChange={e => setMigrationQuery(e.target.value)}
              placeholder="Search by title…"
              className="flex-1 bg-surface-hover border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text placeholder:text-text-muted/50 outline-none focus:border-accent/50 transition-colors"
              onKeyDown={e => { if (e.key === 'Enter') searchMigrationTargets() }}
            />
            <button
              onClick={searchMigrationTargets}
              disabled={migrationLoading}
              className="px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors shrink-0"
            >
              {migrationLoading ? '…' : 'Search'}
            </button>
          </div>
          {migrationTargets.length > 0 && (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {migrationTargets.map((target, i) => (
                <div
                  key={`${target.sourceId}-${target.mangaId}-${i}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors"
                  onClick={() => handleMigrate(target.sourceId, target.mangaId)}
                >
                  <div className="w-8 h-11 rounded bg-surface-hover overflow-hidden shrink-0">
                    {target.coverUrl && <img src={target.coverUrl} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text truncate">{target.title}</p>
                    <p className="text-[10px] text-text-muted">{target.sourceName}</p>
                  </div>
                  <span className="text-[10px] text-accent font-medium">{Math.round(target.matchScore * 100)}%</span>
                </div>
              ))}
            </div>
          )}
          {!migrationLoading && migrationTargets.length === 0 && migrationQuery && (
            <p className="text-[10px] text-text-muted text-center py-2">No migration targets found.</p>
          )}
        </div>
      )}
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative -mx-4 -mt-3 mb-4">
        <div className="aspect-[3/4] max-h-[240px] bg-surface" />
      </div>
      <div className="h-4 bg-surface rounded w-3/4 mb-2" />
      <div className="h-3 bg-surface rounded w-1/2 mb-3" />
      <div className="flex gap-1.5 mb-3">
        {[1, 2, 3].map(i => <div key={i} className="h-4 bg-surface rounded-full w-12" />)}
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
