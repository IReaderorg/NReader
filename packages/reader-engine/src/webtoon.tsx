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

// ─── Image Zoom Overlay ────────────────────────────────────────────────

function ImageZoom({ src, alt, onClose }: { src: string; alt?: string; onClose: () => void }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 })
  const lastTap = useRef(0)

  const handleDoubleClick = useCallback(() => {
    setScale(s => s > 1 ? 1 : 2)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return
    e.preventDefault()
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y }
  }, [scale, position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPosition({ x: dragStart.current.posX + dx, y: dragStart.current.posY + dy })
  }, [dragging])

  const handleMouseUp = useCallback(() => {
    setDragging(false)
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      handleDoubleClick()
      lastTap.current = 0
      return
    }
    lastTap.current = now
    setTimeout(() => {
      if (Date.now() - lastTap.current >= 300) {
        e.stopPropagation()
        onClose()
      }
    }, 310)
  }, [handleDoubleClick, onClose])

  const getTouchDist = (touches: TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[0]!.clientX - touches[1]!.clientX
    const dy = touches[0]!.clientY - touches[1]!.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }
  const touchStart = useRef({ x: 0, y: 0, posX: 0, posY: 0, dist: 0 })
  const [isPinching, setIsPinching] = useState(false)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsPinching(true)
      touchStart.current.dist = getTouchDist(e.touches)
      return
    }
    if (e.touches.length === 1 && scale > 1) {
      setDragging(true)
      touchStart.current.x = e.touches[0]!.clientX
      touchStart.current.y = e.touches[0]!.clientY
      touchStart.current.posX = position.x
      touchStart.current.posY = position.y
    }
  }, [scale, position])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (isPinching && e.touches.length === 2) {
      const newDist = getTouchDist(e.touches)
      setScale(Math.max(0.5, Math.min(5, newDist / (touchStart.current.dist || 1))))
      return
    }
    if (dragging && e.touches.length === 1) {
      const dx = e.touches[0]!.clientX - touchStart.current.x
      const dy = e.touches[0]!.clientY - touchStart.current.y
      setPosition({ x: touchStart.current.posX + dx, y: touchStart.current.posY + dy })
    }
  }, [isPinching, dragging])

  const onTouchEnd = useCallback(() => {
    setDragging(false)
    setIsPinching(false)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center overflow-hidden"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="max-w-none select-none cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: dragging ? 'none' : 'transform 0.2s ease-out',
        }}
      />
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors z-10"
      >
        ✕
      </button>
    </div>
  )
}

// ─── WebtoonReader ──────────────────────────────────────────────────────

export function WebtoonReader({ pages, initialPage = 0, onPageChange, className, initialScrollPos }: WebtoonReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [visiblePage, setVisiblePage] = useState(initialPage)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([initialPage]))
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [zoomedSrc, setZoomedSrc] = useState<string | null>(null)

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
        let maxRatio = 0
        let maxPage = visiblePage

        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.pageIndex)
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            maxPage = idx
          }
          if (entry.isIntersecting) {
            setLoadedImages((prev: Set<number>) => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
            const nextIdx = idx + 1
            if (nextIdx < pages.length) {
              setLoadedImages((prev: Set<number>) => {
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
                className="w-full h-auto cursor-zoom-in"
                width={page.width}
                height={page.height}
                onClick={(e) => {
                  e.stopPropagation()
                  setZoomedSrc(page.url)
                }}
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
            {/* Fallback error state */}
            <div className="hidden flex-col items-center justify-center py-16 text-text-secondary text-sm">
              <span>Failed to load image</span>
            </div>
          </div>
        ))}
      </div>

      {/* Page indicator */}
      <div className="fixed bottom-6 right-6 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none select-none z-10">
        {visiblePage + 1} / {pages.length}
      </div>

      {/* Image Zoom Overlay */}
      {zoomedSrc && (
        <ImageZoom
          src={zoomedSrc}
          alt={`Page zoom`}
          onClose={() => setZoomedSrc(null)}
        />
      )}
    </div>
  )
}
