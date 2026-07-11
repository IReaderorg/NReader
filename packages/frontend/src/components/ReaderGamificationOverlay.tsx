import { useEffect, useState } from 'react'
import { Flame, Gem } from 'lucide-react'
import { api } from '../api/client'

interface GamificationStats {
  streakLength: number
  totalChapters: number
  totalTimeMs: number
  spiritStones?: number
}

interface ReaderGamificationOverlayProps {
  /** Whether the reader bars are visible */
  barsVisible?: boolean
  /** Optional custom class name */
  className?: string
}

/**
 * ReaderGamificationOverlay - Shows reading streak, spirit stones, achievements.
 * Based on IReader's ReaderGamificationOverlay.kt
 * Renders as a small floating badge in the bottom-right corner of the reader.
 * Fetches stats from /api/v1/streaks and /api/v1/reading-stats/insights
 */
export function ReaderGamificationOverlay({ barsVisible = true, className = '' }: ReaderGamificationOverlayProps) {
  const [stats, setStats] = useState<GamificationStats | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([
      api.getStreaks(7).catch(() => [] as { date: string; read: boolean }[]),
      api.getInsights().catch(() => null),
    ]).then(([streaks, insights]) => {
      if (cancelled) return
      // Calculate streak from streaks array
      const streakLength = streaks.filter(s => s.read).length || insights?.streakLength || 0
      setStats({
        streakLength,
        totalChapters: insights?.totalChapters || 0,
        totalTimeMs: insights?.totalTimeMs || 0,
        spiritStones: Math.floor((insights?.totalChapters || 0) / 10), // 1 stone per 10 chapters
      })
      setLoading(false)
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  // Don't render if we have no stats yet or bars are hidden
  if (!barsVisible || (!stats?.streakLength && !stats?.spiritStones)) return null

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Streak badge */}
      {stats.streakLength > 0 && (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border-light shadow-sm animate-in fade-in"
          title={`${stats.streakLength}-day reading streak`}
        >
          <Flame className={`w-3.5 h-3.5 ${stats.streakLength >= 3 ? 'text-orange-400' : 'text-text-muted'}`} />
          <span className="text-[11px] font-semibold text-text-secondary tabular-nums">
            {stats.streakLength}
          </span>
          <span className="text-[9px] text-text-muted hidden sm:inline">day streak</span>
        </div>
      )}

      {/* Spirit stones / time badge */}
      {(stats.spiritStones || 0) > 0 && (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border-light shadow-sm animate-in fade-in"
          title={`${stats.totalChapters} chapters read, ${formatTime(stats.totalTimeMs)} total`}
        >
          <Gem className="w-3 h-3 text-cyan-400" />
          <span className="text-[11px] font-semibold text-text-secondary tabular-nums">
            {stats.spiritStones}
          </span>
          <span className="text-[9px] text-text-muted hidden sm:inline">stones</span>
        </div>
      )}
    </div>
  )
}
