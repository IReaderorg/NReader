import { useEffect, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { LoadingState } from './SharedStates'

interface Props {
  children: ReactNode
}

export function OnboardingGuard({ children }: Props) {
  const [checking, setChecking] = useState(true)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    api.getSettings()
      .then((data: Record<string, unknown>) => {
        if (!data.onboardingComplete) {
          setNeedsOnboarding(true)
        }
      })
      .catch(() => { /* backend unavailable, skip onboarding */ })
      .finally(() => setChecking(false))
  }, [])

  useEffect(() => {
    if (checking) return
    if (needsOnboarding && location.pathname !== '/onboarding') {
      navigate('/onboarding', { replace: true })
    }
  }, [checking, needsOnboarding, location.pathname, navigate])

  if (checking) {
    return <LoadingState variant="fullscreen" message="Loading…" />
  }

  return <>{children}</>
}
