import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Compass, Puzzle, ArrowRight, Check } from 'lucide-react'
import { api } from '../api/client'

const STEPS = [
  {
    title: 'Welcome to IReader',
    icon: BookOpen,
    description: 'Read manga and novels from any source, anywhere. Zero-compile plugins, cross-platform, always free.',
    color: 'bg-accent/10 text-accent',
  },
  {
    title: 'Add Your Sources',
    icon: Puzzle,
    description: 'Install source plugins to browse manga from your favorite websites. Plugins are plain JavaScript files — no compilation needed.',
    color: 'bg-violet-500/10 text-violet-500',
  },
  {
    title: 'Start Reading',
    icon: Compass,
    description: 'Browse popular manga, search for titles, add them to your library, and start reading with multiple reading modes.',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
]

export function OnboardingPage() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const current = STEPS[step]
  if (!current) return null
  const Icon = current.icon

  const handleFinish = async () => {
    try { await api.setSetting('onboardingComplete', true) } catch {}
    navigate('/library')
  }

  const handleSkip = async () => {
    try { await api.setSetting('onboardingComplete', true) } catch {}
    // Store in localStorage as fallback for first run
    localStorage.setItem('onboardingComplete', 'true')
    navigate('/library')
  }

  return (
    <div className="fixed inset-0 z-50 bg-bg flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-xs text-text-muted hover:text-text transition-colors px-3 py-1.5 rounded-lg hover:bg-surface"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl ${current.color} flex items-center justify-center mb-6`}>
          <Icon className="w-8 h-8" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <h1 className="text-xl font-bold text-text mb-3 text-center">{current.title}</h1>
        <p className="text-sm text-text-secondary text-center max-w-xs leading-relaxed mb-10">
          {current.description}
        </p>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-8 bg-accent'
                  : i < step
                  ? 'w-4 bg-accent/40'
                  : 'w-4 bg-surface-hover'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[240px]">
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black text-sm font-semibold hover:brightness-110 transition-all"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black text-sm font-semibold hover:brightness-110 transition-all"
            >
              <Check className="w-4 h-4" />
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
