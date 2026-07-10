import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'
import { Search, Loader2, ChevronDown, ChevronUp, RotateCcw, Mic, TrendingUp, Clock } from 'lucide-react'
import { useExploreStore } from '../store/explore-store'

const STATUS_OPTIONS = ['ongoing', 'completed', 'hiatus', 'cancelled']
const CURRENT_YEAR = new Date().getFullYear()

const RECENT_SEARCHES = ['Solo Leveling', 'One Piece', 'Berserk', 'Jujutsu Kaisen', 'Attack on Titan']
const TRENDING_SEARCHES = ['Omniscient Reader', 'The Beginning After the End', 'Tower of God', 'Nano Machine', 'Second Life Ranker']

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
  }, [])

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

  const noQueryYet = !query.trim() && !searchFilters.genre && !searchFilters.status

  return (
    <div>
      {/* Prominent search bar with voice */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search manga..."
          className="w-full pl-10 pr-12 py-3 bg-surface rounded-2xl text-sm text-text placeholder:text-text-muted/60 border-2 border-border-light focus:border-accent/50 focus:outline-none transition-colors shadow-soft"
          autoFocus
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors">
          <Mic className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Recent searches */}
      {noQueryYet && !loading && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-text flex items-center gap-1.5 mb-2">
            <Clock className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {RECENT_SEARCHES.map(s => (
              <button key={s} onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-full bg-surface border border-border-light text-[11px] text-text-secondary hover:bg-surface-hover hover:text-text transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trending searches */}
      {noQueryYet && !loading && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-text flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Trending
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {TRENDING_SEARCHES.map((s, i) => (
              <button key={s} onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-[11px] text-accent hover:bg-accent/10 transition-all">
                #{i + 1} {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced filters toggle */}
      <button onClick={() => setShowAdvanced(v => !v)}
        className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text mb-3 transition-colors">
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
            <select value={searchFilters.genre ?? ''}
              onChange={(e) => applyFilters({ ...searchFilters, genre: e.target.value || undefined })}
              className="w-full bg-surface border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text">
              <option value="">All Genres</option>
              {genres.map((g) => (<option key={g} value={g}>{g}</option>))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1.5 block">Status</label>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_OPTIONS.map((s) => (
                <button key={s}
                  onClick={() => applyFilters({ ...searchFilters, status: searchFilters.status === s ? undefined : s })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors capitalize ${searchFilters.status === s ? 'bg-accent text-black border-accent' : 'bg-surface text-text-secondary border-border-light hover:border-accent/30'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1.5 block">Year From</label>
              <input type="number" min={1970} max={CURRENT_YEAR} value={searchFilters.yearFrom ?? ''}
                onChange={(e) => applyFilters({ ...searchFilters, yearFrom: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="1970" className="w-full bg-surface border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text" />
            </div>
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1.5 block">Year To</label>
              <input type="number" min={1970} max={CURRENT_YEAR} value={searchFilters.yearTo ?? ''}
                onChange={(e) => applyFilters({ ...searchFilters, yearTo: e.target.value ? Number(e.target.value) : undefined })}
                placeholder={String(CURRENT_YEAR)} className="w-full bg-surface border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text" />
            </div>
          </div>
          <button onClick={resetFilters} className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset Filters
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 text-accent animate-spin" strokeWidth={1.5} />
        </div>
      )}

      {error && <div className="text-center py-12"><p className="text-sm text-danger">{error}</p></div>}

      {!loading && !error && results.length === 0 && !noQueryYet && (
        <div className="text-center py-12">
          <Search className="w-8 h-8 text-text-muted/30 mx-auto mb-2" strokeWidth={1} />
          <p className="text-sm text-text-secondary">No results for "{query}"</p>
        </div>
      )}

      {/* Results as clean list items */}
      {!loading && results.length > 0 && (
        <div className="space-y-0.5">
          {results.map((m) => (
            <a key={m.id} href={`/sources/${sourceId}/manga/${encodeURIComponent(m.id)}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface transition-colors">
              <div className="w-10 h-14 rounded-md overflow-hidden bg-surface shrink-0 ring-1 ring-border-light/50">
                <img src={m.coverUrl} alt="" className="w-full h-full object-cover" loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text truncate">{m.title}</p>
                {m.author && <p className="text-[10px] text-text-muted truncate">{m.author}</p>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
