import { RefreshCw } from 'lucide-react'

export function UpdatesPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <RefreshCw className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
      <h2 className="font-semibold text-sm text-text mb-1">Updates</h2>
      <p className="text-xs text-text-secondary text-center max-w-xs">
        Recent updates from your sources will appear here.
      </p>
    </div>
  )
}
