import { Link } from 'react-router-dom'
import { Compass, BookOpen, Clock } from 'lucide-react'

const quickActions = [
  { to: '/sources', icon: Compass, label: 'Browse', desc: 'Discover manga' },
  { to: '/library', icon: BookOpen, label: 'Library', desc: 'Your collection' },
  { to: '/history', icon: Clock, label: 'History', desc: 'Continue reading' },
]

export function HomePage() {
  return (
    <div className="flex flex-col items-center pt-12 pb-6">
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
        <BookOpen className="w-7 h-7 text-accent" strokeWidth={1.5} />
      </div>
      <h1 className="text-lg font-bold text-text mb-1">IReader</h1>
      <p className="text-sm text-text-secondary text-center max-w-[240px] mb-8 leading-relaxed">
        Read manga & novels from any source
      </p>
      <div className="w-full max-w-sm space-y-2">
        {quickActions.map(({ to, icon: Icon, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 w-full p-3 rounded-xl border border-border-light bg-surface hover:bg-surface-hover transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Icon className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm text-text">{label}</p>
              <p className="text-xs text-text-secondary">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
