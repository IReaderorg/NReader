import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, type MangaDetail } from '../api/client'

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
    api.getDetail(sourceId, decodeURIComponent(mangaId))
      .then(setManga)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [sourceId, mangaId])

  if (loading) return <DetailSkeleton />
  if (error) return <div className="max-w-4xl mx-auto text-center py-12"><p className="text-destructive mb-4">{error}</p></div>
  if (!manga) return null

  const chapters = [...manga.chapters].sort((a, b) =>
    sortOrder === 'asc' ? a.number - b.number : b.number - a.number
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-6 mb-8">
        <img src={manga.coverUrl} alt={manga.title}
          className="w-48 h-64 object-cover rounded-lg" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{manga.title}</h1>
          {manga.author && <p className="text-muted-foreground mb-1">By {manga.author}</p>}
          {manga.status && <p className="text-sm mb-2">Status: {manga.status}</p>}
          {manga.rating && <p className="text-sm mb-2">Rating: {manga.rating}/10</p>}
          {manga.genres && (
            <div className="flex gap-1 flex-wrap mb-3">
              {manga.genres.map(g => <span key={g} className="text-xs bg-secondary px-2 py-0.5 rounded">{g}</span>)}
            </div>
          )}
          {manga.description && <p className="text-sm text-muted-foreground line-clamp-4">{manga.description}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chapters ({manga.chapters.length})</h2>
        <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
          className="text-sm px-3 py-1 bg-secondary rounded-md">
          {sortOrder === 'asc' ? '↑ Oldest first' : '↓ Newest first'}
        </button>
      </div>

      <div className="border rounded-lg divide-y">
        {chapters.map((ch) => (
          <div key={ch.id} className="px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors">
            <div>
              <span className="font-medium">Ch. {ch.number}</span>
              {ch.title && <span className="text-muted-foreground ml-2">{ch.title}</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {ch.read && <span className="text-green-600">Read</span>}
              {ch.downloaded && <span>Downloaded</span>}
              {ch.date && <span>{new Date(ch.date).toLocaleDateString()}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return <div className="max-w-4xl mx-auto animate-pulse"><div className="flex gap-6 mb-8"><div className="w-48 h-64 bg-muted rounded-lg"/><div className="flex-1"><div className="h-6 bg-muted rounded w-48 mb-2"/><div className="h-4 bg-muted rounded w-32 mb-1"/><div className="h-4 bg-muted rounded w-24"/></div></div></div>
}
