import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useSettingsStore, type ThemeMode } from '../store/settings-store'

interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (t: ThemeMode) => Promise<void>
  accentColor: string
  setAccentColor: (c: string) => Promise<void>
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const PRESETS = {
  dark: { accent: '38 92% 50%', bg: '240 4% 6%', surface: '240 3% 10%', text: '0 0% 96%' },
  light: { accent: '38 92% 45%', bg: '0 0% 96%', surface: '0 0% 100%', text: '240 4% 10%' },
  amoled: { accent: '38 92% 50%', bg: '0 0% 0%', surface: '0 0% 3%', text: '0 0% 96%' },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, accentColor, setTheme, setAccentColor, fetchSettings } = useSettingsStore()

  // Load settings on mount
  useEffect(() => {
    fetchSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Apply theme
  useEffect(() => {
    const preset = PRESETS[theme] ?? PRESETS.dark

    // Remove all mode classes
    document.documentElement.classList.remove('light', 'amoled')
    if (theme === 'light') document.documentElement.classList.add('light')
    if (theme === 'amoled') document.documentElement.classList.add('amoled')

    // Apply CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--accent', accentColor || preset.accent)
    root.style.setProperty('--bg', preset.bg)
    root.style.setProperty('--surface', preset.surface)
    root.style.setProperty('--text', preset.text)
  }, [theme, accentColor])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, toggle: () => {
      const cycle: ThemeMode[] = ['dark', 'light', 'amoled']
      const idx = cycle.indexOf(theme)
      setTheme(cycle[(idx + 1) % cycle.length] ?? 'dark')
    } }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
