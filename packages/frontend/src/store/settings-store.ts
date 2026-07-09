import { create } from 'zustand'
import { api } from '../api/client'

export type ThemeMode = 'dark' | 'light' | 'amoled'

interface SettingsStore {
  theme: ThemeMode
  accentColor: string
  loading: boolean
  error: string | null
  fetchSettings: () => Promise<void>
  setTheme: (theme: ThemeMode) => Promise<void>
  setAccentColor: (color: string) => Promise<void>
  resetSettings: () => Promise<void>
}

const DEFAULT_ACCENT = '38 92% 50%'

export const useSettingsStore = create<SettingsStore>((set) => ({
  theme: 'dark',
  accentColor: DEFAULT_ACCENT,
  loading: false,
  error: null,

  fetchSettings: async () => {
    set({ loading: true, error: null })
    try {
      const settings = await api.getSettings()
      set({
        theme: (settings.theme as ThemeMode) ?? 'dark',
        accentColor: (settings.accentColor as string) ?? DEFAULT_ACCENT,
        loading: false,
      })
    } catch {
      // Use defaults if backend unavailable
      set({ loading: false })
    }
  },

  setTheme: async (theme) => {
    set({ theme })
    // Apply immediately
    applyTheme(theme)
    try {
      await api.setSetting('theme', theme)
    } catch { /* persist best-effort */ }
  },

  setAccentColor: async (color) => {
    set({ accentColor: color })
    applyAccent(color)
    try {
      await api.setSetting('accentColor', color)
    } catch { /* persist best-effort */ }
  },

  resetSettings: async () => {
    set({ theme: 'dark', accentColor: DEFAULT_ACCENT })
    applyTheme('dark')
    applyAccent(DEFAULT_ACCENT)
  },
}))

function applyTheme(theme: ThemeMode) {
  // Remove all theme classes
  document.documentElement.classList.remove('light', 'amoled')
  if (theme === 'light') document.documentElement.classList.add('light')
  if (theme === 'amoled') document.documentElement.classList.add('amoled')
}

function applyAccent(color: string) {
  document.documentElement.style.setProperty('--accent', color)
}
