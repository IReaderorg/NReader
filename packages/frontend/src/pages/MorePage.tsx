import { Link } from 'react-router-dom'
import { Palette, Info, Download, Puzzle, Settings } from 'lucide-react'

const items = [
  { icon: Palette, label: 'Settings', desc: 'Theme, appearance, reader, storage', to: '/settings' },
  { icon: Download, label: 'Downloads', desc: 'Manage downloaded chapters', to: '/downloads' },
  { icon: Puzzle, label: 'Sources', desc: 'Installed source plugins', to: '/settings' },
  { icon: Info, label: 'About', desc: 'IReader Next v0.0.1', to: '' },
]

export function MorePage() {
  return (
    <div>
      <h1 className="text-base font-bold text-text mb-4">More</h1>
      <div className="space-y-1">
        {items.map(({ icon: Icon, label, desc, to }) => {
          const content = (
            <div className="flex items-center gap-3 p-3 rounded-xl border border-border-light bg-surface hover:bg-surface-hover transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-text">{label}</p>
                <p className="text-xs text-text-secondary">{desc}</p>
              </div>
            </div>
          )

          if (to) {
            return <Link key={label} to={to}>{content}</Link>
          }
          return <div key={label}>{content}</div>
        })}
      </div>
    </div>
  )
}
