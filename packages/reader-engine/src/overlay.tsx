import { useEffect, useCallback, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  X, Sun, Moon, Minus, Plus, BookOpen, Layout, AlignLeft,
  Type, AlignCenter, AlignRight, AlignJustify, Play, Square,
  Palette, Filter, GripVertical
} from 'lucide-react'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

type ReaderMode = 'webtoon' | 'pager' | 'text'
type TextAlignment = 'left' | 'center' | 'right' | 'justify'
type ColorFilterType = 'none' | 'sepia' | 'invert' | 'grayscale'

interface ReaderOverlayProps {
  currentMode: ReaderMode
  onModeChange?: (mode: ReaderMode) => void
  brightness: number
  onBrightnessChange?: (value: number) => void
  fontSize: number
  onFontSizeChange?: (value: number) => void
  lineHeight?: number
  onLineHeightChange?: (value: number) => void
  paragraphSpacing?: number
  onParagraphSpacingChange?: (value: number) => void
  paragraphIndent?: number
  onParagraphIndentChange?: (value: number) => void
  textAlignment?: TextAlignment
  onTextAlignmentChange?: (align: TextAlignment) => void
  currentPage: number
  totalPages: number
  progress: number
  /** Auto-scroll */
  autoScrollActive?: boolean
  autoScrollSpeed?: number
  onAutoScrollToggle?: () => void
  onAutoScrollSpeedChange?: (speed: number) => void
  /** Color filter */
  colorFilter?: ColorFilterType
  onColorFilterChange?: (filter: ColorFilterType) => void
  /** Theme quick switch */
  availableThemes?: { id: string; name: string; colors: Record<string, string> }[]
  selectedThemeId?: string
  onThemeSelect?: (id: string) => void
  onClose?: () => void
  visible: boolean
}

const MODES: { key: ReaderMode; label: string; icon: typeof BookOpen }[] = [
  { key: 'webtoon', label: 'Webtoon', icon: Layout },
  { key: 'pager', label: 'Pager', icon: BookOpen },
  { key: 'text', label: 'Text', icon: AlignLeft },
]

const ALIGNMENTS: { key: TextAlignment; icon: typeof AlignCenter }[] = [
  { key: 'left', icon: AlignLeft },
  { key: 'center', icon: AlignCenter },
  { key: 'right', icon: AlignRight },
  { key: 'justify', icon: AlignJustify },
]

const COLOR_FILTERS: { key: ColorFilterType; label: string }[] = [
  { key: 'none', label: 'Normal' },
  { key: 'sepia', label: 'Sepia' },
  { key: 'invert', label: 'Invert' },
  { key: 'grayscale', label: 'Gray' },
]

export function ReaderOverlay({
  currentMode,
  onModeChange,
  brightness,
  onBrightnessChange,
  fontSize,
  onFontSizeChange,
  lineHeight = 1.8,
  onLineHeightChange,
  paragraphSpacing = 16,
  onParagraphSpacingChange,
  paragraphIndent = 0,
  onParagraphIndentChange,
  textAlignment = 'left',
  onTextAlignmentChange,
  currentPage,
  totalPages,
  progress,
  autoScrollActive = false,
  autoScrollSpeed = 5,
  onAutoScrollToggle,
  onAutoScrollSpeedChange,
  colorFilter = 'none',
  onColorFilterChange,
  availableThemes,
  selectedThemeId,
  onThemeSelect,
  onClose,
  visible,
}: ReaderOverlayProps) {
  const [showLayout, setShowLayout] = useState(false)

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
        <div className="flex items-center gap-1">
          {/* Layout toggle */}
          <button
            onClick={() => setShowLayout(v => !v)}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
              showLayout ? 'bg-accent/20 text-accent' : 'text-text-secondary hover:bg-white/10'
            )}
            title="Layout settings"
          >
            <GripVertical className="w-4 h-4" />
          </button>
          {/* Theme quick switch */}
          {availableThemes && availableThemes.length > 0 && (
            <div className="flex gap-1 px-2">
              {availableThemes.slice(0, 5).map(theme => (
                <button
                  key={theme.id}
                  onClick={() => onThemeSelect?.(theme.id)}
                  className={cn(
                    'w-7 h-7 rounded-full border-2 transition-all',
                    selectedThemeId === theme.id
                      ? 'border-accent scale-110'
                      : 'border-transparent hover:scale-105'
                  )}
                  style={{ backgroundColor: theme.colors.background }}
                  title={theme.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center — Mode picker + Layout panel */}
      <div className="flex flex-col items-center gap-3 px-4">
        {/* Mode picker */}
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

        {/* Layout panel (collapsible) */}
        {showLayout && (
          <div className="w-full max-w-sm bg-[hsl(var(--surface))]/90 backdrop-blur-sm rounded-2xl p-4 space-y-4 animate-in slide-in-from-bottom-2 duration-150">
            {/* Text alignment */}
            {onTextAlignmentChange && (
              <div>
                <label className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-2 block">Alignment</label>
                <div className="flex gap-1">
                  {ALIGNMENTS.map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => onTextAlignmentChange(key)}
                      className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center transition-all text-xs',
                        textAlignment === key
                          ? 'bg-accent text-black'
                          : 'text-text-secondary hover:bg-white/10'
                      )}
                      title={key}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Line height */}
            {onLineHeightChange && (
              <div>
                <label className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-2 block">
                  Line Height: {lineHeight.toFixed(1)}
                </label>
                <input
                  type="range"
                  min={1.0}
                  max={2.5}
                  step={0.1}
                  value={lineHeight}
                  onChange={e => onLineHeightChange(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
                />
              </div>
            )}

            {/* Paragraph spacing */}
            {onParagraphSpacingChange && (
              <div>
                <label className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-2 block">
                  Para Spacing: {paragraphSpacing}px
                </label>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={paragraphSpacing}
                  onChange={e => onParagraphSpacingChange(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
                />
              </div>
            )}

            {/* Paragraph indent */}
            {onParagraphIndentChange && (
              <div>
                <label className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-2 block">
                  Indent: {paragraphIndent}px
                </label>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={paragraphIndent}
                  onChange={e => onParagraphIndentChange(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
                />
              </div>
            )}

            {/* Color filters */}
            {onColorFilterChange && (
              <div>
                <label className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-2 block">Color Filter</label>
                <div className="flex gap-1">
                  {COLOR_FILTERS.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => onColorFilterChange(key)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                        colorFilter === key
                          ? 'bg-accent text-black'
                          : 'text-text-secondary hover:bg-white/10'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom — Controls */}
      <div className="px-6 pb-6 pt-4 bg-[hsl(var(--surface))]/90 backdrop-blur-sm space-y-4">
        {/* Brightness */}
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-text-secondary shrink-0" />
          <input
            type="range"
            min={0}
            max={100}
            value={brightness}
            onChange={e => onBrightnessChange?.(Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
          />
          <Moon className="w-4 h-4 text-text-secondary shrink-0" />
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-3">
          <Minus className="w-4 h-4 text-text-secondary shrink-0" />
          <input
            type="range"
            min={12}
            max={36}
            value={fontSize}
            onChange={e => onFontSizeChange?.(Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
          />
          <Plus className="w-4 h-4 text-text-secondary shrink-0" />
          <span className="text-xs text-text-secondary min-w-[2rem] text-right">{fontSize}px</span>
        </div>

        {/* Auto-scroll */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAutoScrollToggle}
            className={cn(
              'w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0',
              autoScrollActive
                ? 'bg-accent text-black'
                : 'bg-white/10 text-text-secondary hover:bg-white/20'
            )}
            title={autoScrollActive ? 'Stop auto-scroll' : 'Start auto-scroll'}
          >
            {autoScrollActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          {autoScrollActive && (
            <>
              <span className="text-[11px] text-text-secondary">Speed</span>
              <input
                type="range"
                min={1}
                max={10}
                value={autoScrollSpeed}
                onChange={e => onAutoScrollSpeedChange?.(Number(e.target.value))}
                className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
              />
              <span className="text-xs text-text-secondary min-w-[1.5rem]">{autoScrollSpeed}</span>
            </>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Progress</span>
            <span>{currentPage + 1} / {totalPages || '?'}</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
