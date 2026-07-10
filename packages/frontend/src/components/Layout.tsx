import { Outlet, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { ArrowLeft } from 'lucide-react'

export function Layout() {
  const location = useLocation()
  const isRoot = location.pathname === '/'
  const isReader = location.pathname.startsWith('/reader')

  // Derive a page title from the current route
  const pageTitle = (() => {
    if (isRoot) return 'IReader'
    const segs = location.pathname.split('/').filter(Boolean)
    if (segs[0] === 'sources') {
      if (!segs[1]) return 'Browse'
      if (segs[2] === 'manga') return 'Details'
      if (segs[2] === 'search') return 'Search'
      return segs[1]
    }
    const first = segs[0]
    return first ? first.charAt(0).toUpperCase() + first.slice(1) : 'IReader'
  })()

  return (
    <div className="app-layout">
      {/* Desktop sidebar */}
      {!isReader && <Sidebar />}

      {/* Main area */}
      <div className={`app-main${isReader ? ' app-main--reader' : ''}`}>
        {/* Top bar (mobile + desktop) */}
        {!isReader && (
          <header className="app-header">
            <div className="flex items-center gap-2 min-w-0">
              {!isRoot && (
                <button
                  onClick={() => window.history.back()}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors shrink-0"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
                </button>
              )}
              <h1 className="font-semibold text-sm truncate text-text">{pageTitle}</h1>
            </div>
            <ThemeToggle />
          </header>
        )}

        {/* Page content */}
        <main id="main-content" className="app-content" role="main">
          <Outlet />
        </main>
      </div>

      {/* Mobile floating pill nav */}
      {!isReader && <MobileNav />}
    </div>
  )
}
