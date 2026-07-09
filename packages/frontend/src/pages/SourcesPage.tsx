import { useEffect, useState } from 'react'

interface Source {
  id: string
  name: string
  lang: string
}

export function SourcesPage() {
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/v1/sources')
      .then((r) => r.json())
      .then((data) => {
        setSources(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load sources')
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-4 text-center animate-pulse">Loading sources...</div>
  if (error) return <div className="p-4 text-center text-destructive">{error}</div>

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sources</h1>
      {sources.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg mb-2">No sources installed</p>
          <p>Add your first source to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sources.map((src) => (
            <div key={src.id} className="border rounded-lg p-4 hover:bg-muted transition-colors">
              <h3 className="font-semibold">{src.name}</h3>
              <p className="text-sm text-muted-foreground">{src.lang}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
