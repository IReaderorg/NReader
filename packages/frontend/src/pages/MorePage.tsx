import { Palette, Info, BookOpen } from 'lucide-react'

const items = [
  { icon: Palette, label: 'Theme', desc: 'Switch dark/light' },
  { icon: Info, label: 'About', desc: 'IReader v0.0.1' },
]

export function MorePage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
        <h2 className="font-semibold text-sm text-text">More</h2>
      </div>
      <div className="space-y-1">
        {items.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3 rounded-xl border border-border-light bg-surface hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-text">{label}</p>
              <p className="text-xs text-text-secondary">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
