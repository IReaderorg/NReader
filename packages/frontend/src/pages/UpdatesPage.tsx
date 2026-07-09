import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { api, type LibraryEntry } from '../api/client'
import { RefreshCw, BookOpen, ChevronRight, AlertCircle, Loader2 } from 'lucide-react'

interface UpdateItem {
  entry: LibraryEntry
  newChapters: number
  totalChapters: number
  checkedAt: string
}

export function UpdatesPage() {
  const [items, setItems] = useState<UpdateItem[]>([])
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkUpdates = useCallback(async () => {
    setError(null)
    setChecking(true)
    try {
      const library = await api.getLibrary()
      if (library.length === 0) {
        setLoading(false)
        setChecking(false)
        setItems([])
        return
      }

      const results: UpdateItem[] = []
      // Check each manga in batches of 3
      const batchSize = 3
      for (let i = 0; i < library.length; i += batchSize) {
        const batch = library.slice(i, i + batchSize)
        const batchResults = await Promise.allSettled(
          batch.map(async (entry) => {
            const chapters = await api.getChapters(entry.sourceId, entry.mangaId)
            const totalChapters = chapters.length
            const newChapters = Math.max(0, totalChapters - (entry.chaptersRead || 0))
            return { entry, newChapters, totalChapters, checkedAt: new Date().toISOString() } as UpdateItem
          })
        )
        for (const result of batchResults) {
          if (result.status === 'fulfilled') {
            results.push(result.value)
          }
        }
      }
      // Sort: manga with new chapters first, then by most recently added
      results.sort((a, b) => {
        if (a.newChapters > 0 && b.newChapters === 0) return -1
        if (a.newChapters === 0 && b.newChapters > 0) return 1
        return new Date(b.entry.dateAdded).getTime() - new Date(a.entry.dateAdded).getTime()
      })
      setItems(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check updates')
    } finally {
      setLoading(false)
      setChecking(false)
    }
  }, [])

  useEffect(() => {
    checkUpdates()
  }, [checkUpdates])

  if (loading && checking) return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-accent animate-spin mb-3" strokeWidth={1.5} />
      <p className="text-xs text-text-muted">Checking for updates…</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-9 h-9 text-danger mb-3" strokeWidth={1.5} />
      <p className="text-sm text-danger mb-4">{error}</p>
      <button
        onClick={checkUpdates}
        className="px-4 py-2 bg-accent text-black rounded-lg text-sm font-semibold hover:opacity-90"
      >
        Retry
      </button>
    </div>
  )

  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20">
      <RefreshCw className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
      <h2 className="font-semibold text-sm text-text mb-1">Updates</h2>
      <p className="text-xs text-text-secondary text-center max-w-xs">
        Add manga to your library first, then new chapters will appear here.
      </p>
      <Link
        to="/sources"
        className="mt-4 px-4 py-2 bg-accent text-black rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Browse Sources
      </Link>
    </div>
  )

  const hasUpdates = items.some(item => item.newChapters > 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
        <h2 className="font-semibold text-sm text-text">Updates</h2>
        {hasUpdates && (
          <span className="text-[11px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium ml-auto">
            {items.filter(i => i.newChapters > 0).length} new
          </span>
        )}
        <button
          onClick={checkUpdates}
          disabled={checking}
          className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors disabled:opacity-40"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-text-muted ${checking ? 'animate-spin' : ''}`} strokeWidth={1.5} />
        </button>
      </div>

      {/* Checking indicator */}
      {checking && (
        <div className="flex items-center gap-2 px-3 py-2 mb-3 bg-surface/50 rounded-lg">
          <Loader2 className="w-3 h-3 text-accent animate-spin" strokeWidth={2} />
          <span className="text-[11px] text-text-muted">Checking sources…</span>
        </div>
      )}

      {/* Updates list */}
      <div className="space-y-1.5">
        {items.map((item) => (
          <Link
            key={item.entry.id}
            to={`/sources/${item.entry.sourceId}/manga/${encodeURIComponent(item.entry.mangaId)}`}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors hover:bg-surface-hover ${
              item.newChapters > 0 ? 'bg-accent/5 border border-accent/10' : 'bg-surface/30'
            }`}
          >
            {/* Cover thumbnail */}
            <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 bg-surface ring-1 ring-border-light/50">
              {item.entry.coverUrl ? (
                <img
                  src={item.entry.coverUrl}
                  alt={item.entry.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"><rect fill="%2318181a" width="3" height="4"/><text x="1.5" y="2" text-anchor="middle" fill="%23666" font-size="0.3">?</text></svg>'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-text-muted" strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-text truncate">{item.entry.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                {item.newChapters > 0 ? (
                  <span className="text-[11px] text-accent font-semibold bg-accent/10 px-1.5 py-0.5 rounded-full">
                    {item.newChapters} new chapter{item.newChapters > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className="text-[11px] text-text-muted">Up to date</span>
                )}
                <span className="text-[10px] text-text-muted/60">
                  {item.totalChapters} chapters
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-text-muted shrink-0" strokeWidth={1.5} />
          </Link>
        ))}
      </div>

      {/* Summary */}
      <p className="text-[11px] text-text-muted/50 text-center mt-4">
        {items.length} manga tracked • {items.filter(i => i.newChapters > 0).length} with updates
      </p>
    </div>
  )
}
