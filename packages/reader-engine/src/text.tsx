import { useRef, useEffect, useState, useCallback } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

export type TextAlignment = 'left' | 'center' | 'right' | 'justify'
export type ColorFilterType = 'none' | 'sepia' | 'invert' | 'grayscale'
export interface ReaderThemeColors {
  background: string
  text: string
  link: string
  highlight: string
  header: string
  separator: string
  card: string
}

interface TextReaderProps {
  content: string
  initialScrollPos?: number
  fontSize?: number
  lineHeight?: number
  paragraphSpacing?: number
  paragraphIndent?: number
  textAlignment?: TextAlignment
  colorFilter?: ColorFilterType
  themeColors?: ReaderThemeColors
  contentFilterEnabled?: boolean
  contentFilterPatterns?: string
  onScroll?: (scrollPos: number) => void
  onProgressChange?: (progress: number) => void
  className?: string
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
}

function applyContentFilter(html: string, enabled: boolean, patternStr: string): string {
  if (!enabled || !patternStr.trim()) return html
  const patterns = patternStr.split('\n').filter(p => p.trim())
  if (patterns.length === 0) return html

  // Parse HTML, remove elements matching any pattern, return modified HTML
  // Simple approach: wrap in temp div, find text matches, remove parent p/div
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  const elementsToRemove: Element[] = []
  const paragraphs = tempDiv.querySelectorAll('p, div')
  for (const el of paragraphs) {
    const text = el.textContent?.trim() || ''
    for (const pattern of patterns) {
      try {
        const regex = new RegExp(pattern, 'i')
        if (regex.test(text)) {
          elementsToRemove.push(el)
          break
        }
      } catch {
        // Invalid regex, skip
      }
    }
  }

  for (const el of elementsToRemove) {
    el.remove()
  }

  return tempDiv.innerHTML
}

const COLOR_FILTER_STYLES: Record<ColorFilterType, string> = {
  none: 'none',
  sepia: 'sepia(0.5) contrast(0.9)',
  invert: 'invert(0.9) hue-rotate(180deg)',
  grayscale: 'grayscale(0.8)',
}

export function TextReader({
  content,
  initialScrollPos = 0,
  fontSize = 18,
  lineHeight = 1.8,
  paragraphSpacing = 16,
  paragraphIndent = 0,
  textAlignment = 'left',
  colorFilter = 'none',
  themeColors,
  contentFilterEnabled = false,
  contentFilterPatterns = '',
  onScroll,
  onProgressChange,
  className,
}: TextReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

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
    onProgressChange?.(pct / 100)
  }, [onScroll, onProgressChange])

  const sanitized = sanitizeHtml(content)
  const filtered = applyContentFilter(sanitized, contentFilterEnabled, contentFilterPatterns)

  const bgColor = themeColors?.background || 'hsl(var(--bg))'
  const textColor = themeColors?.text || 'hsl(var(--text))'
  const linkColor = themeColors?.link || 'hsl(var(--accent))'
  const filterStyle = COLOR_FILTER_STYLES[colorFilter]
  const indent = paragraphIndent > 0 ? `${paragraphIndent}px` : '0'

  return (
    <div
      ref={scrollRef}
      className={cn('h-full overflow-y-auto px-6 py-6', className)}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        filter: filterStyle !== 'none' ? filterStyle : undefined,
      }}
      onScroll={handleScroll}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '720px',
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          textAlign: textAlignment,
        }}
      >
        <style>{`
          .nreader-content a { color: ${linkColor}; }
          .nreader-content p {
            margin-bottom: ${paragraphSpacing}px;
            text-indent: ${indent};
            line-height: ${lineHeight};
          }
          .nreader-content p:last-child { margin-bottom: 0; }
        `}</style>
        <div
          dangerouslySetInnerHTML={{ __html: filtered }}
          className="nreader-content"
        />
      </div>

      {/* Progress bar */}
      <div className="sticky bottom-0 left-0 w-full h-1 rounded-full mt-8 overflow-hidden"
        style={{ backgroundColor: themeColors?.separator || 'hsl(var(--surface))' }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: themeColors?.highlight || 'hsl(var(--accent))' }}
        />
      </div>
    </div>
  )
}
