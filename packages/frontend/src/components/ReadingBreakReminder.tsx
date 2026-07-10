import { useState, useEffect, useRef } from 'react'
import { Timer, Eye, BellOff } from 'lucide-react'
import { useScrollLock } from '../hooks/useScrollLock'

interface ReadingBreakReminderProps {
  visible: boolean
  intervalMinutes: number
  onTakeBreak: () => void
  onContinue: () => void
  onSnooze: (minutes: number) => void
}

const SNOOZE_OPTIONS = [5, 10, 15, 30]

export function ReadingBreakReminder({
  visible,
  intervalMinutes,
  onTakeBreak,
  onContinue,
  onSnooze,
}: ReadingBreakReminderProps) {
  const [countdown, setCountdown] = useState(15)
  const [showSnooze, setShowSnooze] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useScrollLock(visible)

  // Auto-dismiss countdown
  useEffect(() => {
    if (!visible) {
      setCountdown(15)
      setShowSnooze(false)
      return
    }
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          onContinue()
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [visible, onContinue])

  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onContinue()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, onContinue])

  if (!visible) return null

  if (showSnooze) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowSnooze(false)} />
        <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-xs animate-in zoom-in-95 fade-in duration-150 p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <BellOff className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-base font-semibold text-text">Snooze Reminder</h3>
            <p className="text-xs text-text-muted mt-1">Remind me again in…</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SNOOZE_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={() => { onSnooze(m); setShowSnooze(false) }}
                className="px-4 py-2.5 rounded-xl bg-surface-hover/50 text-text font-medium text-sm hover:bg-surface-hover transition-colors"
              >
                {m} min
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowSnooze(false)}
            className="w-full mt-3 py-2 text-xs text-text-muted hover:text-text transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onContinue} />
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-sm animate-in zoom-in-95 fade-in duration-150 overflow-hidden">
        {/* Icon */}
        <div className="pt-8 pb-2 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <Eye className="w-8 h-8 text-accent" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-4 text-center">
          <h2 className="text-lg font-bold text-text">Time for a Break!</h2>
          <p className="text-sm text-text-secondary mt-2">
            You've been reading for {intervalMinutes} minutes. Time to stretch your eyes and rest a bit.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <Timer className="w-3.5 h-3.5" />
            <span>Auto-continuing in {countdown}s…</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-2">
          <button
            onClick={onContinue}
            className="w-full py-2.5 rounded-xl bg-accent text-black text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Continue Reading
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSnooze(true)}
              className="flex-1 py-2 rounded-xl bg-surface-hover/50 text-text-secondary text-xs font-medium hover:bg-surface-hover transition-colors"
            >
              Snooze
            </button>
            <button
              onClick={onTakeBreak}
              className="flex-1 py-2 rounded-xl bg-surface-hover/50 text-text-secondary text-xs font-medium hover:bg-surface-hover transition-colors"
            >
              Take a Break
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
