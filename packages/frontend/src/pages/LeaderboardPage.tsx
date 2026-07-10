import { useState, useEffect } from 'react'
import { Trophy, Medal } from 'lucide-react'
import { apiFetch } from '../api/client'

interface LeaderboardEntry {
  id: string; username: string; display_name: string
  avatar_url: string; total_points: number; activities: number
}

const periods = ['daily', 'weekly', 'monthly', 'all'] as const
type Period = typeof periods[number]

export function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [period, setPeriod] = useState<Period>('all')

  useEffect(() => {
    apiFetch<LeaderboardEntry[]>(`/leaderboard?period=${period}`)
      .then(setEntries).catch(() => {})
  }, [period])

  const rankIcons = [<Trophy key="1" className="w-4 h-4 text-yellow-500" />,
    <Medal key="2" className="w-4 h-4 text-gray-400" />,
    <Medal key="3" className="w-4 h-4 text-amber-700" />]

  return (
    <div className="p-4">
      <h1 className="text-base font-bold text-text mb-4">Leaderboard</h1>
      <div className="flex gap-2 mb-4">
        {periods.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-lg text-xs ${
              period === p ? 'bg-accent text-white' : 'bg-surface text-text-muted border border-border-light'
            }`}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {entries.map((e, i) => (
          <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light">
            <div className="w-8 text-center">
              {i < 3 ? rankIcons[i] : <span className="text-xs text-text-muted">#{i + 1}</span>}
            </div>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{e.display_name || e.username}</p>
              <p className="text-xs text-text-muted">{e.activities} activities</p>
            </div>
            <span className="text-sm font-bold text-accent">{e.total_points} pts</span>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-sm text-text-muted text-center py-8">No rankings yet</p>
        )}
      </div>
    </div>
  )
}
