import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface SourceCardProps {
  id: string
  name: string
  lang: string
  version: string
  capabilities: string[]
}

const accentMap: Record<string, string> = {
  en: 'from-amber-500/20 to-amber-500/5 border-amber-500/20',
  ja: 'from-pink-500/20 to-pink-500/5 border-pink-500/20',
  kr: 'from-purple-500/20 to-purple-500/5 border-purple-500/20',
  zh: 'from-orange-500/20 to-orange-500/5 border-orange-500/20',
  default: 'from-accent/20 to-accent/5 border-accent/20',
}

const langFlags: Record<string, string> = {
  en: '🇬🇧', ja: '🇯🇵', kr: '🇰🇷', zh: '🇨🇳',
}

export function SourceCard({ id, name, lang, version, capabilities }: SourceCardProps) {
  const accent = accentMap[lang] || accentMap.default
  const flag = langFlags[lang] || '🌐'

  return (
    <Link
      to={`/sources/${id}`}
      className={`group flex items-center gap-3 p-3.5 rounded-xl border bg-gradient-to-br ${accent} transition-all duration-150 hover:brightness-110 active:brightness-95`}
    >
      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-base shrink-0 ring-1 ring-border-light/50">
        {flag}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-text truncate">{name}</h3>
          <span className="text-[10px] text-text-muted bg-surface px-1.5 py-0.5 rounded shrink-0">
            v{version}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          {capabilities.slice(0, 3).map((cap) => (
            <span key={cap} className="text-[10px] text-text-muted px-1.5 py-0.5 rounded bg-surface/50">
              {cap}
            </span>
          ))}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text transition-colors shrink-0" strokeWidth={1.5} />
    </Link>
  )
}
