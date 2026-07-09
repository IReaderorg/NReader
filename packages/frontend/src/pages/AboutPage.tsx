import { BookOpen, Heart, Github, Globe, Scale } from 'lucide-react'

export function AboutPage() {
  return (
    <div>
      <h1 className="text-base font-bold text-text mb-5">About</h1>

      {/* App header */}
      <div className="flex flex-col items-center py-6 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-3">
          <BookOpen className="w-7 h-7 text-accent" strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-bold text-text">IReader Next</h2>
        <p className="text-xs text-text-muted mt-0.5">Version 0.0.1</p>
        <p className="text-sm text-text-secondary text-center mt-3 max-w-xs leading-relaxed">
          A web-native, cross-platform manga and novel reader.
          Zero-compile JS source plugins, open source, always free.
        </p>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <a
          href="https://github.com/ireader/ireader-next"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
        >
          <Github className="w-4.5 h-4.5 text-text-secondary" strokeWidth={1.5} />
          <div>
            <p className="text-sm text-text">GitHub</p>
            <p className="text-xs text-text-secondary">Source code, issues, and contributions</p>
          </div>
        </a>

        <a
          href="https://ireader.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors"
        >
          <Globe className="w-4.5 h-4.5 text-text-secondary" strokeWidth={1.5} />
          <div>
            <p className="text-sm text-text">Website</p>
            <p className="text-xs text-text-secondary">Official website and documentation</p>
          </div>
        </a>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light">
          <Scale className="w-4.5 h-4.5 text-text-secondary" strokeWidth={1.5} />
          <div>
            <p className="text-sm text-text">License</p>
            <p className="text-xs text-text-secondary">Apache License 2.0</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col items-center gap-1 pt-4 border-t border-border-light">
        <p className="text-[11px] text-text-muted text-center">
          Built with React, Hono, Tailwind CSS, and many open source libraries.
        </p>
        <p className="text-[11px] text-text-muted flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-danger/70" fill="currentColor" /> by the IReader community
        </p>
      </div>
    </div>
  )
}
