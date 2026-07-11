import { Loader2 } from 'lucide-react'

interface PreloadIndicatorProps {
  /** Whether next chapter is currently being loaded */
  loadingNext: boolean
  /** Whether the reader bars are visible (show indicator only when bars visible) */
  barsVisible?: boolean
}

/**
 * PreloadIndicator - Shows a small progress indicator when preloading next chapter.
 * Based on IReader's PreloadIndicator.kt
 * Renders in the reader bottom bar area.
 */
export function PreloadIndicator({ loadingNext, barsVisible = true }: PreloadIndicatorProps) {
  if (!loadingNext || !barsVisible) return null

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-surface/60 backdrop-blur-sm border border-border-light/40 shadow-sm animate-in fade-in zoom-in duration-150">
      <Loader2 className="w-3 h-3 text-accent animate-spin" strokeWidth={2} />
      <span className="text-[10px] font-medium text-text-muted whitespace-nowrap">
        Preloading next chapter…
      </span>
    </div>
  )
}
