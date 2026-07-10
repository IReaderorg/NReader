import { Globe, BookOpen, Download, Palette, Wifi, Shield, HardDrive, Database, Puzzle, Zap, Info, ChevronRight, Volume2, Languages } from 'lucide-react'
import { Link } from 'react-router-dom'

const groups = [
  {
    title: 'General',
    items: [
      { icon: Globe, label: 'General', desc: 'Language, startup page, font defaults', to: '/settings/general' },
    ],
  },
  {
    title: 'Reading',
    items: [
      { icon: BookOpen, label: 'Reader', desc: 'Reading mode, pagination, text settings', to: '/settings/reader' },
      { icon: Volume2, label: 'Text-to-Speech', desc: 'Voice, speed, test playback', to: '/settings/tts' },
      { icon: Languages, label: 'Translation', desc: 'Engine selection, language pairs, glossary', to: '/settings/translation' },
    ],
  },
  {
    title: 'Content',
    items: [
      { icon: Download, label: 'Downloads', desc: 'Download path, concurrent limits, WiFi-only', to: '/settings/download' },
      { icon: Puzzle, label: 'Sources', desc: 'Source update interval, timeout, auto-update', to: '/settings/sources' },
      { icon: Palette, label: 'Appearance', desc: 'Theme, accent color, display options', to: '/settings/appearance' },
    ],
  },
  {
    title: 'System',
    items: [
      { icon: Wifi, label: 'Network', desc: 'DNS, timeout, rate limiting, user agent', to: '/settings/network' },
      { icon: Shield, label: 'Security', desc: 'App lock, encryption, privacy', to: '/settings/security' },
      { icon: HardDrive, label: 'Backup & Restore', desc: 'Export or import library and settings', to: '/backup' },
    ],
  },
  {
    title: 'Data',
    items: [
      { icon: Database, label: 'Storage', desc: 'Cache, database stats, download storage', to: '/settings/storage' },
      { icon: Zap, label: 'Advanced', desc: 'Debug mode, experimental features', to: '/settings/advanced' },
      { icon: Info, label: 'About', desc: 'App version, licenses, credits', to: '/about' },
    ],
  },
]

export function SettingsPage() {
  return (
    <div>
      <h1 className="text-base font-bold text-text mb-5">Settings</h1>

      {groups.map(group => (
        <div key={group.title} className="mb-5">
          <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-1">{group.title}</h2>
          <div className="space-y-1">
            {group.items.map(({ icon: Icon, label, desc, to }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text">{label}</p>
                  <p className="text-xs text-text-secondary truncate">{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors shrink-0" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
