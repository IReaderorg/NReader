import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type MangaSummary } from '../api/client'

export function SearchPage() {
  const { sourceId } = useParams<{ sourceId: string }>()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MangaSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search {sourceId}</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder="Search manga..."
        className="w-full px-4 py-2 border rounded-md bg-background mb-6" autoFocus />

      {loading && <div className="text-center animate-pulse py-8">Searching...</div>}
      {error && <div className="text-destructive text-center py-4">{error}</div>}
      {!loading && !error && results.length === 0 && query && (
        <div className="text-center text-muted-foreground py-8">No results for "{query}"</div>
      )}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((m) => (
            <Link key={m.id} to={`/sources/${sourceId}/manga/${encodeURIComponent(m.id)}`} className="group">
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-2">
                <img src={m.coverUrl} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/350x500?text=No+Cover' }} />
              </div>
              <h3 className="text-sm font-medium line-clamp-2">{m.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
