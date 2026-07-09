import { Outlet, Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { PwaInstallPrompt } from './PwaInstallPrompt'
import { ArrowLeft } from 'lucide-react'

export function Layout() {
  const location = useLocation()
  const isRoot = location.pathname === '/'

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
    return segs[0]?.charAt(0).toUpperCase() + segs[0]?.slice(1) || 'IReader'
  })()

  return (
    <div className="app-layout">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="app-main">
        {/* Top bar (mobile + desktop) */}
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

        {/* Page content */}
        <main className="app-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile floating pill nav */}
      <MobileNav />

      {/* PWA install prompt */}
      <PwaInstallPrompt />
    </div>
  )
}
