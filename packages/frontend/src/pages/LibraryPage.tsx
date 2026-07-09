import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLibraryStore } from '../store/library-store'
import { BookOpen, Plus, X, FolderPlus, List, LayoutGrid } from 'lucide-react'

export function LibraryPage() {
  const {
    entries, categories, activeCategoryId, loading, error,
    fetchLibrary, fetchCategories, removeFromLibrary,
    setActiveCategory, createCategory, deleteCategory,
  } = useLibraryStore()

  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchLibrary()
    fetchCategories()
  }, [fetchLibrary, fetchCategories])

  const filteredEntries = activeCategoryId
    ? entries.filter(e => e.categoryIds.includes(activeCategoryId))
    : entries

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return
    await createCategory(newCategoryName.trim())
    setNewCategoryName('')
    setShowCreateCategory(false)
  }

  if (loading && entries.length === 0) return <LibrarySkeleton />
  if (error) return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-sm text-danger">{error}</p>
      <button onClick={fetchLibrary} className="mt-3 text-xs text-accent hover:underline">Retry</button>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-text">Library</h1>
          <span className="text-xs text-text-muted">{entries.length} titles</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category filter bar */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory(null)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeCategoryId
              ? 'bg-accent text-black'
              : 'bg-surface text-text-secondary hover:text-text'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeCategoryId === cat.id
                ? 'bg-accent text-black'
                : 'bg-surface text-text-secondary hover:text-text'
            }`}
          >
            {cat.color && (
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
            )}
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => setShowCreateCategory(true)}
          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-surface text-text-muted hover:text-text transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Create category dialog */}
      {showCreateCategory && (
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={e => setNewCategoryName(e.target.value)}
            placeholder="Category name..."
            className="flex-1 px-3 py-1.5 rounded-lg bg-surface text-text text-xs border border-border-light focus:outline-none focus:border-accent/50"
            onKeyDown={e => e.key === 'Enter' && handleCreateCategory()}
            autoFocus
          />
          <button
            onClick={handleCreateCategory}
            className="px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium"
          >
            Add
          </button>
          <button
            onClick={() => setShowCreateCategory(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Empty state */}
      {filteredEntries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <BookOpen className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
          <h2 className="font-semibold text-sm text-text mb-1">
            {activeCategoryId ? 'No manga in this category' : 'Your library is empty'}
          </h2>
          <p className="text-xs text-text-secondary text-center max-w-xs mb-4">
            {activeCategoryId
              ? 'Add manga to this category from the manga detail page.'
              : 'Browse sources and add manga to your library to see them here.'}
          </p>
          {!activeCategoryId && (
            <Link
              to="/sources"
              className="px-4 py-2 rounded-xl bg-accent text-black text-xs font-semibold hover:brightness-110 transition-all"
            >
              Browse Sources
            </Link>
          )}
        </div>
      )}

      {/* Grid view */}
      {viewMode === 'grid' && filteredEntries.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filteredEntries.map(entry => (
            <div key={entry.id} className="group relative">
              <Link
                to={`/sources/${entry.sourceId}/manga/${encodeURIComponent(entry.mangaId)}`}
                className="block focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-lg"
              >
                <div className="relative aspect-[3/4] bg-surface rounded-lg overflow-hidden ring-1 ring-border-light/50 transition-all duration-200 group-hover:ring-accent/30 group-hover:brightness-110">
                  <img
                    src={entry.coverUrl}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"><rect fill="%2318181a" width="3" height="4"/><text x="1.5" y="2" text-anchor="middle" fill="%23666" font-size="0.3">?</text></svg>'
                    }}
                  />
                  {entry.chaptersRead > 0 && entry.totalChapters && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${Math.round((entry.chaptersRead / entry.totalChapters) * 100)}%` }}
                      />
                    </div>
                  )}
                </div>
                <h3 className="mt-1.5 text-xs font-medium leading-tight line-clamp-2 text-text-secondary group-hover:text-text transition-colors">
                  {entry.title}
                </h3>
              </Link>
              <button
                onClick={() => removeFromLibrary(entry.id)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-danger/80"
                title="Remove from library"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && filteredEntries.length > 0 && (
        <div className="space-y-0.5">
          {filteredEntries.map(entry => (
            <div key={entry.id} className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface transition-colors">
              <Link
                to={`/sources/${entry.sourceId}/manga/${encodeURIComponent(entry.mangaId)}`}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="w-10 h-14 shrink-0 rounded-md overflow-hidden bg-surface">
                  <img src={entry.coverUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-text truncate">{entry.title}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    Ch. {entry.chaptersRead}{entry.totalChapters ? ` / ${entry.totalChapters}` : ''}
                  </p>
                </div>
              </Link>
              <button
                onClick={() => removeFromLibrary(entry.id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LibrarySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-2 mb-5">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-7 bg-surface rounded-full w-16" />)}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] bg-surface rounded-lg" />
            <div className="h-3 bg-surface rounded mt-1.5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
