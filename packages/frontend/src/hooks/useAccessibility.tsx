import { useEffect, useCallback } from 'react'

/**
 * Hook that manages keyboard focus trapping for modals and dialogs.
 * Tabs cycle through focusable elements within the container.
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  enabled: boolean = true
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || e.key !== 'Tab' || !containerRef.current) return

      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusable.length === 0) return

      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [containerRef, enabled]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  /** Focus first focusable element in container */
  const focusFirst = useCallback(() => {
    if (!containerRef.current) return
    const first = containerRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    first?.focus()
  }, [containerRef])

  return { focusFirst }
}

/**
 * Hook that announces dynamic content changes to screen readers via
 * a visually-hidden aria-live region.
 */
export function useLiveAnnouncement() {
  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    // Find or create an aria-live region
    let region = document.getElementById('sr-announcer')
    if (!region) {
      region = document.createElement('div')
      region.id = 'sr-announcer'
      region.setAttribute('aria-live', politeness)
      region.setAttribute('aria-atomic', 'true')
      region.className = 'sr-only absolute w-px h-px overflow-hidden whitespace-nowrap border-0 p-0'
      document.body.appendChild(region)
    }
    // Clear then set to trigger announcement
    region.textContent = ''
    requestAnimationFrame(() => {
      region!.textContent = message
    })
  }, [])

  return { announce }
}

/**
 * Skip-to-content link for keyboard users.
 * Renders a visually hidden link that becomes visible on focus,
 * allowing users to skip navigation and jump to main content.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50
                 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-accent/50"
    >
      Skip to main content
    </a>
  )
}
