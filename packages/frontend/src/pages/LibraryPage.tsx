import { useEffect, useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLibraryStore } from '../store/library-store'
import type { SortField, LibraryFilters } from '../store/library-store'
import {
  BookOpen, Plus, X, List, LayoutGrid, ArrowUpDown, Search,
  Star, StarOff, Edit3, Check, Archive, Download, Bookmark,
  Filter, GripVertical, Trash2,
} from 'lucide-react'

const SORT_OPTIONS: { field: SortField; ascLabel?: string; descLabel: string }[] = [
  { field: 'title', descLabel: 'Title A–Z', ascLabel: 'Title Z–A' },
  { field: 'lastRead', descLabel: 'Last Read (newest)', ascLabel: 'Last Read (oldest)' },
  { field: 'unreadCount', descLabel: 'Unread (most)', ascLabel: 'Unread (least)' },
  { field: 'dateAdded', descLabel: 'Date Added (newest)', ascLabel: 'Date Added (oldest)' },
  { field: 'score', descLabel: 'Score (highest)', ascLabel: 'Score (lowest)' },
]

const FILTER_CHIPS: { key: keyof LibraryFilters; label: string; icon: React.ReactNode }[] = [
  { key: 'downloaded', label: 'Downloaded', icon: <Download className="w-3 h-3" /> },
  { key: 'unread', label: 'Unread', icon: <Bookmark className="w-3 h-3" /> },
  { key: 'completed', label: 'Completed', icon: <Check className="w-3 h-3" /> },
  { key: 'ongoing', label: 'Ongoing', icon: <ArrowUpDown className="w-3 h-3" /> },
  { key: 'favorited', label: 'Favorited', icon: <Star className="w-3 h-3" /> },
  { key: 'archived', label: 'Archived', icon: <Archive className="w-3 h-3" /> },
]

export function LibraryPage() {
  const {
    entries, categories, activeCategoryId, loading, error, sortBy, sortOrder, filters,
    searchQuery, selectedIds, selectionMode, metadataDialogId, categoryDialogId,
    fetchLibrary, fetchCategories, removeFromLibrary, setActiveCategory,
    createCategory, deleteCategory, setSortBy, setSortOrder, setFilter, clearFilters,
    setSearchQuery, setBookCategories, setFavorited, updateMetadata, markAllRead,
    setArchived, toggleSelection, selectAll, setSelectionMode,
    batchAddCategory, batchMarkRead, batchDelete, setMetadataDialogId,
    setCategoryDialogId,
  } = useLibraryStore()

  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editAuthor, setEditAuthor] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editCoverUrl, setEditCoverUrl] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  // Metadata dialog entry
  const metadataEntry = metadataDialogId ? entries.find(e => e.id === metadataDialogId) : null

  useEffect(() => {
    if (metadataEntry) {
      setEditTitle(metadataEntry.title)
      setEditAuthor(metadataEntry.author ?? '')
      setEditDescription(metadataEntry.description ?? '')
      setEditCoverUrl(metadataEntry.coverUrl)
    }
  }, [metadataEntry])

  useEffect(() => {
    fetchLibrary()
    fetchCategories()
  }, [fetchLibrary, fetchCategories])

  // Filter + search + category
  const processedEntries = useMemo(() => {
    let list = entries

    // Category filter
    if (activeCategoryId) {
      list = list.filter(e => e.categoryIds.includes(activeCategoryId))
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(e => e.title.toLowerCase().includes(q))
    }

    // Advanced filters
    if (filters.downloaded) {
      // Placeholder: entries don't have download status here; rely on view logic
    }
    if (filters.unread) {
      list = list.filter(e => e.chaptersRead === 0)
    }
    if (filters.completed) {
      list = list.filter(e => e.status === 'completed')
    }
    if (filters.ongoing) {
      list = list.filter(e => e.status === 'ongoing')
    }
    if (filters.favorited) {
      list = list.filter(e => e.favorited)
    }
    if (filters.archived !== undefined) {
      // Default hide archived unless explicitly filtered
      if (!filters.archived) {
        list = list.filter(e => !e.archived)
      } else {
        list = list.filter(e => e.archived)
      }
    } else {
      // Hide archived by default
      list = list.filter(e => !e.archived)
    }

    return list
  }, [entries, activeCategoryId, searchQuery, filters])

  // Sort
  const sortedEntries = useMemo(() => {
    const list = [...processedEntries]
    const dir = sortOrder === 'desc' ? -1 : 1

    list.sort((a, b) => {
      // Pinned/favorited always on top
      if (a.favorited && !b.favorited) return -1
      if (!a.favorited && b.favorited) return 1

      switch (sortBy) {
        case 'title':
          return dir * a.title.localeCompare(b.title)
        case 'lastRead': {
          if (!a.lastReadAt && !b.lastReadAt) return 0
          if (!a.lastReadAt) return 1
          if (!b.lastReadAt) return -1
          return dir * (new Date(a.lastReadAt).getTime() - new Date(b.lastReadAt).getTime())
        }
        case 'unreadCount': {
          const aUnread = (a.totalChapters ?? 0) - a.chaptersRead
          const bUnread = (b.totalChapters ?? 0) - b.chaptersRead
          return dir * (aUnread - bUnread)
        }
        case 'score':
          return dir * ((a.score ?? 0) - (b.score ?? 0))
        case 'dateAdded':
        default:
          return dir * (new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime())
      }
    })
    return list
  }, [processedEntries, sortBy, sortOrder])

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return
    await createCategory(newCategoryName.trim())
    setNewCategoryName('')
    setShowCreateCategory(false)
  }

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
    setShowSortMenu(false)
  }

  const handleMetadataSave = () => {
    if (!metadataDialogId) return
    updateMetadata(metadataDialogId, {
      title: editTitle,
      author: editAuthor,
      description: editDescription,
      coverUrl: editCoverUrl,
    })
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
          {/* Search toggle */}
          <button
            onClick={() => searchRef.current?.focus()}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </button>
          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(v => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface transition-colors"
              title="Sort"
            >
              <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
            </button>
            {showSortMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-surface border border-border-light rounded-xl shadow-lg py-1 min-w-[160px]">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.field}
                      onClick={() => handleSort(opt.field)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                        sortBy === opt.field ? 'text-accent font-medium' : 'text-text-secondary hover:text-text hover:bg-surface-hover'
                      }`}
                    >
                      <span>{sortOrder === 'desc' ? opt.descLabel : (opt.ascLabel ?? opt.descLabel)}</span>
                      {sortBy === opt.field && (
                        <span className="text-[9px] opacity-60">{sortOrder === 'desc' ? '▼' : '▲'}</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(v => !v)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                Object.values(filters).some(Boolean) ? 'text-accent bg-accent/10' : 'text-text-muted hover:text-text hover:bg-surface'
              }`}
              title="Filter"
            >
              <Filter className="w-4 h-4" strokeWidth={1.5} />
            </button>
            {showFilterMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowFilterMenu(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-surface border border-border-light rounded-xl shadow-lg py-1 min-w-[140px]">
                  {FILTER_CHIPS.map(chip => (
                    <button
                      key={chip.key}
                      onClick={() => {
                        setFilter(chip.key, !filters[chip.key])
                        // If toggling archived on, clear default hide
                        if (chip.key === 'archived' && !filters.archived) {
                          // enable archived view
                        }
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2 ${
                        filters[chip.key] ? 'text-accent font-medium' : 'text-text-secondary hover:text-text hover:bg-surface-hover'
                      }`}
                    >
                      {chip.icon}
                      <span>{chip.label}</span>
                      {filters[chip.key] && <Check className="w-3 h-3 ml-auto" />}
                    </button>
                  ))}
                  {Object.values(filters).some(Boolean) && (
                    <button
                      onClick={() => clearFilters()}
                      className="w-full text-left px-3 py-2 text-xs text-danger hover:bg-surface-hover transition-colors"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          {/* View toggle */}
          <button
            onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>
          {/* Selection mode */}
          <button
            onClick={() => setSelectionMode(!selectionMode)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-xs font-medium ${
              selectionMode ? 'bg-accent text-black' : 'text-text-muted hover:text-text hover:bg-surface'
            }`}
            title="Select"
          >
            {selectionMode ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search library..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface text-text text-xs border border-border-light focus:outline-none focus:border-accent/50 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
          >
            <X className="w-3 h-3" />
          </button>
        )}
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
          <div key={cat.id} className="shrink-0 flex items-center gap-0 group/cat">
            <button
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-l-full text-xs font-medium transition-all flex items-center gap-1.5 ${
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
            <span
              className={`px-1 py-1.5 text-[10px] cursor-grab text-text-muted/40 hover:text-text-muted transition-colors ${
                activeCategoryId === cat.id ? 'bg-accent' : 'bg-surface'
              }`}
              title="Drag to reorder"
            >
              <GripVertical className="w-3 h-3" strokeWidth={1.5} />
            </span>
            <button
              onClick={() => deleteCategory(cat.id)}
              className={`px-1.5 py-1.5 rounded-r-full text-xs transition-colors hover:text-danger ${
                activeCategoryId === cat.id ? 'bg-accent' : 'bg-surface'
              }`}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
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

      {/* Active filters indicator */}
      {Object.values(filters).some(Boolean) && (
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {FILTER_CHIPS.filter(chip => filters[chip.key]).map(chip => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-medium"
            >
              {chip.icon}
              {chip.label}
              <button onClick={() => setFilter(chip.key, false)} className="ml-0.5 hover:text-accent/70">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Multi-select action bar */}
      {selectionMode && selectedIds.length > 0 && (
        <div className="mb-3 flex items-center gap-2 p-2 rounded-xl bg-surface border border-border-light">
          <span className="text-xs text-text-muted mr-2">{selectedIds.length} selected</span>
          <button
            onClick={() => selectAll()}
            className="px-2 py-1 rounded-lg text-[10px] text-accent hover:bg-accent/10 transition-colors"
          >
            Select all
          </button>
          <div className="flex-1" />
          <button
            onClick={() => setCategoryDialogId('batch')}
            className="px-2 py-1 rounded-lg text-[10px] text-text-secondary hover:text-text hover:bg-surface-hover transition-colors flex items-center gap-1"
          >
            <Bookmark className="w-3 h-3" /> Category
          </button>
          <button
            onClick={() => batchMarkRead()}
            className="px-2 py-1 rounded-lg text-[10px] text-text-secondary hover:text-text hover:bg-surface-hover transition-colors flex items-center gap-1"
          >
            <Check className="w-3 h-3" /> Mark read
          </button>
          <button
            onClick={() => batchDelete()}
            className="px-2 py-1 rounded-lg text-[10px] text-danger hover:bg-danger/10 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      )}

      {/* Empty state */}
      {processedEntries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <BookOpen className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
          <h2 className="font-semibold text-sm text-text mb-1">
            {searchQuery ? 'No results found' : activeCategoryId ? 'No manga in this category' : 'Your library is empty'}
          </h2>
          <p className="text-xs text-text-secondary text-center max-w-xs mb-4">
            {searchQuery
              ? 'Try a different search term.'
              : activeCategoryId
              ? 'Add manga to this category from the manga detail page.'
              : 'Browse sources and add manga to your library to see them here.'}
          </p>
          {!activeCategoryId && !searchQuery && (
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
      {viewMode === 'grid' && processedEntries.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {sortedEntries.map(entry => (
            <div
              key={entry.id}
              className={`group relative ${selectionMode ? 'cursor-pointer' : ''}`}
              onClick={() => selectionMode && toggleSelection(entry.id)}
            >
              {/* Selection checkbox */}
              {selectionMode && (
                <div className={`absolute top-1.5 left-1.5 z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedIds.includes(entry.id) ? 'bg-accent border-accent' : 'bg-black/50 border-white/60'
                }`}>
                  {selectedIds.includes(entry.id) && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                </div>
              )}
              <Link
                to={selectionMode ? '#' : `/sources/${entry.sourceId}/manga/${encodeURIComponent(entry.mangaId)}`}
                className="block focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-lg"
                onClick={e => selectionMode && e.preventDefault()}
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
                  {/* Progress bar */}
                  {entry.chaptersRead > 0 && entry.totalChapters && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${Math.round((entry.chaptersRead / entry.totalChapters) * 100)}%` }}
                      />
                    </div>
                  )}
                  {/* Favorite star */}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFavorited(entry.id, !entry.favorited) }}
                    className={`absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full transition-all ${
                      entry.favorited ? 'text-yellow-400 drop-shadow-sm' : 'text-white/0 group-hover:text-white/70 hover:text-yellow-400'
                    }`}
                    title={entry.favorited ? 'Unfavorite' : 'Favorite'}
                  >
                    {entry.favorited ? <Star className="w-3.5 h-3.5 fill-current" /> : <Star className="w-3.5 h-3.5" />}
                  </button>
                  {/* Archived badge */}
                  {entry.archived && (
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[8px] text-text-muted flex items-center gap-0.5">
                      <Archive className="w-2.5 h-2.5" /> Archived
                    </div>
                  )}
                </div>
                <h3 className="mt-1.5 text-xs font-medium leading-tight line-clamp-2 text-text-secondary group-hover:text-text transition-colors">
                  {entry.title}
                </h3>
              </Link>
              {/* Quick actions (non-selection mode) */}
              {!selectionMode && (
                <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); setMetadataDialogId(entry.id) }}
                    className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                    title="Edit metadata"
                  >
                    <Edit3 className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFromLibrary(entry.id) }}
                    className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
                    title="Remove from library"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && processedEntries.length > 0 && (
        <div className="space-y-0.5">
          {sortedEntries.map(entry => (
            <div
              key={entry.id}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                selectionMode ? 'cursor-pointer' : 'hover:bg-surface'
              } ${selectedIds.includes(entry.id) ? 'bg-accent/5 ring-1 ring-accent/20' : ''}`}
              onClick={() => selectionMode && toggleSelection(entry.id)}
            >
              {/* Selection checkbox */}
              {selectionMode && (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  selectedIds.includes(entry.id) ? 'bg-accent border-accent' : 'border-border-light'
                }`}>
                  {selectedIds.includes(entry.id) && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                </div>
              )}
              {/* Favorite star (list) */}
              {!selectionMode && (
                <button
                  onClick={(e) => { e.stopPropagation(); setFavorited(entry.id, !entry.favorited) }}
                  className={`shrink-0 transition-colors ${entry.favorited ? 'text-yellow-400' : 'text-text-muted/30 hover:text-text-muted'}`}
                >
                  {entry.favorited ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                </button>
              )}
              <Link
                to={selectionMode ? '#' : `/sources/${entry.sourceId}/manga/${encodeURIComponent(entry.mangaId)}`}
                className="flex items-center gap-3 flex-1 min-w-0"
                onClick={e => selectionMode && e.preventDefault()}
              >
                <div className="w-10 h-14 shrink-0 rounded-md overflow-hidden bg-surface">
                  <img src={entry.coverUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-text truncate">{entry.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-text-muted">
                      Ch. {entry.chaptersRead}{entry.totalChapters ? ` / ${entry.totalChapters}` : ''}
                    </span>
                    {entry.lastReadAt && (
                      <span className="text-[9px] text-text-muted/50">
                        {new Date(entry.lastReadAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    {entry.archived && (
                      <span className="text-[9px] text-text-muted/50 flex items-center gap-0.5">
                        <Archive className="w-2.5 h-2.5" /> Archived
                      </span>
                    )}
                  </div>
                  {entry.chaptersRead > 0 && entry.totalChapters && (
                    <div className="mt-1 h-1 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent transition-all"
                        style={{ width: `${Math.round((entry.chaptersRead / entry.totalChapters) * 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              </Link>
              {/* List view actions */}
              {!selectionMode && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); markAllRead(entry.id) }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover"
                    title="Mark all read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setArchived(entry.id, !entry.archived) }}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
                      entry.archived ? 'text-accent' : 'text-text-muted hover:text-text hover:bg-surface-hover'
                    }`}
                    title={entry.archived ? 'Unarchive' : 'Archive'}
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFromLibrary(entry.id) }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger hover:bg-surface-hover"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Metadata edit dialog */}
      {metadataDialogId && metadataEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setMetadataDialogId(null)}>
          <div className="w-full max-w-sm bg-surface rounded-2xl border border-border-light shadow-xl p-5" onClick={e => e.stopPropagation()}>
            <h2 className="text-sm font-semibold text-text mb-4">Edit Metadata</h2>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-text-muted block mb-1">Title</label>
                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover text-text text-xs border border-border-light focus:outline-none focus:border-accent/50" />
              </div>
              <div>
                <label className="text-[10px] text-text-muted block mb-1">Author</label>
                <input type="text" value={editAuthor} onChange={e => setEditAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover text-text text-xs border border-border-light focus:outline-none focus:border-accent/50" />
              </div>
              <div>
                <label className="text-[10px] text-text-muted block mb-1">Description</label>
                <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover text-text text-xs border border-border-light focus:outline-none focus:border-accent/50 resize-none" />
              </div>
              <div>
                <label className="text-[10px] text-text-muted block mb-1">Cover URL</label>
                <input type="text" value={editCoverUrl} onChange={e => setEditCoverUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover text-text text-xs border border-border-light focus:outline-none focus:border-accent/50" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <button onClick={handleMetadataSave}
                className="flex-1 px-4 py-2 rounded-xl bg-accent text-black text-xs font-semibold hover:brightness-110 transition-all">
                Save
              </button>
              <button onClick={() => setMetadataDialogId(null)}
                className="px-4 py-2 rounded-xl bg-surface-hover text-text-secondary text-xs hover:text-text transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category selector dialog (batch) */}
      {categoryDialogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setCategoryDialogId(null)}>
          <div className="w-full max-w-xs bg-surface rounded-2xl border border-border-light shadow-xl p-5" onClick={e => e.stopPropagation()}>
            <h2 className="text-sm font-semibold text-text mb-4">Add to Category</h2>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (categoryDialogId === 'batch') {
                      batchAddCategory(cat.id)
                    } else {
                      const entry = entries.find(e => e.id === categoryDialogId)
                      if (entry) {
                        const newIds = entry.categoryIds.includes(cat.id)
                          ? entry.categoryIds.filter(c => c !== cat.id)
                          : [...entry.categoryIds, cat.id]
                        setBookCategories(categoryDialogId, newIds)
                      }
                    }
                    setCategoryDialogId(null)
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-text hover:bg-surface-hover transition-colors flex items-center gap-2"
                >
                  {cat.color && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />}
                  {cat.name}
                </button>
              ))}
            </div>
            <button onClick={() => setCategoryDialogId(null)}
              className="w-full mt-3 px-4 py-2 rounded-xl bg-surface-hover text-text-secondary text-xs hover:text-text transition-colors">
              Cancel
            </button>
          </div>
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
