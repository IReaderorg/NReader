import { useEffect, useState, useRef, useCallback } from 'react'
import { Clock } from 'lucide-react'

interface ReadingTimeIndicatorProps {
  /** When the reading session started (timestamp ms) */
  sessionStartTime: number | null
  /** Whether the indicator is visible */
  visible: boolean
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function ReadingTimeIndicator({ sessionStartTime, visible }: ReadingTimeIndicatorProps) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (sessionStartTime) {
        setElapsed(Math.floor((Date.now() - sessionStartTime) / 1000))
      }
    }, 1000)
  }, [sessionStartTime])

  useEffect(() => {
    if (visible && sessionStartTime) {
      setElapsed(Math.floor((Date.now() - sessionStartTime) / 1000))
      startTimer()
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [visible, sessionStartTime, startTimer])

  if (!visible || !sessionStartTime) return null

  return (
    <div className="absolute bottom-28 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border-light shadow-lg pointer-events-none animate-in fade-in duration-300">
      <Clock className="w-3 h-3 text-text-muted" />
      <span className="text-[11px] font-medium text-text-muted tabular-nums">
        {formatTime(elapsed)}
      </span>
    </div>
  )
}
