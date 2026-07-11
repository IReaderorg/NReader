import { useCallback, useEffect, useRef, useState } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
} from 'lucide-react'
import { api } from '../api/client'

interface ChapterNav {
  id: string
  number: number
  title: string
  date?: string
}

interface ChaptersSliderProps {
  chapters: ChapterNav[]
  currentChapterIndex: number
  onChapterSelect: (index: number) => void
  visible: boolean
  onClose: () => void
}

export function ChaptersSlider({
  chapters,
  currentChapterIndex,
  onChapterSelect,
  visible,
  onClose,
}: ChaptersSliderProps) {
  const [closing, setClosing] = useState(false)
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set())
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible || chapters.length === 0) return
    const ids = chapters.map(c => c.id)
    api.getDownloads().then(jobs => {
      const completed = jobs.filter(j => j.status === 'completed').map(j => j.chapterId)
      setDownloadedIds(new Set(completed))
    }).catch(() => {})
    Promise.allSettled(
      ids.slice(Math.max(0, currentChapterIndex - 5), currentChapterIndex + 5).map(id =>
        api.getBookmarkStatus(id).then(r => r.bookmarked ? id : null)
      )
    ).then(results => {
      const marked = results.filter(r => r.status === 'fulfilled' && r.value).map(r => (r as PromiseFulfilledResult<string>).value)
      setBookmarkedIds(new Set(marked))
    }).catch(() => {})
  }, [visible, chapters, currentChapterIndex])

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 180)
  }, [onClose])

  useEffect(() => {
    if (visible && trackRef.current) {
      const container = trackRef.current
      const totalItems = chapters.length
      if (totalItems === 0) return
      const ratio = currentChapterIndex / (totalItems - 1)
      const scrollWidth = container.scrollWidth - container.clientWidth
      container.scrollLeft = ratio * scrollWidth
    }
  }, [visible, currentChapterIndex, chapters.length])

  const handleSliderClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || chapters.length === 0) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const ratio = x / rect.width
    const index = Math.round(ratio * (chapters.length - 1))
    if (index >= 0 && index < chapters.length) {
      onChapterSelect(index)
      handleClose()
    }
  }, [chapters, onChapterSelect, handleClose])

  const handlePrev = useCallback(() => {
    if (currentChapterIndex > 0) {
      onChapterSelect(currentChapterIndex - 1)
      handleClose()
    }
  }, [currentChapterIndex, onChapterSelect, handleClose])

  const handleNext = useCallback(() => {
    if (currentChapterIndex < chapters.length - 1) {
      onChapterSelect(currentChapterIndex + 1)
      handleClose()
    }
  }, [currentChapterIndex, chapters.length, onChapterSelect, handleClose])

  if (!visible && !closing) return null

  const currentCh = chapters[currentChapterIndex]
  const readChapters = currentChapterIndex

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${closing ? 'opacity-0' : 'animate-in fade-in duration-150'}`}
        onClick={handleClose}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl shadow-2xl border-t border-border-light transition-transform duration-200 ${
          closing ? 'translate-y-full' : 'animate-in slide-in-from-bottom duration-200'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-text-muted/30" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-2">
          <h3 className="text-sm font-semibold text-text">Chapter Slider</h3>
          <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current chapter info */}
        {currentCh && (
          <div className="px-5 pb-3">
            <p className="text-xs text-text-muted">
              {currentCh.title || `Chapter ${currentCh.number}`}
              {currentCh.date && <span className="ml-2 opacity-60">{formatRelativeDate(currentCh.date)}</span>}
            </p>
          </div>
        )}

        {/* Slider track */}
        <div
          ref={trackRef}
          className="relative mx-5 h-12 flex items-center overflow-x-auto scrollbar-none cursor-pointer"
          onClick={handleSliderClick}
        >
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-border-light rounded-full" />

          {chapters.map((ch, i) => {
            const isCurrent = i === currentChapterIndex
            const isRead = i < readChapters
            const isDownloaded = downloadedIds.has(ch.id)
            const isBookmarked = bookmarkedIds.has(ch.id)

            return (
              <div
                key={ch.id}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
                style={{
                  position: 'absolute',
                  left: `${(i / Math.max(1, chapters.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                  zIndex: isCurrent ? 10 : 1,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onChapterSelect(i)
                  handleClose()
                }}
              >
                <div
                  className={`rounded-full transition-all ${
                    isCurrent
                      ? 'w-4 h-4 bg-accent shadow-lg shadow-accent/30'
                      : isRead
                        ? 'w-2.5 h-2.5 bg-text-muted/40'
                        : 'w-2 h-2 bg-border-light'
                  }`}
                />
                <div className="flex items-center gap-0.5">
                  {isDownloaded && <CheckCircle2 className="w-2.5 h-2.5 text-accent/60" />}
                  {isBookmarked && <Bookmark className="w-2 h-2 text-yellow-400 fill-yellow-400" />}
                </div>
                <span className={`text-[9px] font-medium ${isCurrent ? 'text-accent' : 'text-text-muted/50'}`}>
                  {ch.number > 0 ? ch.number : '?'}
                </span>
              </div>
            )
          })}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center justify-between px-5 py-4 gap-3">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex <= 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-hover/50 text-text-secondary text-xs font-medium disabled:opacity-30 hover:bg-surface-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <div className="text-[10px] text-text-muted tabular-nums">
            {currentChapterIndex + 1} / {chapters.length}
          </div>
          <button
            onClick={handleNext}
            disabled={currentChapterIndex >= chapters.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-hover/50 text-text-secondary text-xs font-medium disabled:opacity-30 hover:bg-surface-hover transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div style={{ height: 'env(safe-area-inset-bottom, 0px)', minHeight: 4 }} />
      </div>
    </div>
  )
}

function formatRelativeDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    const diffMs = Date.now() - date.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 60) return `${diffMin}m`
    const diffHour = Math.floor(diffMin / 60)
    if (diffHour < 24) return `${diffHour}h`
    const diffDay = Math.floor(diffHour / 24)
    if (diffDay < 30) return `${diffDay}d`
    return `${Math.floor(diffDay / 30)}mo`
  } catch {
    return dateStr
  }
}
