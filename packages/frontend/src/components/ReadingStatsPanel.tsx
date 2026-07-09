import { useState, useEffect, useRef } from 'react'
import { X, Clock, Type, Gauge, CheckCheck } from 'lucide-react'
import { useScrollLock } from '../hooks/useScrollLock'

interface ReadingStatsPanelProps {
  visible: boolean
  onClose: () => void
  /** When the reading session started (timestamp ms) */
  sessionStartTime: number
  /** Current chapter's text content for word count */
  textContent: string
  /** Number of chapters read this session */
  chaptersRead: number
}

/** Count words in a string */
function countWords(text: string): number {
  if (!text.trim()) return 0
  return text.trim().split(/\s+/).length
}

/** Format seconds to h:mm:ss or m:ss */
function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
  if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`
  return `${s}s`
}

interface StatCardProps {
  icon: typeof Clock
  label: string
  value: string
  color?: 'accent' | 'text' | 'muted'
}

function StatCard({ icon: Icon, label, value, color = 'accent' }: StatCardProps) {
  const colorMap = {
    accent: 'bg-accent/10 text-accent',
    text: 'bg-surface-hover/50 text-text',
    muted: 'bg-surface-hover/30 text-text-muted',
  }
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-hover/30">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-text tabular-nums">{value}</p>
      </div>
    </div>
  )
}

export function ReadingStatsPanel({
  visible,
  onClose,
  sessionStartTime,
  textContent,
  chaptersRead,
}: ReadingStatsPanelProps) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useScrollLock(visible)

  // Live timer
  useEffect(() => {
    if (visible) {
      setElapsed(Math.floor((Date.now() - sessionStartTime) / 1000))
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - sessionStartTime) / 1000))
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [visible, sessionStartTime])

  // Escape handler
  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  if (!visible) return null

  const wordsInChapter = countWords(textContent)
  const minutes = elapsed / 60
  const wpm = minutes > 0.1 ? Math.round(wordsInChapter / minutes) : 0

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-150" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-sm animate-in zoom-in-95 fade-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
              <Gauge className="w-4 h-4 text-accent" />
            </div>
            <h2 className="text-base font-semibold text-text">Reading Stats</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats grid */}
        <div className="p-4 space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <StatCard
              icon={Clock}
              label="Session Time"
              value={formatDuration(elapsed)}
              color="accent"
            />
            <StatCard
              icon={CheckCheck}
              label="Chapters Read"
              value={String(chaptersRead)}
              color="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <StatCard
              icon={Type}
              label="Words in Chapter"
              value={wordsInChapter.toLocaleString()}
              color="muted"
            />
            <StatCard
              icon={Gauge}
              label="Reading Speed"
              value={wpm > 0 ? `${wpm} wpm` : 'Calculating…'}
              color="text"
            />
          </div>

          {/* Reading pace indicator */}
          <div className="p-3 rounded-xl bg-surface-hover/30 text-center">
            <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Pace</p>
            <p className="text-xs text-text-secondary">
              {wpm === 0 && 'Just getting started…'}
              {wpm > 0 && wpm < 150 && '🐢 Taking your time — savoring every word!'}
              {wpm >= 150 && wpm < 250 && '📖 Steady pace — nice and comfortable.'}
              {wpm >= 250 && wpm < 400 && '🚀 Speed reading — you\'re flying!'}
              {wpm >= 400 && '⚡ Lightning fast — slow down and enjoy!'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-4 border-t border-border-light">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-accent text-black text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
