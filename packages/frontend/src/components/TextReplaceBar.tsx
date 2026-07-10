import { useState, useEffect, useCallback, useRef } from 'react'
import { Replace, ReplaceAll, X, ArrowLeft, ArrowRight, History } from 'lucide-react'
import type { TextReplacementEntry } from '../store/reader-store'
import { useReaderStore } from '../store/reader-store'

interface TextReplaceBarProps {
  onReplace: (find: string, replace: string) => void
  onReplaceAll: (find: string, replace: string) => void
  onClose: () => void
  visible: boolean
}

export function TextReplaceBar({
  onReplace,
  onReplaceAll,
  onClose,
  visible,
}: TextReplaceBarProps) {
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const findInputRef = useRef<HTMLInputElement>(null)
  const { textReplacements } = useReaderStore()

  useEffect(() => {
    if (visible && findInputRef.current) {
      findInputRef.current.focus()
    }
  }, [visible])

  useEffect(() => {
    if (!visible) {
      setFind('')
      setReplace('')
      setShowHistory(false)
    }
  }, [visible])

  const handleReplace = useCallback(() => {
    if (!find.trim()) return
    onReplace(find, replace)
  }, [find, replace, onReplace])

  const handleReplaceAll = useCallback(() => {
    if (!find.trim()) return
    onReplaceAll(find, replace)
  }, [find, replace, onReplaceAll])

  const applyHistory = useCallback((entry: TextReplacementEntry) => {
    setFind(entry.find)
    setReplace(entry.replace)
    setShowHistory(false)
  }, [])

  if (!visible) return null

  return (
    <div className="absolute top-14 left-0 right-0 z-30 mx-4 animate-in slide-in-from-top-2 duration-150">
      <div className="bg-surface/95 backdrop-blur-md rounded-2xl border border-border-light shadow-xl px-3 py-2">
        <div className="flex items-center gap-2 mb-2">
          <Replace className="w-4 h-4 text-text-muted shrink-0" />
          <input
            ref={findInputRef}
            type="text"
            value={find}
            onChange={e => setFind(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.shiftKey) handleReplaceAll()
              else if (e.key === 'Enter') handleReplace()
              else if (e.key === 'Escape') onClose()
            }}
            placeholder="Find…"
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted/50 outline-none min-w-0"
            autoComplete="off"
            spellCheck={false}
          />
          {textReplacements.length > 0 && (
            <button
              onClick={() => setShowHistory(v => !v)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${showHistory ? 'bg-accent/20 text-accent' : 'text-text-muted hover:text-text hover:bg-surface-hover'}`}
              aria-label="Replacement history"
            >
              <History className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors shrink-0"
            aria-label="Close replace"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Replace row */}
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            value={replace}
            onChange={e => setReplace(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.shiftKey) handleReplaceAll()
              else if (e.key === 'Enter') handleReplace()
              else if (e.key === 'Escape') onClose()
            }}
            placeholder="Replace with…"
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted/50 outline-none min-w-0"
            autoComplete="off"
            spellCheck={false}
          />
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={handleReplace}
              disabled={!find.trim()}
              className="px-2 py-1 rounded-lg text-[11px] font-medium bg-accent/10 text-accent hover:bg-accent/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <Replace className="w-3 h-3" /> Replace
            </button>
            <button
              onClick={handleReplaceAll}
              disabled={!find.trim()}
              className="px-2 py-1 rounded-lg text-[11px] font-medium bg-surface-hover/50 text-text-secondary hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <ReplaceAll className="w-3 h-3" /> All
            </button>
          </div>
        </div>

        {/* History dropdown */}
        {showHistory && textReplacements.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border-light max-h-32 overflow-y-auto">
            {textReplacements.map(entry => (
              <button
                key={entry.id}
                onClick={() => applyHistory(entry)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors text-left"
              >
                <ArrowLeft className="w-3 h-3 text-text-muted shrink-0" />
                <code className="text-xs text-text truncate">{entry.find}</code>
                <ArrowRight className="w-3 h-3 text-text-muted shrink-0" />
                <code className="text-xs text-accent truncate">{entry.replace}</code>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}