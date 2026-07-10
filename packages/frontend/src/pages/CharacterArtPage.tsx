import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type CharacterArt } from '../api/client'
import { ArrowLeft, Trash2, Plus, X } from 'lucide-react'

export function CharacterArtPage() {
  const { mangaId } = useParams<{ mangaId: string }>()
  const navigate = useNavigate()
  const [art, setArt] = useState<CharacterArt[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [artist, setArtist] = useState('')

  const load = () => {
    if (!mangaId) return
    setLoading(true)
    api.getCharacterArt(mangaId).then(setArt).finally(() => setLoading(false))
  }

  useEffect(load, [mangaId])

  const handleUpload = async () => {
    if (!mangaId || !imageUrl) return
    await api.uploadCharacterArt({ mangaId, imageUrl, caption: caption || undefined, artist: artist || undefined })
    setImageUrl(''); setCaption(''); setArtist(''); setShowForm(false)
    load()
  }

  const handleDelete = async (id: string) => {
    await api.deleteCharacterArt(id)
    load()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-text-muted hover:text-text transition-colors">
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <h1 className="font-bold text-lg text-text">Character Art</h1>
        <button
          onClick={() => setShowForm(true)}
          className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
          Add
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="mb-4 p-3 rounded-xl bg-surface border border-border-light space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text">New Artwork</span>
            <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text">
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          <input
            type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
            placeholder="Image URL *" className="w-full bg-surface-hover border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text placeholder:text-text-muted/50 outline-none focus:border-accent/50"
          />
          <input
            type="text" value={caption} onChange={e => setCaption(e.target.value)}
            placeholder="Caption" className="w-full bg-surface-hover border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text placeholder:text-text-muted/50 outline-none focus:border-accent/50"
          />
          <input
            type="text" value={artist} onChange={e => setArtist(e.target.value)}
            placeholder="Artist name" className="w-full bg-surface-hover border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text placeholder:text-text-muted/50 outline-none focus:border-accent/50"
          />
          <button onClick={handleUpload} disabled={!imageUrl}
            className="w-full px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium disabled:opacity-50">
            Upload
          </button>
        </div>
      )}

      {/* Gallery */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] rounded-xl bg-surface animate-pulse" />)}
        </div>
      ) : art.length === 0 ? (
        <p className="text-sm text-text-muted text-center py-12">No character art yet. Add some!</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {art.map(item => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden bg-surface border border-border-light">
              <div className="aspect-[3/4]">
                <img src={item.imageUrl} alt={item.caption ?? ''}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"><rect fill="%2318181a" width="3" height="4"/><text x="1.5" y="2" text-anchor="middle" fill="%23666" font-size="0.3">?</text></svg>' }}
                />
              </div>
              {/* Gradient overlay for caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-2 pt-6">
                {item.caption && <p className="text-xs text-white font-medium leading-tight">{item.caption}</p>}
                {item.artist && <p className="text-[10px] text-white/70 mt-0.5">by {item.artist}</p>}
              </div>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:bg-danger hover:text-white opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
