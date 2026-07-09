import { useState, useEffect, useCallback, useRef } from 'react'
import { Search, ArrowUp, ArrowDown, X } from 'lucide-react'

interface FindInChapterProps {
  onQueryChange: (query: string) => void
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  /** Number of matches found */
  matchCount: number
  /** Current match index (0-based) */
  currentMatch: number
  visible: boolean
}

export function FindInChapterBar({
  onQueryChange,
  onNext,
  onPrev,
  onClose,
  matchCount,
  currentMatch,
  visible,
}: FindInChapterProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when visible
  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [visible])

  // Reset on hide
  useEffect(() => {
    if (!visible) {
      setQuery('')
    }
  }, [visible])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    onQueryChange(val)
  }, [onQueryChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.shiftKey) {
        onPrev()
      } else {
        onNext()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }, [onNext, onPrev, onClose])

  if (!visible) return null

  return (
    <div className="absolute top-14 left-0 right-0 z-30 mx-4 animate-in slide-in-from-top-2 duration-150">
      <div className="bg-surface/95 backdrop-blur-md rounded-2xl border border-border-light shadow-xl px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Search icon */}
          <Search className="w-4 h-4 text-text-muted shrink-0" />

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Find in chapter…"
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted/50 outline-none min-w-0"
            autoComplete="off"
            spellCheck={false}
          />

          {/* Match counter */}
          {query.length > 0 && (
            <span className="text-xs text-text-muted font-medium shrink-0 min-w-[3rem] text-right">
              {matchCount > 0
                ? `${currentMatch + 1}/${matchCount}`
                : '0/0'}
            </span>
          )}

          {/* Navigation arrows */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={onPrev}
              disabled={matchCount === 0}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous match"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNext}
              disabled={matchCount === 0}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next match"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors shrink-0"
            aria-label="Close find"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
