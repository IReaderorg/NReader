import { useState, useEffect, useCallback, useRef } from 'react'
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

interface PagerReaderProps {
  pages: Page[]
  direction?: 'ltr' | 'rtl'
  initialPage?: number
  onPageChange?: (page: number) => void
  className?: string
  onCenterTap?: () => void
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
    // Distinguish click from double-click
    const now = Date.now()
    if (now - lastTap.current < 300) {
      handleDoubleClick()
      lastTap.current = 0
      return
    }
    lastTap.current = now
    setTimeout(() => {
      if (Date.now() - lastTap.current >= 300) {
        onClose()
      }
    }, 310)
  }, [handleDoubleClick, onClose])

  // Touch handlers
  const touchStart = useRef({ x: 0, y: 0, posX: 0, posY: 0, dist: 0 })
  const [isPinching, setIsPinching] = useState(false)

  const getTouchDist = (touches: TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[0]!.clientX - touches[1]!.clientX
    const dy = touches[0]!.clientY - touches[1]!.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

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
      const ratio = newDist / (touchStart.current.dist || 1)
      setScale(Math.max(0.5, Math.min(5, ratio)))
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
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors z-10"
      >
        ✕
      </button>
    </div>
  )
}

// ─── PagerReader ────────────────────────────────────────────────────────

export function PagerReader({ pages, direction = 'ltr', initialPage = 0, onPageChange, className, onCenterTap }: PagerReaderProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [preloaded, setPreloaded] = useState<Set<number>>(new Set([initialPage]))
  const touchStartX = useRef<number>(0)
  const [transitioning, setTransitioning] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  const [zoomedSrc, setZoomedSrc] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const doublePage = isLandscape && pages.length > 1

  // Detect landscape via ResizeObserver
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      setIsLandscape(width > height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const goToPage = useCallback((page: number) => {
    const maxPage = pages.length - 1
    const clamped = Math.max(0, Math.min(page, maxPage))
    if (clamped === currentPage || transitioning) return
    setTransitioning(true)
    setCurrentPage(clamped)
    onPageChange?.(clamped)

    const toPreload: number[] = [clamped, clamped + 1, clamped - 1]
    if (doublePage) {
      toPreload.push(clamped + 2, clamped - 2)
    }
    setPreloaded((prev: Set<number>) => {
      const next = new Set(prev)
      for (const p of toPreload) {
        if (p >= 0 && p < pages.length) next.add(p)
      }
      return next
    })

    setTimeout(() => setTransitioning(false), 200)
  }, [pages.length, transitioning, onPageChange, currentPage, doublePage])

  const nextPage = useCallback(() => {
    const forward = direction === 'rtl' ? -1 : 1
    const step = doublePage ? 2 : 1
    goToPage(currentPage + forward * step)
  }, [currentPage, direction, goToPage, doublePage])

  const prevPage = useCallback(() => {
    const backward = direction === 'rtl' ? 1 : -1
    const step = doublePage ? 2 : 1
    goToPage(currentPage + backward * step)
  }, [currentPage, direction, goToPage, doublePage])

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') direction === 'rtl' ? prevPage() : nextPage()
      else if (e.key === 'ArrowLeft') direction === 'rtl' ? nextPage() : prevPage()
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.key === 'ArrowDown' ? nextPage() : prevPage()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [nextPage, prevPage, direction])

  // Click zones: left 40% = prev, right 40% = next, center 20% = tap
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (zoomedSrc) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    if (pct < 0.4) prevPage()
    else if (pct > 0.6) nextPage()
    else onCenterTap?.()
  }, [prevPage, nextPage, onCenterTap, zoomedSrc])

  // Touch swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoomedSrc) return
    touchStartX.current = e.touches[0]!.clientX
  }, [zoomedSrc])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (zoomedSrc) return
    const dx = e.changedTouches[0]!.clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextPage()
      else prevPage()
    }
  }, [nextPage, prevPage, zoomedSrc])

  // Image click → zoom
  const handleImageClick = useCallback((e: React.MouseEvent, url: string) => {
    e.stopPropagation()
    setZoomedSrc(url)
  }, [])

  useEffect(() => {
    if (initialPage > 0 && initialPage !== currentPage) {
      setCurrentPage(initialPage)
    }
  }, [initialPage]) // eslint-disable-line react-hooks/exhaustive-deps

  // Render visible pages
  const renderPages = () => {
    if (doublePage) {
      // Show current page + next page side by side
      // For the first page, show alone (like a cover)
      const leftIdx = currentPage
      const rightIdx = currentPage + 1
      // For RTL, swap left/right
      const firstPage = direction === 'rtl' ? rightIdx : leftIdx
      const secondPage = direction === 'rtl' ? leftIdx : rightIdx
      const secondExists = secondPage < pages.length && secondPage >= 0
      const firstExists = firstPage < pages.length && firstPage >= 0

      return (
        <div className="flex items-center justify-center gap-1 w-full h-full px-1">
          {firstExists && (
            <div className="flex-1 flex items-center justify-center h-full max-w-[50%]">
              {renderPage(firstPage)}
            </div>
          )}
          {secondExists && (
            <div className="flex-1 flex items-center justify-center h-full max-w-[50%]">
              {renderPage(secondPage)}
            </div>
          )}
        </div>
      )
    }

    return renderPage(currentPage)
  }

  const renderPage = (idx: number) => {
    if (idx < 0 || idx >= pages.length) return null
    const page = pages[idx]
    if (!page) return null

    if (preloaded.has(idx)) {
      return (
        <img
          src={page.url}
          alt={`Page ${idx + 1}`}
          className="max-w-full max-h-[100vh] object-contain cursor-zoom-in"
          width={page.width}
          height={page.height}
          draggable={false}
          onClick={(e) => handleImageClick(e, page.url)}
        />
      )
    }
    return (
      <div className="w-64 aspect-[3/4] bg-[hsl(var(--surface))] animate-pulse rounded-sm" />
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full flex items-center justify-center bg-black select-none', className)}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn(
          'w-full h-full flex items-center justify-center transition-opacity duration-200',
          transitioning ? 'opacity-60' : 'opacity-100'
        )}
      >
        {renderPages()}
      </div>

      {/* Page number indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none select-none z-10">
        {doublePage
          ? `${currentPage + 1}-${Math.min(currentPage + 2, pages.length)} / ${pages.length}`
          : `${currentPage + 1} / ${pages.length}`
        }
      </div>

      {/* Click zone hints (invisible) */}
      <div className="absolute inset-y-0 left-0 w-[40%] cursor-w-resize z-0" />
      <div className="absolute inset-y-0 right-0 w-[40%] cursor-e-resize z-0" />

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
