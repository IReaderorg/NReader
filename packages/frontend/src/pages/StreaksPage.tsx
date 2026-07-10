import { useEffect, useState } from 'react'
import { ArrowLeft, Flame, CalendarDays, Trophy, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

interface StreakDay { date: string; read: boolean }

export function StreaksDetailPage() {
  const navigate = useNavigate()
  const [days, setDays] = useState<StreakDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getStreaks(365)
      .then(setDays)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  const today = new Date().toISOString().slice(0, 10)
  const reversed = [...days].reverse()

  // Compute current streak (consecutive days ending at today)
  let currentStreak = 0
  for (const d of reversed) {
    if (d.date > today) continue
    if (d.read) currentStreak++
    else break
  }

  // Compute total days and longest streak (full pass, no early break)
  let totalDays = 0
  let longestStreak = 0
  let runningStreak = 0
  for (const d of reversed) {
    if (d.date > today) continue
    if (d.read) {
      totalDays++
      runningStreak++
      longestStreak = Math.max(longestStreak, runningStreak)
    } else {
      runningStreak = 0
    }
  }

  // Current year stats
  const currentYear = new Date().getFullYear()
  const yearDays = days.filter(d => d.date.startsWith(`${currentYear}`) && d.read)
  const yearMonths = new Set(yearDays.map(d => d.date.slice(0, 7))).size

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-base font-bold text-text">Streaks</h1>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 rounded-2xl border border-border-light bg-surface">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-accent" />
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Current</span>
          </div>
          <p className="text-2xl font-bold text-text tabular-nums">{currentStreak}</p>
          <p className="text-xs text-text-muted">day streak</p>
        </div>
        <div className="p-4 rounded-2xl border border-border-light bg-surface">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Longest</span>
          </div>
          <p className="text-2xl font-bold text-text tabular-nums">{longestStreak}</p>
          <p className="text-xs text-text-muted">day streak</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 rounded-2xl border border-border-light bg-surface">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-4 h-4 text-text-secondary" />
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">This Year</span>
          </div>
          <p className="text-2xl font-bold text-text tabular-nums">{totalDays}</p>
          <p className="text-xs text-text-muted">reading days</p>
        </div>
        <div className="p-4 rounded-2xl border border-border-light bg-surface">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-text-secondary" />
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">{currentYear}</span>
          </div>
          <p className="text-2xl font-bold text-text tabular-nums">{yearMonths}</p>
          <p className="text-xs text-text-muted">months active</p>
        </div>
      </div>

      {/* Month-by-month heatmaps */}
      <h2 className="text-sm font-semibold text-text mb-3">Monthly Activity</h2>
      {renderMonths(days)}
    </div>
  )
}

function renderMonths(days: StreakDay[]) {
  const months: Map<string, StreakDay[]> = new Map()
  for (const d of days) {
    const key = d.date.slice(0, 7)
    if (!months.has(key)) months.set(key, [])
    months.get(key)!.push(d)
  }

  return (
    <div className="space-y-4">
      {Array.from(months.entries()).reverse().slice(0, 6).map(([month, monthDays]) => (
        <div key={month} className="p-3 rounded-xl border border-border-light bg-surface/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-text-secondary">
              {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <p className="text-[10px] text-text-muted tabular-nums">
              {monthDays.filter(d => d.read).length}/{monthDays.length} days
            </p>
          </div>
          <div className="flex gap-0.5 flex-wrap">
            {monthDays.map(d => (
              <div
                key={d.date}
                title={d.date}
                className={`w-3 h-3 rounded-sm ${d.read ? 'bg-accent' : 'bg-surface-hover/30'}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
