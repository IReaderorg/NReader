import { useState } from 'react'
import {
  ArrowLeft, RefreshCw, Bookmark, Search, Flag, Brush,
  Globe, ChevronLeft, MoreHorizontal
} from 'lucide-react'

interface ReaderTopBarProps {
  title: string
  onBack: () => void
  onRefresh: () => void
  onRefreshRemote?: () => void
  onBookmark?: () => void
  onFindInChapter?: () => void
  onReport?: () => void
  onChapterArt?: () => void
  onWebView?: () => void
  onPluginMenu?: () => void
  visible: boolean
  /** Whether the chapter is currently bookmarked */
  isBookmarked?: boolean
  /** Whether the chapter is loaded */
  isLoaded?: boolean
  /** Whether to show the minimal variant (loading state) */
  minimal?: boolean
  /** Whether plugin menu items are available */
  hasPluginItems?: boolean
}

export function ReaderTopBar({
  title,
  onBack,
  onRefresh,
  onRefreshRemote,
  onBookmark,
  onFindInChapter,
  onReport,
  onChapterArt,
  onWebView,
  onPluginMenu,
  visible,
  isBookmarked = false,
  isLoaded = true,
  minimal = false,
  hasPluginItems = false,
}: ReaderTopBarProps) {
  const [expanded, setExpanded] = useState(false)

  if (minimal) {
    return (
      <div
        className={`absolute top-0 left-0 right-0 z-30 transition-all duration-200 ease-out ${
          visible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="flex items-center justify-between px-2 h-14 pt-safe-top">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/80 hover:bg-white/10 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={onRefresh}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {onWebView && (
              <button
                onClick={onWebView}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white/80 hover:bg-white/10 transition-colors"
                aria-label="Open in web"
              >
                <Globe className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`absolute top-0 left-0 right-0 z-30 transition-all duration-200 ease-out ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-surface/95 backdrop-blur-md border-b border-border-light shadow-lg rounded-b-2xl">
        <div className="flex items-center px-2 h-14" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
          {/* Back button */}
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0 px-2">
            <p className="text-sm font-semibold text-text truncate">
              {isLoaded ? title : 'Loading…'}
            </p>
          </div>

          {/* Expand toggle */}
          {isLoaded && (onBookmark || onFindInChapter || onReport || onChapterArt || hasPluginItems || onWebView) && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
              aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
            >
              {expanded ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <MoreHorizontal className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Refresh */}
          <button
            onClick={onRefresh}
            onContextMenu={(e) => {
              e.preventDefault()
              onRefreshRemote?.()
            }}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
            aria-label="Refresh"
            title="Refresh (right-click for remote refresh)"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Expanded action buttons */}            {expanded && (
          <div className="flex items-center gap-1 px-1 pb-2 overflow-x-auto no-scrollbar">
            {onBookmark && (
              <button
                onClick={onBookmark}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  isBookmarked
                    ? 'bg-accent/20 text-accent'
                    : 'text-text-secondary hover:text-text hover:bg-surface-hover'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            )}

            {onFindInChapter && (
              <button
                onClick={onFindInChapter}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                Find
              </button>
            )}

            {onReport && (
              <button
                onClick={onReport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
              >
                <Flag className="w-3.5 h-3.5" />
                Report
              </button>
            )}

            {onChapterArt && (
              <button
                onClick={onChapterArt}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
              >
                <Brush className="w-3.5 h-3.5" />
                Art
              </button>
            )}

            {hasPluginItems && onPluginMenu && (
              <button
                onClick={onPluginMenu}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
                Plugins
              </button>
            )}

            {onWebView && (
              <button
                onClick={onWebView}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text hover:bg-surface-hover transition-colors shrink-0"
              >
                <Globe className="w-3.5 h-3.5" />
                Web
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
