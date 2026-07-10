import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Clock, BookOpen, ArrowUpDown, ChevronRight, Gauge, Target, Flame, Star, BarChart3 } from 'lucide-react'
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
type PeriodTab = 'daily' | 'weekly' | 'monthly'
type ChartPeriod = 7 | 30 | 90

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
  } catch { return iso }
}

function BarChart({ data, label }: { data: Array<{ date: string; value: number }>; label: string }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-1 h-24">
      {data.map((d, i) => {
        const h = Math.max((d.value / max) * 100, d.value > 0 ? 4 : 0)
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group relative">
            <div className="w-full bg-accent/20 rounded-t" style={{ height: `${h}%`, minHeight: d.value > 0 ? '4px' : '0' }} title={`${d.date}: ${d.value} ${label}`} />
            {data.length <= 14 && (
              <span className="text-[7px] text-text-muted/60 truncate w-full text-center">{d.date.slice(d.date.length - 5)}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function ReadingStatsPage() {
  const [stats, setStats] = useState<ReadingStats[]>([])
  const [titles, setTitles] = useState<Map<string, string>>(new Map())
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('lastReadAt')
  const [sortAsc, setSortAsc] = useState(false)
  const [periodTab, setPeriodTab] = useState<PeriodTab>('daily')
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>(7)
  const [insights, setInsights] = useState<{ totalBooksRead: number; totalChapters: number; totalTimeMs: number; completedThisMonth: number; streakLength: number } | null>(null)
  const [chartData, setChartData] = useState<Array<{ date: string; chaptersRead: number; totalTimeMs: number; count: number }>>([])
  const [recommendations, setRecommendations] = useState<Array<{ mangaId: string; sourceId: string; chaptersRead: number }>>([])

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.getAllReadingStats(),
      api.getLibrary().catch(() => []),
      api.getInsights().catch(() => null),
    ]).then(([s, lib, ins]) => {
      setStats(s)
      const map = new Map<string, string>()
      for (const entry of lib) map.set(entry.mangaId, entry.title)
      setTitles(map)
      if (ins) setInsights(ins)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const fn = periodTab === 'daily' ? api.getDailyStats : periodTab === 'weekly' ? api.getWeeklyStats : api.getMonthlyStats
    fn().then(r => setChartData(r.data)).catch(() => {})
  }, [periodTab])

  useEffect(() => {
    api.getRecommendations().then(setRecommendations).catch(() => {})
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

  const chartDataFiltered = useMemo(() => {
    return chartData.slice(-chartPeriod).map(d => ({
      date: d.date,
      value: d.chaptersRead,
    }))
  }, [chartData, chartPeriod])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(v => !v)
    else { setSortKey(key); setSortAsc(false) }
  }

  return (
    <div>
      <h1 className="text-base font-bold text-text mb-4">Reading Stats</h1>

      {/* Library Insights Cards */}
      {insights && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-3 rounded-xl bg-surface border border-border-light">
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Books Read</p>
            <p className="text-lg font-bold text-text tabular-nums mt-0.5">{insights.totalBooksRead}</p>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-border-light">
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Chapters</p>
            <p className="text-lg font-bold text-text tabular-nums mt-0.5">{insights.totalChapters}</p>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-border-light">
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Total Time</p>
            <p className="text-lg font-bold text-text tabular-nums mt-0.5">{formatTime(insights.totalTimeMs)}</p>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-border-light">
            <p className="text-[10px] text-text-muted uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" strokeWidth={1.5} />
              Streak
            </p>
            <p className="text-lg font-bold text-text tabular-nums mt-0.5">{insights.streakLength} days</p>
          </div>
        </div>
      )}

      {/* Progress Chart */}
      <div className="mb-5 p-4 rounded-2xl border border-border-light bg-surface">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-text flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Chapters per day
          </h2>
          <div className="flex gap-1">
            {([7, 30, 90] as ChartPeriod[]).map(p => (
              <button
                key={p}
                onClick={() => setChartPeriod(p)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${chartPeriod === p ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-surface-hover'}`}
              >{p}d</button>
            ))}
          </div>
        </div>
        <BarChart data={chartDataFiltered} label="ch" />
      </div>

      {/* Period Tabs */}
      <div className="flex gap-1 mb-3">
        {(['daily', 'weekly', 'monthly'] as PeriodTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setPeriodTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${periodTab === tab ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-surface-hover'}`}
          >{tab}</button>
        ))}
      </div>

      {/* Streaks Calendar */}
      <div className="mb-5 p-4 rounded-2xl border border-border-light bg-surface">
        <StreaksCalendar />
      </div>

      {/* Goals */}
      <ReadingGoalsSection />

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-5 p-4 rounded-2xl border border-border-light bg-surface">
          <h2 className="text-xs font-semibold text-text mb-3 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Most Read
          </h2>
          <div className="space-y-1">
            {recommendations.slice(0, 5).map(r => (
              <Link
                key={r.mangaId}
                to={`/sources/${r.sourceId}/manga/${r.mangaId}`}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors"
              >
                <BookOpen className="w-3 h-3 text-accent/60" strokeWidth={1.5} />
                <span className="text-xs text-text truncate flex-1">{titles.get(r.mangaId) || r.mangaId}</span>
                <span className="text-[10px] text-text-muted">{r.chaptersRead} ch</span>
              </Link>
            ))}
          </div>
        </div>
      )}

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
                  sortKey === key ? 'bg-accent/10 text-accent' : 'bg-surface-hover/30 text-text-muted hover:bg-surface-hover/50'
                }`}
              >
                <Icon className="w-3 h-3" />
                {label}
                {sortKey === key && <ArrowUpDown className={`w-3 h-3 transition-transform ${sortAsc ? 'rotate-180' : ''}`} />}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {sorted.map(s => (
              <Link
                key={s.mangaId}
                to={`/sources/${s.sourceId}/manga/${s.mangaId}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border-light bg-surface hover:bg-surface-hover transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-accent/60" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{titles.get(s.mangaId) || s.mangaId}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />{formatTime(s.totalTimeMs)}
                    </span>
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />{s.chaptersRead} ch
                    </span>
                    <span className="text-[11px] text-text-muted/60">{formatDate(s.lastReadAt)}</span>
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
  const [todayProgress, setTodayProgress] = useState({ chapters: 0, minutes: 0 })

  useEffect(() => {
    api.getGoals().then(g => {
      setGoals(g)
      setTimeInput(String(g.dailyTimeMinutes))
      setChInput(String(g.dailyChapters))
    }).catch(() => {})
    // Get today's reading from stats
    api.getDailyStats().then(r => {
      const today = new Date().toISOString().slice(0, 10)
      const todayData = r.data.find(d => d.date === today)
      if (todayData) {
        setTodayProgress({ chapters: todayData.chaptersRead, minutes: Math.round(todayData.totalTimeMs / 60000) })
      }
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
            className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors">Set Goals</button>
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
          <input value={timeInput} onChange={e => setTimeInput(e.target.value)} type="number" min={0} max={480}
            className="flex-1 bg-surface-hover/30 border border-border-light rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent/50" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted w-24">Daily chapters</span>
          <input value={chInput} onChange={e => setChInput(e.target.value)} type="number" min={0} max={100}
            className="flex-1 bg-surface-hover/30 border border-border-light rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent/50" />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-surface-hover">Cancel</button>
          <button onClick={() => {
            const t = Math.max(0, parseInt(timeInput) || 0)
            const c = Math.max(0, parseInt(chInput) || 0)
            api.setGoals({ dailyTimeMinutes: t, dailyChapters: c }).then(g => { setGoals(g); setEditing(false) }).catch(() => {})
          }} className="px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium">Save</button>
        </div>
      </div>
    </div>
  )

  const chPct = goals.dailyChapters > 0 ? Math.min((todayProgress.chapters / goals.dailyChapters) * 100, 100) : 0
  const timePct = goals.dailyTimeMinutes > 0 ? Math.min((todayProgress.minutes / goals.dailyTimeMinutes) * 100, 100) : 0

  return (
    <div className="mb-6 p-4 rounded-2xl border border-border-light bg-surface">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-text">Daily Goals</span>
          {chPct >= 100 && <Flame className="w-4 h-4 text-orange-400" strokeWidth={1.5} />}
        </div>
        <button onClick={() => { setEditing(true); setTimeInput(String(goals.dailyTimeMinutes)); setChInput(String(goals.dailyChapters)) }}
          className="text-xs text-accent hover:underline">Edit</button>
      </div>

      {/* Chapters progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[10px] text-text-muted mb-1">
          <span>Chapters: {todayProgress.chapters} / {goals.dailyChapters}</span>
          <span>{Math.round(chPct)}%</span>
        </div>
        <div className="w-full bg-surface-hover rounded-full h-2">
          <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${chPct}%` }} />
        </div>
      </div>

      {/* Time progress bar */}
      <div>
        <div className="flex justify-between text-[10px] text-text-muted mb-1">
          <span>Time: {todayProgress.minutes}m / {goals.dailyTimeMinutes}m</span>
          <span>{Math.round(timePct)}%</span>
        </div>
        <div className="w-full bg-surface-hover rounded-full h-2">
          <div className="bg-blue-400 h-2 rounded-full transition-all" style={{ width: `${timePct}%` }} />
        </div>
      </div>
    </div>
  )
}
