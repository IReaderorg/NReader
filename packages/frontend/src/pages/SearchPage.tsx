import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'
import { MangaCard } from '../components/MangaCard'
import { Search, Loader2 } from 'lucide-react'

export function SearchPage() {
  const { sourceId } = useParams<{ sourceId: string }>()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MangaSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim() || !sourceId) { setResults([]); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await api.search(sourceId, query)
        setResults(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, sourceId])

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

      {!loading && !error && results.length === 0 && query && (
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
