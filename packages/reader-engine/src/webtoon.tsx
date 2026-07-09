import { useRef, useEffect, useState, useCallback } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface Page {
  index: number
  url: string
  width?: number
  height?: number
}

interface WebtoonReaderProps {
  pages: Page[]
  initialPage?: number
  onPageChange?: (page: number, scrollPos: number) => void
  className?: string
  initialScrollPos?: number
}

export function WebtoonReader({ pages, initialPage = 0, onPageChange, className, initialScrollPos }: WebtoonReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [visiblePage, setVisiblePage] = useState(initialPage)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([initialPage]))
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll to initial page on mount
  useEffect(() => {
    if (initialScrollPos && scrollRef.current) {
      scrollRef.current.scrollTop = initialScrollPos
    } else if (initialPage > 0 && pageRefs.current[initialPage]) {
      pageRefs.current[initialPage]?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
  }, [initialPage, initialScrollPos])

  // IntersectionObserver for lazy loading + tracking visible page
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Track which page is most visible
        let maxRatio = 0
        let maxPage = visiblePage

        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.pageIndex)
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            maxPage = idx
          }
          // Lazy load: mark as visible
          if (entry.isIntersecting) {
            setLoadedImages(prev => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
            // Preload next image
            const nextIdx = idx + 1
            if (nextIdx < pages.length) {
              setLoadedImages(prev => {
                if (prev.has(nextIdx)) return prev
                const next = new Set(prev)
                next.add(nextIdx)
                return next
              })
            }
          }
        }

        if (maxRatio > 0 && maxPage !== visiblePage) {
          setVisiblePage(maxPage)
          onPageChange?.(maxPage, scrollEl.scrollTop)
        }
      },
      { root: scrollEl, rootMargin: '500px 0px', threshold: [0, 0.1, 0.5, 1] }
    )

    for (const ref of pageRefs.current) {
      if (ref) observer.observe(ref)
    }

    return () => observer.disconnect()
  }, [pages.length, visiblePage, onPageChange])

  // Track scroll for page change
  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    // Find the page element closest to the top of the viewport
    const containerTop = el.getBoundingClientRect().top
    let closestIdx = visiblePage
    let closestDist = Infinity

    for (let i = 0; i < pageRefs.current.length; i++) {
      const ref = pageRefs.current[i]
      if (!ref) continue
      const rect = ref.getBoundingClientRect()
      const dist = Math.abs(rect.top - containerTop - 20)
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = i
      }
    }

    if (closestIdx !== visiblePage) {
      setVisiblePage(closestIdx)
      onPageChange?.(closestIdx, el.scrollTop)
    }
  }, [visiblePage, onPageChange])

  return (
    <div
      ref={scrollRef}
      className={cn('relative overflow-y-auto h-full scroll-smooth', className)}
      onScroll={handleScroll}
    >
      <div className="flex flex-col items-center">
        {pages.map((page, idx) => (
          <div
            key={page.url}
            ref={el => { pageRefs.current[idx] = el }}
            data-page-index={idx}
            className="w-full max-w-3xl mx-auto"
          >
            {loadedImages.has(idx) ? (
              <img
                src={page.url}
                alt={`Page ${idx + 1}`}
                loading="lazy"
                className="w-full h-auto"
                width={page.width}
                height={page.height}
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const fallback = target.nextElementSibling
                  if (fallback) (fallback as HTMLElement).style.display = 'flex'
                }}
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-[hsl(var(--surface))] animate-pulse rounded-sm" />
            )}
            {/* Fallback error state (hidden by default) */}
            <div className="hidden flex-col items-center justify-center py-16 text-text-secondary text-sm">
              <span>Failed to load image</span>
            </div>
          </div>
        ))}
      </div>

      {/* Page indicator */}
      <div className="fixed bottom-6 right-6 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none select-none">
        {visiblePage + 1} / {pages.length}
      </div>
    </div>
  )
}
