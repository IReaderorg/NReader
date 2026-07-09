import { BookOpen } from 'lucide-react'

export function LibraryPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <BookOpen className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
      <h2 className="font-semibold text-sm text-text mb-1">Your Library</h2>
      <p className="text-xs text-text-secondary text-center max-w-xs">
        Manga you add to your library will appear here.
      </p>
    </div>
  )
}
