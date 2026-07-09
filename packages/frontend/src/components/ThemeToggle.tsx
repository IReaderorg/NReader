import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} className="p-2 rounded-md hover:bg-muted" aria-label="Toggle theme">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
