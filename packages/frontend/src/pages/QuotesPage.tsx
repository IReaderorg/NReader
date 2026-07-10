import { useState, useEffect } from 'react'
import { Quote, Trash2, Plus } from 'lucide-react'
import { apiFetch } from '../api/client'

interface QuoteEntry {
  id: string; user_id: string; manga_id?: string; source_id?: string
  chapter_id?: string; text: string; context?: string; likes: number
  created_at: string; username: string; display_name: string; avatar_url: string
}

export function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteEntry[]>([])
  const [text, setText] = useState('')
  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('auth_token')

  useEffect(() => { apiFetch<QuoteEntry[]>('/quotes').then(setQuotes).catch(() => {}) }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || !token) return
    await apiFetch('/quotes', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    setText('')
    setShowForm(false)
    const updated = await apiFetch<QuoteEntry[]>('/quotes')
    setQuotes(updated)
  }

  async function handleDelete(id: string) {
    if (!token) return
    await apiFetch(`/quotes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setQuotes(quotes.filter(q => q.id !== id))
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-bold text-text">Quotes</h1>
        {token && (
          <button onClick={() => setShowForm(!showForm)}
            className="p-2 rounded-lg bg-accent text-white">
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-3 rounded-xl bg-surface border border-border-light">
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Share a quote from what you're reading..."
            className="w-full p-2 rounded-lg bg-surface border border-border-light text-text text-sm min-h-[80px]"
          />
          <div className="flex gap-2 mt-2">
            <button type="submit" className="px-3 py-1 rounded-lg bg-accent text-white text-xs">Save</button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-3 py-1 rounded-lg bg-surface text-text-muted text-xs border border-border-light">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {quotes.map(q => (
          <div key={q.id} className="p-4 rounded-xl bg-surface border border-border-light">
            <div className="flex items-start gap-3">
              <Quote className="w-4 h-4 text-accent mt-1 shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-text italic">"{q.text}"</p>
                {q.context && <p className="text-xs text-text-muted mt-1">— {q.context}</p>}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-secondary">{q.display_name || q.username}</span>
                  <span className="text-xs text-text-muted">{new Date(q.created_at).toLocaleDateString()}</span>
                  {token && q.user_id === token && (
                    <button onClick={() => handleDelete(q.id)} className="ml-auto">
                      <Trash2 className="w-3 h-3 text-text-muted" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {quotes.length === 0 && <p className="text-sm text-text-muted text-center py-8">No quotes yet</p>}
      </div>
    </div>
  )
}
