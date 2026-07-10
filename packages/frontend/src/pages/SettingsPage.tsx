import { Globe, BookOpen, Download, Palette, Wifi, Shield, HardDrive, Database, Puzzle, Zap, Info, ChevronRight, Volume2, Languages, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const groups = [
  {
    title: 'General',
    items: [
      { icon: Globe, label: 'General', subtitle: 'Language, startup page', to: '/settings/general' },
    ],
  },
  {
    title: 'Reading',
    items: [
      { icon: BookOpen, label: 'Reader', subtitle: 'Mode, pagination, text', to: '/settings/reader' },
      { icon: Volume2, label: 'Text-to-Speech', subtitle: 'Voice, speed', to: '/settings/tts' },
      { icon: Languages, label: 'Translation', subtitle: 'Engine, language pairs', to: '/settings/translation' },
    ],
  },
  {
    title: 'Content',
    items: [
      { icon: Download, label: 'Downloads', subtitle: 'Path, limits, WiFi-only', to: '/settings/download' },
      { icon: Puzzle, label: 'Sources', subtitle: 'Update interval, timeout', to: '/settings/sources' },
      { icon: Palette, label: 'Appearance', subtitle: 'Theme, accent, display', to: '/settings/appearance' },
    ],
  },
  {
    title: 'System',
    items: [
      { icon: Wifi, label: 'Network', subtitle: 'DNS, timeout, user agent', to: '/settings/network' },
      { icon: Shield, label: 'Security', subtitle: 'App lock, encryption', to: '/settings/security' },
      { icon: HardDrive, label: 'Backup & Restore', subtitle: 'Export or import', to: '/backup' },
    ],
  },
  {
    title: 'Data',
    items: [
      { icon: Database, label: 'Storage', subtitle: 'Cache, database stats', to: '/settings/storage' },
      { icon: Zap, label: 'Advanced', subtitle: 'Debug, experimental', to: '/settings/advanced' },
      { icon: Info, label: 'About', subtitle: 'Version, licenses', to: '/about' },
    ],
  },
]

export function SettingsPage() {
  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <h1 className="text-base font-bold text-text mb-4">Settings</h1>

      {/* Search bar at top */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search settings..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface text-text text-xs border border-border-light focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted/50"
        />
      </div>

      {/* iOS-style grouped table */}
      {groups.map(group => (
        <div key={group.title} className="mb-6">
          <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 px-1">{group.title}</h2>
          <div className="bg-surface rounded-xl overflow-hidden divide-y divide-border-light/50">
            {group.items.map(({ icon: Icon, label, subtitle, to }, idx) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3.5 hover:bg-surface-hover transition-colors group ${
                  idx === 0 ? '' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text">{label}</p>
                  <p className="text-xs text-text-muted/70 truncate">{subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted/40 group-hover:text-text-secondary transition-colors shrink-0" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
