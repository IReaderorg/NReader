import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Clock, BookOpen, ArrowUpDown, ChevronRight, Gauge, Target } from 'lucide-react'
import { api } from '../api/client'
import { StreaksCalendar } from '../components/StreaksCalendar'

interface ReadingStats {
  mangaId: string
  sourceId: string
  totalTimeMs: number
  chaptersRead: number
  lastReadAt: string
}

type SortKey = 'totalTimeMs' | 'chaptersRead' | 'lastReadAt'

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return '<1m'
}

function formatDate(iso: string): string {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return d.toLocaleDateString()
  } catch {
    return iso
  }
}

export function ReadingStatsPage() {
  const [stats, setStats] = useState<ReadingStats[]>([])
  const [titles, setTitles] = useState<Map<string, string>>(new Map())
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('lastReadAt')
  const [sortAsc, setSortAsc] = useState(false)

  useEffect(() => {
    Promise.all([
      api.getAllReadingStats(),
      api.getLibrary().catch(() => []),
    ])
      .then(([s, lib]) => {
        setStats(s)
        const map = new Map<string, string>()
        for (const entry of lib) {
          map.set(entry.mangaId, entry.title)
        }
        setTitles(map)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const sorted = useMemo(() => {
    const arr = [...stats]
    arr.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'totalTimeMs') cmp = a.totalTimeMs - b.totalTimeMs
      else if (sortKey === 'chaptersRead') cmp = a.chaptersRead - b.chaptersRead
      else cmp = new Date(a.lastReadAt).getTime() - new Date(b.lastReadAt).getTime()
      return sortAsc ? cmp : -cmp
    })
    return arr
  }, [stats, sortKey, sortAsc])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(v => !v)
    } else {
      setSortKey(key)
      setSortAsc(false)
    }
  }

  return (
    <div>
      <h1 className="text-base font-bold text-text mb-4">Reading Stats</h1>

      {/* Streaks Calendar */}
      <div className="mb-6 p-4 rounded-2xl border border-border-light bg-surface">
        <StreaksCalendar />
      </div>

      {/* Reading Goals */}
      <ReadingGoalsSection />

      <h1 className="text-base font-bold text-text mb-4">Per-Manga Stats</h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center mb-4">
            <Gauge className="w-8 h-8 text-text-muted/40" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-text-muted">No reading stats yet</p>
          <p className="text-xs text-text-muted/60 mt-1">Start reading to track your progress</p>
        </div>
      ) : (
        <>
          {/* Sort bar */}
          <div className="flex items-center gap-1 mb-3 overflow-x-auto no-scrollbar">
            {([
              { key: 'lastReadAt' as SortKey, label: 'Last Read', icon: Clock },
              { key: 'totalTimeMs' as SortKey, label: 'Time', icon: Clock },
              { key: 'chaptersRead' as SortKey, label: 'Chapters', icon: BookOpen },
            ]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                  sortKey === key
                    ? 'bg-accent/10 text-accent'
                    : 'bg-surface-hover/30 text-text-muted hover:bg-surface-hover/50'
                }`}
              >
                <Icon className="w-3 h-3" />
                {label}
                {sortKey === key && (
                  <ArrowUpDown className={`w-3 h-3 transition-transform ${sortAsc ? 'rotate-180' : ''}`} />
                )}
              </button>
            ))}
          </div>

          {/* Stats list */}
          <div className="space-y-1">
            {sorted.map(s => (
              <Link
                key={s.mangaId}
                to={`/sources/${s.sourceId}/manga/${s.mangaId}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border-light bg-surface hover:bg-surface-hover transition-colors group"
              >
                {/* Time icon */}
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-accent/60" strokeWidth={1.5} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">
                    {titles.get(s.mangaId) || s.mangaId}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(s.totalTimeMs)}
                    </span>
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {s.chaptersRead} ch
                    </span>
                    <span className="text-[11px] text-text-muted/60">
                      {formatDate(s.lastReadAt)}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-text-muted/30 group-hover:text-accent transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ReadingGoalsSection() {
  const [goals, setGoals] = useState<{ dailyTimeMinutes: number; dailyChapters: number } | null>(null)
  const [editing, setEditing] = useState(false)
  const [timeInput, setTimeInput] = useState('')
  const [chInput, setChInput] = useState('')

  useEffect(() => {
    api.getGoals().then(g => {
      setGoals(g)
      setTimeInput(String(g.dailyTimeMinutes))
      setChInput(String(g.dailyChapters))
    }).catch(() => {})
  }, [])

  if (!goals || (goals.dailyTimeMinutes === 0 && goals.dailyChapters === 0 && !editing)) {
    return (
      <div className="mb-6 p-4 rounded-2xl border border-border-light bg-surface">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-text">Reading Goals</span>
          </div>
          <button onClick={() => { setEditing(true); setTimeInput('30'); setChInput('5') }}
            className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors">
            Set Goals
          </button>
        </div>
        <p className="text-xs text-text-muted mt-2">Set daily reading time and chapter targets to track your progress</p>
      </div>
    )
  }

  if (editing) return (
    <div className="mb-6 p-4 rounded-2xl border border-border-light bg-surface">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-text">Set Goals</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted w-24">Daily time (min)</span>
          <input value={timeInput} onChange={e => setTimeInput(e.target.value)}
            type="number" min={0} max={480}
            className="flex-1 bg-surface-hover/30 border border-border-light rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent/50" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted w-24">Daily chapters</span>
          <input value={chInput} onChange={e => setChInput(e.target.value)}
            type="number" min={0} max={100}
            className="flex-1 bg-surface-hover/30 border border-border-light rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent/50" />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-surface-hover">Cancel</button>
          <button onClick={() => {
            const t = Math.max(0, parseInt(timeInput) || 0)
            const c = Math.max(0, parseInt(chInput) || 0)
            api.setGoals({ dailyTimeMinutes: t, dailyChapters: c }).then(g => {
              setGoals(g)
              setEditing(false)
            }).catch(() => {})
          }} className="px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium">Save</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="mb-6 p-4 rounded-2xl border border-border-light bg-surface">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-text">Daily Goals</span>
        </div>
        <button onClick={() => {
          setEditing(true)
          setTimeInput(String(goals.dailyTimeMinutes))
          setChInput(String(goals.dailyChapters))
        }} className="text-xs text-accent hover:underline">Edit</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-surface-hover/30 text-center">
          <p className="text-lg font-bold text-text tabular-nums">{goals.dailyTimeMinutes}</p>
          <p className="text-[10px] text-text-muted">min / day</p>
        </div>
        <div className="p-3 rounded-xl bg-surface-hover/30 text-center">
          <p className="text-lg font-bold text-text tabular-nums">{goals.dailyChapters}</p>
          <p className="text-[10px] text-text-muted">ch / day</p>
        </div>
      </div>
    </div>
  )
}
