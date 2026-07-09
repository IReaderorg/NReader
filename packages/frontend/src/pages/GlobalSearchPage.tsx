import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api, type MangaSummary, type SourceInfo } from '../api/client'
import { MangaCard } from '../components/MangaCard'
import { LoadingState, ErrorState, EmptyState } from '../components/SharedStates'
import { Search, Globe } from 'lucide-react'

export function GlobalSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [input, setInput] = useState(query)
  const [results, setResults] = useState<Map<string, MangaSummary[]>>(new Map())
  const [sources, setSources] = useState<SourceInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  // Load sources on mount
  useEffect(() => {
    api.getSources().then(setSources).catch(() => {})
  }, [])

  // Search across all sources
  const doSearch = async (q: string) => {
    if (!q.trim()) return
    setLoading(true)
    setError(null)
    setSearched(true)
    const resultsMap = new Map<string, MangaSummary[]>()

    try {
      const allSources = sources.length > 0 ? sources : await api.getSources()
      const promises = allSources.map(async (src) => {
        try {
          const data = await api.search(src.id, q, 1)
          if (data.length > 0) resultsMap.set(src.id, data)
        } catch { /* source unavailable, skip */ }
      })
      await Promise.allSettled(promises)
      setResults(resultsMap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  // Search when query param changes
  useEffect(() => {
    if (query) {
      setInput(query)
      doSearch(query)
    }
  }, [query, sources]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams(input ? { q: input } : {})
  }

  const totalResults = Array.from(results.values()).reduce((sum, items) => sum + items.length, 0)

  return (
    <div>
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" strokeWidth={1.5} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search across all sources…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface border border-border-light text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
            autoFocus
          />
        </div>
      </form>

      {/* Loading */}
      {loading && <LoadingState message="Searching all sources…" />}

      {/* Error */}
      {error && <ErrorState message={error} onRetry={() => doSearch(input)} />}

      {/* Empty */}
      {!loading && searched && totalResults === 0 && (
        <EmptyState
          icon={<Globe className="w-10 h-10 text-text-muted/40" strokeWidth={1} />}
          title="No results found"
          description={`No results for "${query}" across ${sources.length} sources. Try a different search term.`}
        />
      )}

      {/* Results by source */}
      {!loading && totalResults > 0 && (
        <div className="space-y-6">
          <p className="text-xs text-text-muted">
            {totalResults} result{totalResults !== 1 ? 's' : ''} across {results.size} source{results.size !== 1 ? 's' : ''}
          </p>
          {Array.from(results.entries()).map(([sourceId, items]) => {
            const src = sources.find(s => s.id === sourceId)
            return (
              <div key={sourceId}>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {src?.name || sourceId}
                  </h3>
                  <span className="text-[10px] text-text-muted">{items.length}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {items.map((m) => (
                    <MangaCard
                      key={m.id}
                      id={m.id}
                      title={m.title}
                      coverUrl={m.coverUrl}
                      author={m.author}
                      sourceId={sourceId}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
