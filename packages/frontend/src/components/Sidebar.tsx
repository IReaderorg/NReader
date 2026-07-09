import { NavLink } from 'react-router-dom'
import { Compass, BookOpen, RefreshCw, History, MoreHorizontal, Home } from 'lucide-react'

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/sources', icon: Compass, label: 'Browse' },
  { to: '/library', icon: BookOpen, label: 'Library' },
  { to: '/updates', icon: RefreshCw, label: 'Updates' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/more', icon: MoreHorizontal, label: 'More' },
]

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      {/* App brand */}
      <div className="flex items-center justify-center h-header w-full border-b border-border-light mb-2">
        <div className="w-7 h-7 rounded-md bg-accent/20 flex items-center justify-center">
          <BookOpen className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col items-center gap-1 flex-1 px-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `w-11 h-11 flex flex-col items-center justify-center rounded-xl gap-0.5 transition-all duration-150 ${
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-secondary hover:text-text hover:bg-surface-hover'
              }`
            }
            title={label}
          >
            <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
            <span className="text-[9px] font-medium leading-none">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom spacer */}
      <div className="pb-safe" />
    </aside>
  )
}
