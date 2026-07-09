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

export function PagerReader({ pages, direction = 'ltr', initialPage = 0, onPageChange, className, onCenterTap }: PagerReaderProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [preloaded, setPreloaded] = useState<Set<number>>(new Set([initialPage]))
  const touchStartX = useRef<number>(0)
  const [transitioning, setTransitioning] = useState(false)

  const goToPage = useCallback((page: number) => {
    if (page < 0 || page >= pages.length || transitioning) return
    setTransitioning(true)
    setCurrentPage(page)
    onPageChange?.(page)

    // Preload next/prev
    const toPreload = [page, page + 1, page - 1].filter(p => p >= 0 && p < pages.length)
    setPreloaded(prev => {
      const next = new Set(prev)
      for (const p of toPreload) next.add(p)
      return next
    })

    setTimeout(() => setTransitioning(false), 200)
  }, [pages.length, transitioning, onPageChange])

  const nextPage = useCallback(() => {
    const forward = direction === 'rtl' ? -1 : 1
    goToPage(currentPage + forward)
  }, [currentPage, direction, goToPage])

  const prevPage = useCallback(() => {
    const backward = direction === 'rtl' ? 1 : -1
    goToPage(currentPage + backward)
  }, [currentPage, direction, goToPage])

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
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    if (pct < 0.4) prevPage()
    else if (pct > 0.6) nextPage()
    else onCenterTap?.()
  }, [prevPage, nextPage, onCenterTap])

  // Touch swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextPage()
      else prevPage()
    }
  }, [nextPage, prevPage])

  useEffect(() => {
    if (initialPage > 0 && initialPage !== currentPage) {
      setCurrentPage(initialPage)
    }
  }, [initialPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const page = pages[currentPage]
  if (!page) return null

  return (
    <div
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
        {preloaded.has(currentPage) ? (
          <img
            src={page.url}
            alt={`Page ${currentPage + 1}`}
            className="max-w-full max-h-[100vh] object-contain"
            width={page.width}
            height={page.height}
            draggable={false}
          />
        ) : (
          <div className="w-64 aspect-[3/4] bg-[hsl(var(--surface))] animate-pulse rounded-sm" />
        )}
      </div>

      {/* Page number indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none select-none">
        {currentPage + 1} / {pages.length}
      </div>

      {/* Click zone hints (invisible) */}
      <div className="absolute inset-y-0 left-0 w-[40%] cursor-w-resize" />
      <div className="absolute inset-y-0 right-0 w-[40%] cursor-e-resize" />
    </div>
  )
}
