import { History } from 'lucide-react'

export function HistoryPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <History className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
      <h2 className="font-semibold text-sm text-text mb-1">History</h2>
      <p className="text-xs text-text-secondary text-center max-w-xs">
        Your reading history will appear here.
      </p>
    </div>
  )
}
