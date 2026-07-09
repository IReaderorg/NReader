import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Puzzle, Download, ArrowLeft, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MarketplaceItem {
  id: string; name: string; description: string; type: string
  version: string; author: string; installUrl: string
  downloads: number; rating: number
}

export function PluginManagerPage() {
  const navigate = useNavigate()
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>('all')

  useEffect(() => {
    api.getMarketplace()
      .then(setMarketplace)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filterType === 'all'
    ? marketplace
    : marketplace.filter(p => p.type === filterType)

  const typeColors: Record<string, string> = {
    source: 'text-sky-400 bg-sky-400/10',
    theme: 'text-violet-400 bg-violet-400/10',
    ai: 'text-emerald-400 bg-emerald-400/10',
    sync: 'text-amber-400 bg-amber-400/10',
    image: 'text-rose-400 bg-rose-400/10',
  }

  const types = ['all', ...new Set(marketplace.map(p => p.type))]

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/settings')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Plugin Manager</h1>
      </div>

      {/* Type filter */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl bg-surface border border-border-light overflow-x-auto">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize whitespace-nowrap ${
              filterType === t ? 'bg-accent text-black' : 'text-text-secondary hover:text-text'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-xs text-text-muted text-center py-8">No plugins found.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map(item => (
            <div key={item.id} className="p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    typeColors[item.type] ?? 'bg-accent/10 text-accent'
                  }`}>
                    <Puzzle className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-text truncate">{item.name}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full capitalize ${
                        typeColors[item.type] ?? 'bg-accent/10 text-accent'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                      <span>by {item.author}</span>
                      <span>v{item.version}</span>
                      <span className="flex items-center gap-0.5">
                        <Download className="w-3 h-3" strokeWidth={1.5} />
                        {item.downloads}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400" strokeWidth={1.5} />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium hover:bg-accent/90 transition-colors shrink-0">
                  <Download className="w-3 h-3" strokeWidth={1.5} />
                  Install
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}