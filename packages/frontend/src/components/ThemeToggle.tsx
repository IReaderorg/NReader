import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-3.5 h-3.5 text-text-secondary" strokeWidth={1.5} />
      ) : (
        <Moon className="w-3.5 h-3.5 text-text-secondary" strokeWidth={1.5} />
      )}
    </button>
  )
}
