import { useEffect } from 'react'

export function useScrollLock(visible: boolean) {
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [visible])
}
