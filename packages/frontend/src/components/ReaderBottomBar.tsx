import { ChevronLeft, ChevronRight, Settings } from 'lucide-react'

interface ChapterNav {
  id: string
  number: number
  title: string
}

interface ReaderBottomBarProps {
  chapters: ChapterNav[]
  currentChapterIndex: number
  onPrev: () => void
  onNext: () => void
  onChapterSelect: (index: number) => void
  onSettings: () => void
  visible: boolean
  progress: number // 0-100
}

export function ReaderBottomBar({
  chapters,
  currentChapterIndex,
  onPrev,
  onNext,
  onChapterSelect,
  onSettings,
  visible,
  progress,
}: ReaderBottomBarProps) {
  const hasNext = currentChapterIndex < chapters.length - 1
  const hasPrev = currentChapterIndex > 0

  return (
    <>
      {/* Thin progress line */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="h-[2px] bg-border-light/50">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>

      {/* Bottom controls */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-between h-14 px-4">
          {/* Prev chapter */}
          <div className="flex-1 flex justify-start">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                hasPrev ? 'text-text-secondary/70 hover:text-text hover:bg-white/10' : 'text-text-muted/20 cursor-not-allowed'
              }`}
              aria-label="Previous chapter"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Chapter dots */}
          <div className="flex items-center gap-1.5 max-w-[120px] overflow-x-auto scrollbar-none">
            {chapters.slice(Math.max(0, currentChapterIndex - 4), currentChapterIndex + 5).map((ch, i) => {
              const actualIndex = Math.max(0, currentChapterIndex - 4) + i
              const isCurrent = actualIndex === currentChapterIndex
              return (
                <button
                  key={ch.id}
                  onClick={() => onChapterSelect(actualIndex)}
                  className={`transition-all shrink-0 rounded-full ${
                    isCurrent
                      ? 'w-2 h-2 bg-accent'
                      : 'w-1.5 h-1.5 bg-text-muted/30 hover:bg-text-muted/60'
                  }`}
                  aria-label={`Go to chapter ${ch.number}`}
                />
              )
            })}
          </div>

          {/* Next + Settings */}
          <div className="flex-1 flex justify-end gap-1">
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                hasNext ? 'text-text-secondary/70 hover:text-text hover:bg-white/10' : 'text-text-muted/20 cursor-not-allowed'
              }`}
              aria-label="Next chapter"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={onSettings}
              className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary/70 hover:text-text hover:bg-white/10 transition-colors"
              aria-label="Reader settings"
            >
              <Settings className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
