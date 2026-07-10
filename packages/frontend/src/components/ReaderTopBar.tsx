import { Settings, ArrowLeft } from 'lucide-react'

interface ReaderTopBarProps {
  title: string
  onBack: () => void
  onSettings: () => void
  visible: boolean
}

export function ReaderTopBar({ title, onBack, onSettings, visible }: ReaderTopBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between h-12 px-4" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary/70 hover:text-text hover:bg-white/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 px-3">
          <p className="text-sm font-medium text-text/90 text-center truncate">{title || 'Reader'}</p>
        </div>

        <button
          onClick={onSettings}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary/70 hover:text-text hover:bg-white/10 transition-colors"
          aria-label="Reader settings"
        >
          <Settings className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Thin separator */}
      <div className="h-[0.5px] bg-text-muted/20 mx-4" />
    </div>
  )
}
