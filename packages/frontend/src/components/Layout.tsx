import { Outlet, Link, useParams } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <nav className="flex gap-4 items-center">
          <Link to="/" className="font-bold text-lg">IReader Next</Link>
          <Link to="/sources" className="text-muted-foreground hover:text-foreground">Sources</Link>
        </nav>
        <ThemeToggle />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
