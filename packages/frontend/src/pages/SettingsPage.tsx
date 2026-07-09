import { useState } from 'react'
import { useSettingsStore } from '../store/settings-store'
import { api } from '../api/client'
import { Palette, Monitor, BookOpen, Sun, Moon, Droplet, Puzzle, Download, Volume2, Languages, HardDrive } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SettingsPage() {
  const { theme, accentColor, setTheme, setAccentColor } = useSettingsStore()
  const [activeSection, setActiveSection] = useState<'appearance' | 'reader' | 'tts' | 'translation' | 'storage'>('appearance')

  const sections = [
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'reader' as const, label: 'Reader', icon: BookOpen },
    { id: 'tts' as const, label: 'TTS', icon: Volume2 },
    { id: 'translation' as const, label: 'Translate', icon: Languages },
    { id: 'storage' as const, label: 'Storage', icon: Download },
  ]

  return (
    <div>
      <h1 className="text-base font-bold text-text mb-4">Settings</h1>

      {/* Section tabs */}
      <div className="flex gap-1 mb-5 p-1 rounded-xl bg-surface border border-border-light overflow-x-auto">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === id
                ? 'bg-accent text-black shadow-sm'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
            {label}
          </button>
        ))}
      </div>

      {/* Appearance */}
      {activeSection === 'appearance' && (
        <div className="space-y-5">
          {/* Theme selector */}
          <div>
            <h2 className="text-xs font-semibold text-text mb-3 flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              Theme Mode
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {(['dark', 'light', 'amoled'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-3 rounded-xl text-xs font-medium transition-all border ${
                    theme === t
                      ? 'bg-accent text-black border-accent'
                      : 'bg-surface text-text-secondary border-border-light hover:border-accent/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    {t === 'dark' && <Moon className="w-4 h-4" strokeWidth={1.5} />}
                    {t === 'light' && <Sun className="w-4 h-4" strokeWidth={1.5} />}
                    {t === 'amoled' && <Monitor className="w-4 h-4" strokeWidth={1.5} />}
                    <span className="capitalize">{t}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Accent color */}
          <div>
            <h2 className="text-xs font-semibold text-text mb-3 flex items-center gap-2">
              <Droplet className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              Accent Color
            </h2>
            <div className="flex gap-2 flex-wrap">
              {[
                { name: 'Amber', value: '38 92% 50%' },
                { name: 'Rose', value: '0 72% 50%' },
                { name: 'Emerald', value: '160 84% 39%' },
                { name: 'Sky', value: '199 89% 48%' },
                { name: 'Violet', value: '271 91% 65%' },
                { name: 'Pink', value: '330 80% 60%' },
                { name: 'Orange', value: '24 95% 53%' },
                { name: 'Teal', value: '173 80% 40%' },
              ].map(c => (
                <button
                  key={c.value}
                  onClick={() => setAccentColor(c.value)}
                  className={`w-10 h-10 rounded-xl transition-all border-2 ${
                    accentColor === c.value ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: `hsl(${c.value})` }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reader */}
      {activeSection === 'reader' && (
        <div className="space-y-4">
          <p className="text-xs text-text-secondary">
            Reader settings control how manga chapters are displayed.
          </p>
          <div className="p-4 rounded-xl bg-surface border border-border-light">
            <p className="text-xs text-text-muted">
              Reader mode: Use the overlay controls while reading to switch between Webtoon, Pager, and Text modes.
            </p>
          </div>
        </div>
      )}

      {/* TTS */}
      {activeSection === 'tts' && (
        <div className="space-y-4">
          <Link
            to="/settings/tts"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-text">Text-to-Speech</p>
              <p className="text-xs text-text-secondary">Configure voice, speed, test playback</p>
            </div>
          </Link>
        </div>
      )}

      {/* Translation */}
      {activeSection === 'translation' && (
        <div className="space-y-4">
          <Link
            to="/settings/translation"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Languages className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-text">Translation</p>
              <p className="text-xs text-text-secondary">Engine selection, language pairs, glossary</p>
            </div>
          </Link>
        </div>
      )}

      {/* Storage */}
      {activeSection === 'storage' && (
        <div className="space-y-4">
          <Link
            to="/downloads"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Download className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-text">Downloads</p>
              <p className="text-xs text-text-secondary">Manage downloaded chapters</p>
            </div>
          </Link>

          <Link
            to="/sources"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Puzzle className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-text">Sources</p>
              <p className="text-xs text-text-secondary">Manage installed source plugins</p>
            </div>
          </Link>

          <Link
            to="/backup"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <HardDrive className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-text">Backup & Restore</p>
              <p className="text-xs text-text-secondary">Export or import your library and settings</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
