import { Link } from 'react-router-dom'
import { Info, Shield, Wifi, Settings2, FileText, ArrowRight, Volume2, Languages, Download, HardDrive, Puzzle, BarChart3, CalendarDays, Globe, Image, Users, Trophy, Quote, User, Cloud, Database } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const sections = [
  {
    icon: Globe,
    label: 'General Settings',
    desc: 'Language, startup page, behavior',
    to: '/settings/general',
  },
  {
    icon: User,
    label: 'Profile',
    desc: 'Avatar, username, bio, reading stats',
    to: '/profile',
  },
  {
    icon: Cloud,
    label: 'Cloud Backup',
    desc: 'Google Drive backup & restore',
    to: '/backup/cloud',
  },
  {
    icon: Shield,
    label: 'Security',
    desc: 'App lock, biometric authentication, API key encryption',
    to: '/settings/security',
  },
  {
    icon: Wifi,
    label: 'Network',
    desc: 'Proxy settings, DNS, request timeout, user agent',
    to: '/settings/network',
  },
  {
    icon: Settings2,
    label: 'Advanced',
    desc: 'Debug mode, cache management, data reset, experimental features',
    to: '/settings/advanced',
  },
  {
    icon: Database,
    label: 'Storage',
    desc: 'Cache, database stats, disk usage',
    to: '/settings/storage',
  },
  {
    icon: FileText,
    label: 'Changelog',
    desc: "See what's new in the latest update",
    to: '/changelog',
  },
  {
    icon: Info,
    label: 'About',
    desc: 'IReader Next v0.0.1 — Web-native manga and novel reader',
    to: '/about',
  },
]

export function MorePage() {
  return (
    <div>
      <h1 className="text-base font-bold text-text mb-4">More</h1>
      <div className="space-y-1">
        <LinkItem icon={Settings2} label="Settings" desc="Theme, appearance, reader, storage" to="/settings" />
        <LinkItem icon={Info} label="Appearance & Reading" desc="Themes, fonts, text layout, filters" to="/settings/appearance" />
        <LinkItem icon={Volume2} label="Text-to-Speech" desc="Configure voice, speed, test" to="/settings/tts" />
        <LinkItem icon={Languages} label="Translation" desc="Engine, languages, glossary" to="/settings/translation" />
        <LinkItem icon={HardDrive} label="Backup & Restore" desc="Export or import your data" to="/backup" />
        <LinkItem icon={Puzzle} label="Plugin Manager" desc="Browse and install plugins" to="/plugins" />
        <LinkItem icon={Settings2} label="Source Manager" desc="Manage installed sources" to="/sources/manager" />
        <LinkItem icon={Download} label="Downloads" desc="Manage downloaded chapters" to="/downloads" />
        <LinkItem icon={BarChart3} label="Reading Stats" desc="Track your reading time and progress" to="/stats" />
        <LinkItem icon={CalendarDays} label="Streaks" desc="Reading streak history and records" to="/stats/streaks" />

        {/* Social section */}
        <div className="my-3 border-t border-border-light" />
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 px-1">Social</p>
        <LinkItem icon={Users} label="Community" desc="Activity feed, friends' reading" to="/community" />
        <LinkItem icon={Trophy} label="Leaderboard" desc="Reading rankings" to="/leaderboard" />
        <LinkItem icon={Quote} label="Quotes" desc="Saved book quotes" to="/quotes" />
        <LinkItem icon={Image} label="Character Art" desc="Browse character artwork" to="/character-art" />

        {/* Divider */}
        <div className="my-3 border-t border-border-light" />

        {sections.map(({ icon, label, desc, to }) => (
          <LinkItem key={label} icon={icon} label={label} desc={desc} to={to} />
        ))}

        {/* App version */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border-light/50 mt-3">
          <div className="w-9 h-9 rounded-lg bg-accent/5 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 text-text-muted/50" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">IReader Next</p>
            <p className="text-xs text-text-muted/60">v0.0.1 • Open source under Apache 2.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkItem({ icon: Icon, label, desc, to }: {
  icon: LucideIcon
  label: string
  desc: string
  to: string
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-xl border border-border-light bg-surface hover:bg-surface-hover transition-colors group"
    >
      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-xs text-text-secondary truncate">{desc}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-text-muted/30 group-hover:text-accent transition-colors shrink-0" strokeWidth={1.5} />
    </Link>
  )
}
