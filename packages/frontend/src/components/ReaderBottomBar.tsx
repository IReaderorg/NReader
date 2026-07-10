import { useState, useCallback, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Volume2, Settings, Menu } from 'lucide-react'

interface ChapterNav {
  id: string
  number: number
  title: string
}

interface ReaderBottomBarProps {
  chapters: ChapterNav[]
  currentChapterIndex: number
  currentChapterTitle: string
  onPrev: () => void
  onNext: () => void
  onChapterSelect: (index: number) => void
  onTtsToggle: () => void
  onSettings: () => void
  onMenuOpen: () => void
  visible: boolean
  ttsActive?: boolean
}

export function ReaderBottomBar({
  chapters,
  currentChapterIndex,
  currentChapterTitle,
  onPrev,
  onNext,
  onChapterSelect,
  onTtsToggle,
  onSettings,
  onMenuOpen,
  visible,
  ttsActive = false,
}: ReaderBottomBarProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragValue, setDragValue] = useState(currentChapterIndex)
  const dragIndexRef = useRef(currentChapterIndex)

  useEffect(() => {
    if (!isDragging) {
      setDragValue(currentChapterIndex)
    }
  }, [currentChapterIndex, isDragging])

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setDragValue(val)
    dragIndexRef.current = val
  }, [])

  const commitDrag = useCallback(() => {
    setIsDragging(false)
    const targetIndex = dragIndexRef.current
    if (targetIndex !== currentChapterIndex && targetIndex >= 0 && targetIndex < chapters.length) {
      onChapterSelect(targetIndex)
    }
  }, [currentChapterIndex, chapters.length, onChapterSelect])

  const handleSliderStart = useCallback(() => {
    setIsDragging(true)
    setDragValue(currentChapterIndex)

    // Capture commit on document-level mouseup/touchend so it fires even if pointer leaves the input
    const onCommit = () => {
      document.removeEventListener('mouseup', onCommit)
      document.removeEventListener('touchend', onCommit)
      commitDrag()
    }
    document.addEventListener('mouseup', onCommit)
    document.addEventListener('touchend', onCommit)
  }, [currentChapterIndex, commitDrag])

  const chapterName = isDragging
    ? chapters[dragValue]?.title || `Chapter ${chapters[dragValue]?.number || '?'}`
    : currentChapterTitle

  // Progress as percentage
  const effectiveIndex = isDragging ? dragValue : currentChapterIndex
  const progress = chapters.length > 1
    ? Math.round((effectiveIndex / (chapters.length - 1)) * 100)
    : 0

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-200 ease-out ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-surface/95 backdrop-blur-md rounded-t-2xl border-t border-border-light shadow-2xl">
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-text-muted/30" />
        </div>

        {/* Chapter name */}
        <div className="px-6 pb-2">
          <p className="text-sm font-semibold text-text text-center truncate max-w-full">
            {chapterName}
          </p>
          {chapters.length > 1 && (
            <p className="text-[10px] text-text-muted text-center mt-0.5 font-medium">
              Chapter {chapters[currentChapterIndex]?.number || '?'} of {chapters.length}
            </p>
          )}
        </div>

        {/* Chapter slider */}
        {chapters.length > 1 && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2">
              {/* Prev button */}
              <button
                onClick={onPrev}
                disabled={currentChapterIndex <= 0}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors shrink-0 ${
                  currentChapterIndex <= 0
                    ? 'text-text-muted/20 cursor-not-allowed'
                    : 'text-text hover:bg-surface-hover'
                }`}
                aria-label="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>

              {/* Slider */}
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, chapters.length - 1)}
                  step={1}
                  value={isDragging ? dragValue : currentChapterIndex}
                  onChange={handleSliderChange}
                  onMouseDown={handleSliderStart}
                  onTouchStart={handleSliderStart}
                  className="w-full h-1.5 appearance-none bg-text-muted/20 rounded-full accent-[hsl(var(--accent))] cursor-pointer"
                  aria-label="Chapter navigation"
                />
                {/* Progress fill */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-accent/30 pointer-events-none"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Next button */}
              <button
                onClick={onNext}
                disabled={currentChapterIndex >= chapters.length - 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors shrink-0 ${
                  currentChapterIndex >= chapters.length - 1
                    ? 'text-text-muted/20 cursor-not-allowed'
                    : 'text-text hover:bg-surface-hover'
                }`}
                aria-label="Next chapter"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-around px-4 pb-3 pt-1">
          {/* Menu/Drawer */}
          <button
            onClick={onMenuOpen}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            title="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* TTS */}
          <button
            onClick={onTtsToggle}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
              ttsActive
                ? 'bg-accent/20 text-accent hover:bg-accent/30'
                : 'text-text-secondary hover:text-text hover:bg-surface-hover'
            }`}
            title="Text to speech"
          >
            <Volume2 className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Settings */}
          <button
            onClick={onSettings}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            title="Reader settings"
          >
            <Settings className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Safe area padding for mobile */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </div>
    </div>
  )
}
