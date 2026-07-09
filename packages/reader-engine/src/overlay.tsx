import { useEffect, useCallback } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { X, Sun, Moon, Minus, Plus, BookOpen, Layout, AlignLeft } from 'lucide-react'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

type ReaderMode = 'webtoon' | 'pager' | 'text'

interface ReaderOverlayProps {
  currentMode: ReaderMode
  onModeChange?: (mode: ReaderMode) => void
  brightness: number
  onBrightnessChange?: (value: number) => void
  fontSize: number
  onFontSizeChange?: (value: number) => void
  currentPage: number
  totalPages: number
  progress: number
  onClose?: () => void
  visible: boolean
}

const MODES: { key: ReaderMode; label: string; icon: typeof BookOpen }[] = [
  { key: 'webtoon', label: 'Webtoon', icon: Layout },
  { key: 'pager', label: 'Pager', icon: BookOpen },
  { key: 'text', label: 'Text', icon: AlignLeft },
]

export function ReaderOverlay({
  currentMode,
  onModeChange,
  brightness,
  onBrightnessChange,
  fontSize,
  onFontSizeChange,
  currentPage,
  totalPages,
  progress,
  onClose,
  visible,
}: ReaderOverlayProps) {
  // Close on Escape
  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, onClose])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose?.()
  }, [onClose])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex flex-col justify-between transition-opacity duration-200 animate-in fade-in"
      onClick={handleBackdropClick}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[hsl(var(--surface))]/90 backdrop-blur-sm">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-text"
          aria-label="Close overlay"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-sm text-text font-medium">Reader Settings</span>
        <div className="w-10" />
      </div>

      {/* Center — Mode picker */}
      <div className="flex items-center justify-center gap-2 px-4">
        <div className="flex rounded-2xl bg-[hsl(var(--surface))]/90 backdrop-blur-sm p-1.5 gap-1">
          {MODES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onModeChange?.(key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                currentMode === key
                  ? 'bg-[hsl(var(--accent))] text-black shadow-lg'
                  : 'text-text-secondary hover:text-text hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom — Controls */}
      <div className="px-6 pb-8 pt-4 bg-[hsl(var(--surface))]/90 backdrop-blur-sm space-y-5">
        {/* Brightness */}
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-text-secondary shrink-0" />
          <input
            type="range"
            min={0}
            max={100}
            value={brightness}
            onChange={e => onBrightnessChange?.(Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--accent))]"
          />
          <Moon className="w-4 h-4 text-text-secondary shrink-0" />
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-3">
          <Minus className="w-4 h-4 text-text-secondary shrink-0" />
          <input
            type="range"
            min={12}
            max={32}
            value={fontSize}
            onChange={e => onFontSizeChange?.(Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--accent))]"
          />
          <Plus className="w-4 h-4 text-text-secondary shrink-0" />
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Progress</span>
            <span>{currentPage + 1} / {totalPages}</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center text-xs text-text-secondary mt-1">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  )
}
