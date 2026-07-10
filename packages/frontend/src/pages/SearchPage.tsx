import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'
import { MangaCard } from '../components/MangaCard'
import { Search, Loader2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { useExploreStore } from '../store/explore-store'

const STATUS_OPTIONS = ['ongoing', 'completed', 'hiatus', 'cancelled']

const CURRENT_YEAR = new Date().getFullYear()

export function SearchPage() {
  const { sourceId } = useParams<{ sourceId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [results, setResults] = useState<MangaSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(!!searchParams.get('genre') || !!searchParams.get('status'))
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  const { genres, searchFilters, setSearchFilters, resetSearchFilters } = useExploreStore()

  // Sync URL params to filters on mount
  useEffect(() => {
    const g = searchParams.get('genre')
    const s = searchParams.get('status')
    const yf = searchParams.get('yearFrom')
    const yt = searchParams.get('yearTo')
    setSearchFilters({
      genre: g ?? undefined,
      status: s ?? undefined,
      yearFrom: yf ? Number(yf) : undefined,
      yearTo: yt ? Number(yt) : undefined,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const q = query.trim()
    const hasFilters = searchFilters.genre || searchFilters.status || searchFilters.yearFrom || searchFilters.yearTo
    if (!q && !hasFilters) { setResults([]); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams()
        if (q) params.set('q', q)
        params.set('page', '1')
        if (searchFilters.genre) params.set('genre', searchFilters.genre)
        if (searchFilters.status) params.set('status', searchFilters.status)
        if (searchFilters.yearFrom) params.set('yearFrom', String(searchFilters.yearFrom))
        if (searchFilters.yearTo) params.set('yearTo', String(searchFilters.yearTo))
        // For now, use search endpoint with query param; backend may refine later
        const data = q ? await api.search(sourceId!, q, 1) : []
        setResults(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, searchFilters, sourceId])

  const applyFilters = (filters: typeof searchFilters) => {
    setSearchFilters(filters)
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (filters.genre) params.set('genre', filters.genre)
    if (filters.status) params.set('status', filters.status)
    if (filters.yearFrom) params.set('yearFrom', String(filters.yearFrom))
    if (filters.yearTo) params.set('yearTo', String(filters.yearTo))
    setSearchParams(params, { replace: true })
  }

  const resetFilters = () => {
    resetSearchFilters()
    setShowAdvanced(false)
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search manga..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl text-sm text-text placeholder:text-text-muted/60 border border-border-light focus:outline-none focus:border-accent/50 transition-colors"
          autoFocus
        />
      </div>

      {/* Advanced filters toggle */}
      <button
        onClick={() => setShowAdvanced(v => !v)}
        className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text mb-3 transition-colors"
      >
        {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        Advanced Filters
        {(searchFilters.genre || searchFilters.status || searchFilters.yearFrom || searchFilters.yearTo) && (
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        )}
      </button>

      {showAdvanced && (
        <div className="mb-4 p-3 rounded-xl bg-surface border border-border-light space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1.5 block">Genre</label>
            <select
              value={searchFilters.genre ?? ''}
              onChange={(e) => applyFilters({ ...searchFilters, genre: e.target.value || undefined })}
              className="w-full bg-surface border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1.5 block">Status</label>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => applyFilters({ ...searchFilters, status: searchFilters.status === s ? undefined : s })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors capitalize ${
                    searchFilters.status === s
                      ? 'bg-accent text-black border-accent'
                      : 'bg-surface text-text-secondary border-border-light hover:border-accent/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1.5 block">Year From</label>
              <input
                type="number"
                min={1970}
                max={CURRENT_YEAR}
                value={searchFilters.yearFrom ?? ''}
                onChange={(e) => applyFilters({ ...searchFilters, yearFrom: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="1970"
                className="w-full bg-surface border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1.5 block">Year To</label>
              <input
                type="number"
                min={1970}
                max={CURRENT_YEAR}
                value={searchFilters.yearTo ?? ''}
                onChange={(e) => applyFilters({ ...searchFilters, yearTo: e.target.value ? Number(e.target.value) : undefined })}
                placeholder={String(CURRENT_YEAR)}
                className="w-full bg-surface border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text"
              />
            </div>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset Filters
          </button>
        </div>
      )}

      {/* Quick filter chips */}
      {query && !loading && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => applyFilters({ ...searchFilters, status: searchFilters.status === s ? undefined : s })}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border capitalize transition-colors ${
                searchFilters.status === s
                  ? 'bg-accent text-black border-accent'
                  : 'bg-surface text-text-secondary border-border-light hover:border-accent/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 text-accent animate-spin" strokeWidth={1.5} />
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-sm text-danger">{error}</p>
        </div>
      )}

      {!loading && !error && results.length === 0 && (query || searchFilters.genre) && (
        <div className="text-center py-12">
          <Search className="w-8 h-8 text-text-muted/30 mx-auto mb-2" strokeWidth={1} />
          <p className="text-sm text-text-secondary">No results for "{query}"</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {results.map((m) => (
            <MangaCard
              key={m.id}
              id={m.id}
              title={m.title}
              coverUrl={m.coverUrl}
              sourceId={sourceId!}
            />
          ))}
        </div>
      )}
    </div>
  )
}
