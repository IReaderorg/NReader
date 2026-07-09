import { useRef, useEffect, useState, useCallback } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface TextReaderProps {
  content: string
  initialScrollPos?: number
  fontSize?: number
  onScroll?: (scrollPos: number) => void
  onProgressChange?: (progress: number) => void
  className?: string
}

function sanitizeHtml(html: string): string {
  // Strip script and iframe tags
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
}

export function TextReader({ content, initialScrollPos = 0, fontSize = 18, onScroll, onProgressChange, className }: TextReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // Restore scroll position on mount
  useEffect(() => {
    if (initialScrollPos > 0 && scrollRef.current) {
      scrollRef.current.scrollTop = initialScrollPos
    }
  }, [initialScrollPos])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const pos = el.scrollTop
    const maxScroll = el.scrollHeight - el.clientHeight
    const pct = maxScroll > 0 ? Math.min(100, Math.round((pos / maxScroll) * 100)) : 0
    setProgress(pct)
    onScroll?.(pos)
    onProgressChange?.(pct)
  }, [onScroll, onProgressChange])

  const sanitized = sanitizeHtml(content)

  return (
    <div
      ref={scrollRef}
      className={cn('h-full overflow-y-auto px-8 py-6', className)}
      onScroll={handleScroll}
    >
      <div
        className="mx-auto leading-[1.8] text-[var(--text)]"
        style={{ maxWidth: '720px', fontSize: `${fontSize}px` }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: sanitized }}
          className="prose-custom"
        />
      </div>

      {/* Progress bar at bottom */}
      <div className="sticky bottom-0 left-0 w-full h-1 bg-[hsl(var(--surface))] rounded-full mt-8 overflow-hidden">
        <div
          className="h-full bg-[hsl(var(--accent))] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
