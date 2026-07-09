import { NavLink } from 'react-router-dom'
import { Compass, BookOpen, RefreshCw, History, MoreHorizontal, Home } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Home', exact: true },
  { to: '/sources', icon: Compass, label: 'Browse' },
  { to: '/library', icon: BookOpen, label: 'Library' },
  { to: '/updates', icon: RefreshCw, label: 'Updates' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/more', icon: MoreHorizontal, label: 'More' },
]

export function MobileNav() {
  return (
    <div className="app-mobile-nav fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-safe">
      <nav className="pointer-events-auto flex items-center gap-1 bg-surface/95 backdrop-blur-xl border border-border-light rounded-2xl px-2 py-1.5 mb-3 shadow-2xl shadow-black/40">
        {tabs.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `w-11 h-10 flex flex-col items-center justify-center rounded-xl gap-0 transition-all duration-150 ${
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-secondary hover:text-text'
              }`
            }
            aria-label={label}
          >
            <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
