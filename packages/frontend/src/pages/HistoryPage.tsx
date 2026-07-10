import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useHistoryStore } from '../store/history-store'
import { api } from '../api/client'
import { History, Clock, ChevronRight, Trash2, Search, BookOpen } from 'lucide-react'

export function HistoryPage() {
  const { entries, loading, error, fetchHistory, clearMangaHistory } = useHistoryStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [continueReading, setContinueReading] = useState<Array<{ mangaId: string; sourceId: string; chapterId: string; chapterNumber: number; chapterTitle?: string; page: number; readAt: string }>>([])
  const [libMap, setLibMap] = useState<Map<string, { title: string; coverUrl: string }>>(new Map())

  useEffect(() => {
    fetchHistory()
    api.getContinueReading().then(setContinueReading).catch(() => {})
    api.getLibrary().then(entries => {
      const map = new Map<string, { title: string; coverUrl: string }>()
      for (const e of entries) map.set(e.mangaId, { title: e.title, coverUrl: e.coverUrl })
      setLibMap(map)
    }).catch(() => {})
  }, [fetchHistory])

  const filtered = useMemo(() => {
    if (!searchQuery) return entries
    const q = searchQuery.toLowerCase()
    return entries.filter(e => {
      const title = libMap.get(e.mangaId)?.title?.toLowerCase() || ''
      return title.includes(q) || e.mangaId.toLowerCase().includes(q) || e.chapterTitle?.toLowerCase().includes(q)
    })
  }, [entries, searchQuery, libMap])

  const grouped = groupByDate(filtered)

  if (loading && entries.length === 0) return <HistorySkeleton />
  if (error) return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-sm text-danger">{error}</p>
      <button onClick={fetchHistory} className="mt-3 text-xs text-accent hover:underline">Retry</button>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-text">History</h1>
          <span className="text-xs text-text-muted">{entries.length} entries</span>
        </div>
        {entries.length > 0 && (
          <button
            onClick={() => {
              const mangaIds = [...new Set(entries.map(e => e.mangaId))]
              mangaIds.forEach(id => clearMangaHistory(id))
            }}
            className="flex items-center gap-1 text-[11px] text-text-muted hover:text-danger transition-colors"
          >
            <Trash2 className="w-3 h-3" strokeWidth={1.5} />
            Clear All
          </button>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by manga title…"
          className="w-full bg-surface border border-border-light rounded-xl pl-9 pr-3 py-2.5 text-xs text-text outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted/50"
        />
      </div>

      {continueReading.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-text flex items-center gap-1.5 mb-2 px-1">
            <BookOpen className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Continue Reading
          </h2>
          <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {continueReading.slice(0, 8).map(entry => {
              const lib = libMap.get(entry.mangaId)
              const pct = Math.round((entry.page / Math.max(entry.page + 10, 20)) * 100)
              return (
                <Link
                  key={`${entry.mangaId}-${entry.chapterId}`}
                  to={`/reader/${entry.sourceId}/${encodeURIComponent(entry.mangaId)}/${encodeURIComponent(entry.chapterId)}`}
                  className="flex-shrink-0 w-36 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
                >
                  <div className="w-full h-20 rounded-lg overflow-hidden bg-surface mb-2 ring-1 ring-border-light/50">
                    {lib?.coverUrl ? (
                      <img src={lib.coverUrl} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    ) : null}
                  </div>
                  <p className="text-[11px] font-medium text-text truncate">{lib?.title || entry.mangaId}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Ch. {entry.chapterNumber}{entry.chapterTitle ? ` — ${entry.chapterTitle}` : ''}</p>
                  <div className="mt-1.5 w-full bg-surface-hover rounded-full h-1">
                    <div className="bg-accent h-1 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {filtered.length === 0 && !searchQuery && (
        <div className="flex flex-col items-center justify-center py-20">
          <History className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
          <h2 className="font-semibold text-sm text-text mb-1">No reading history yet</h2>
          <p className="text-xs text-text-secondary text-center max-w-xs">Your reading progress will appear here as you read manga.</p>
        </div>
      )}
      {filtered.length === 0 && searchQuery && (
        <div className="flex flex-col items-center justify-center py-20">
          <Search className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
          <p className="text-xs text-text-secondary">No results for "{searchQuery}"</p>
        </div>
      )}

      {Object.entries(grouped).map(([dateLabel, items]) => (
        <div key={dateLabel} className="mb-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2 px-1">
            {dateLabel}
          </h3>
          <div className="space-y-0.5">
            {items.map(entry => {
              const lib = libMap.get(entry.mangaId)
              return (
                <div
                  key={entry.id}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface transition-colors"
                >
                  <div className="w-9 h-12 shrink-0 rounded-md overflow-hidden bg-surface ring-1 ring-border-light/50">
                    {lib?.coverUrl ? (
                      <img src={lib.coverUrl} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text truncate">
                      {lib?.title ? `${lib.title} — ` : ''}Ch. {entry.chapterNumber}{entry.chapterTitle ? ` — ${entry.chapterTitle}` : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-text-muted" strokeWidth={1.5} />
                      <span className="text-[10px] text-text-muted">{formatTimeAgo(entry.readAt)}</span>
                      <span className="text-[10px] text-text-muted">Page {entry.page + 1}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/reader/${entry.sourceId}/${encodeURIComponent(entry.mangaId)}/${encodeURIComponent(entry.chapterId)}`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-[11px] font-medium hover:bg-accent/20 transition-colors"
                    >
                      Continue
                      <ChevronRight className="w-3 h-3" strokeWidth={2} />
                    </Link>
                    <button
                      onClick={() => clearMangaHistory(entry.mangaId)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return `${diffHrs}h ago`
  const diffDays = Math.floor(diffHrs / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function groupByDate<T extends { readAt: string }>(entries: T[]): Record<string, T[]> {
  const groups: Record<string, typeof entries> = {}
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  for (const entry of entries) {
    const date = new Date(entry.readAt).toDateString()
    let label: string
    if (date === today) label = 'Today'
    else if (date === yesterday) label = 'Yesterday'
    else label = new Date(entry.readAt).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })

    if (!groups[label]) groups[label] = []
    groups[label]!.push(entry)
  }
  return groups
}

function HistorySkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-9 h-12 rounded-md bg-surface" />
          <div className="flex-1">
            <div className="h-3 bg-surface rounded w-1/3 mb-1" />
            <div className="h-2 bg-surface rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
