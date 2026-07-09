import { Link } from 'react-router-dom'

interface MangaCardProps {
  id: string
  title: string
  coverUrl: string
  author?: string
  sourceId: string
}

export function MangaCard({ id, title, coverUrl, author: _author, sourceId }: MangaCardProps) {
  return (
    <Link
      to={`/sources/${sourceId}/manga/${encodeURIComponent(id)}`}
      className="group block focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-lg"
    >
      <div className="relative aspect-[3/4] bg-surface rounded-lg overflow-hidden ring-1 ring-border-light/50 transition-all duration-200 group-hover:ring-accent/30 group-hover:brightness-110">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"><rect fill="%2318181a" width="3" height="4"/><text x="1.5" y="2" text-anchor="middle" fill="%23666" font-size="0.3">?</text></svg>'
          }}
        />
      </div>
      <h3 className="mt-1.5 text-xs font-medium leading-tight line-clamp-2 text-text-secondary group-hover:text-text transition-colors">
        {title}
      </h3>
    </Link>
  )
}
