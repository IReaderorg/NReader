import { useEffect, useState } from 'react'
import { Flame } from 'lucide-react'
import { api } from '../api/client'

interface StreakDay {
  date: string
  read: boolean
}

export function StreaksCalendar() {
  const [days, setDays] = useState<StreakDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getStreaks(91)
      .then(setDays)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  // Compute current streak and total days
  let currentStreak = 0
  let totalDays = 0
  const today = new Date().toISOString().slice(0, 10)

  for (const d of [...days].reverse()) {
    if (d.read) {
      totalDays++
      if (currentStreak === 0 && d.date <= today) currentStreak++
      else if (currentStreak > 0 && d.date <= today) currentStreak++
    } else if (d.date <= today) {
      break
    }
  }

  // Group by week for heatmap display (last 13 weeks)
  const weeks: StreakDay[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  // SVG-friendly date for title
  const formatTooltip = (d: StreakDay) => {
    try {
      const dt = new Date(d.date)
      return `${dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${d.read ? 'Read' : 'No reading'}`
    } catch { return d.date }
  }

  // Day-of-week labels
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <div>
      {/* Streak summary */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Flame className="w-6 h-6 text-accent" />
        </div>
        <div>
          <p className="text-lg font-bold text-text tabular-nums">{currentStreak}</p>
          <p className="text-[11px] text-text-muted">day streak</p>
        </div>
        <div className="flex-1" />
        <div className="text-right">
          <p className="text-lg font-bold text-text tabular-nums">{totalDays}</p>
          <p className="text-[11px] text-text-muted">total reads</p>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="flex items-start gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 pr-1 pt-5">
          {dayLabels.map((l, i) => (
            <span key={i} className="text-[9px] text-text-muted/50 h-4 flex items-center">
              {l}
            </span>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex gap-0.5 overflow-x-auto no-scrollbar pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((d, di) => (
                <div
                  key={`${wi}-${di}`}
                  title={formatTooltip(d)}
                  className={`w-4 h-4 rounded-sm transition-colors ${
                    d.read
                      ? 'bg-accent hover:bg-accent/80'
                      : 'bg-surface-hover/30 hover:bg-surface-hover/50'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-2">
        <span className="text-[9px] text-text-muted/50">Less</span>
        <div className="w-3 h-3 rounded-sm bg-surface-hover/30" />
        <div className="w-3 h-3 rounded-sm bg-accent/30" />
        <div className="w-3 h-3 rounded-sm bg-accent/60" />
        <div className="w-3 h-3 rounded-sm bg-accent" />
        <span className="text-[9px] text-text-muted/50">More</span>
      </div>
    </div>
  )
}
