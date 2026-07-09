import { useEffect, useState, useRef, useCallback } from 'react'
import {
  X, ArrowUpDown, Crosshair, CheckCircle2, Clock,
} from 'lucide-react'
import { useDownloadStore } from '../store/download-store'

interface ChapterNav {
  id: string
  number: number
  title: string
  date?: string
}

interface ChapterDrawerProps {
  chapters: ChapterNav[]
  currentChapterIndex: number
  onChapterSelect: (index: number) => void
  visible: boolean
  onClose: () => void
}

export function ChapterDrawer({
  chapters,
  currentChapterIndex,
  onChapterSelect,
  visible,
  onClose,
}: ChapterDrawerProps) {
  const [sortAscending, setSortAscending] = useState(true)
  const [closing, setClosing] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const currentItemRef = useRef<HTMLButtonElement>(null)

  // Get download status for chapters
  const { jobs: downloadJobs, fetchDownloads } = useDownloadStore()

  // Fetch download status when drawer opens
  useEffect(() => {
    if (visible) {
      fetchDownloads()
    }
  }, [visible, fetchDownloads])

  // Scroll to current chapter when drawer opens
  useEffect(() => {
    if (visible && currentItemRef.current) {
      // Small delay to allow render
      const timer = setTimeout(() => {
        currentItemRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [visible, currentChapterIndex])

  // Close on Escape
  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, onClose])

  // Sort chapters
  const sortedChapters = sortAscending
    ? chapters
    : [...chapters].reverse()

  // Check if a chapter is downloaded
  const isChapterDownloaded = useCallback((chapterId: string) => {
    const job = downloadJobs.find(j => j.chapterId === chapterId)
    return job?.status === 'completed'
  }, [downloadJobs])

  // Check if a chapter has been read (current is always read; previous ones are "read")
  const hasChapterRead = useCallback((index: number) => {
    if (index === -1) return false
    const realIndex = sortAscending ? index : chapters.length - 1 - index
    return realIndex < currentChapterIndex
  }, [currentChapterIndex, chapters.length, sortAscending])

  // Handle close with exit animation
  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 180)
  }, [onClose])

  if (!visible && !closing) return null

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${closing ? 'opacity-0' : 'animate-in fade-in duration-150'}`}
        onClick={handleClose}
      />

      {/* Drawer panel */}
      <div className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-surface shadow-2xl flex flex-col transition-transform duration-200 ${closing ? 'translate-x-full' : 'animate-in slide-in-from-right duration-200'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-light">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-text">Chapters</h2>
            <span className="text-xs text-text-muted font-medium bg-surface-hover/50 px-2 py-0.5 rounded-full">
              {chapters.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Find current */}
            <button
              onClick={() => {
                currentItemRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
              title="Find current chapter"
            >
              <Crosshair className="w-4 h-4" />
            </button>

            {/* Sort toggle */}
            <button
              onClick={() => setSortAscending(v => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
              title={sortAscending ? 'Show newest first' : 'Show oldest first'}
            >
              <ArrowUpDown className={`w-4 h-4 transition-transform ${sortAscending ? '' : 'rotate-180'}`} />
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chapter list */}
        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain">
          {sortedChapters.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <p className="text-sm text-text-muted font-medium">No chapters available</p>
              <p className="text-xs text-text-muted/60 mt-1">Try refreshing the source</p>
            </div>
          ) : (
            <div className="py-1">
              {sortedChapters.map((ch) => {
                const originalIndex = chapters.findIndex(c => c.id === ch.id)
                const isCurrent = originalIndex === currentChapterIndex
                const isRead = hasChapterRead(originalIndex)
                const isDownloaded = isChapterDownloaded(ch.id)

                return (
                  <button
                    key={ch.id}
                    ref={isCurrent ? currentItemRef : undefined}
                    onClick={() => {
                      if (originalIndex === currentChapterIndex) {
                        handleClose()
                        return
                      }
                      onChapterSelect(originalIndex)
                      handleClose()
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors group hover:bg-surface-hover ${
                      isCurrent ? 'bg-accent/10 border-l-2 border-accent' : 'border-l-2 border-transparent'
                    }`}
                  >
                    {/* Number */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                      isCurrent
                        ? 'bg-accent text-black'
                        : isRead
                          ? 'bg-text-muted/10 text-text-muted'
                          : 'bg-surface-hover/50 text-text-secondary'
                    }`}>
                      {ch.number > 0 ? ch.number : '?'}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm truncate font-medium ${
                        isCurrent
                          ? 'text-accent'
                          : isRead
                            ? 'text-text-muted/50'
                            : 'text-text'
                      }`}>
                        {ch.title || `Chapter ${ch.number}`}
                      </div>
                      {ch.date && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-text-muted/40 shrink-0" />
                          <span className="text-[11px] text-text-muted/50 truncate">
                            {formatRelativeDate(ch.date)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status indicators */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isDownloaded && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent/10 text-accent" title="Downloaded">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="text-[10px] font-medium hidden sm:inline">Done</span>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" title="Current chapter" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Bottom safe area */}
          <div style={{ height: 'env(safe-area-inset-bottom, 0px)', minHeight: 8 }} />
        </div>
      </div>
    </div>
  )
}

/** Format an ISO date string to a human-readable relative time */
function formatRelativeDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr

    const now = Date.now()
    const diffMs = now - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)
    const diffMonth = Math.floor(diffDay / 30)
    const diffYear = Math.floor(diffDay / 365)

    if (diffSec < 60) return 'Just now'
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHour < 24) return `${diffHour}h ago`
    if (diffDay < 30) return `${diffDay}d ago`
    if (diffMonth < 12) return `${diffMonth}mo ago`
    return `${diffYear}y ago`
  } catch {
    return dateStr
  }
}
