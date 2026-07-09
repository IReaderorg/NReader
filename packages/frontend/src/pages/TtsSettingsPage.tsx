import { useEffect } from 'react'
import { useTtsStore } from '../store/tts-store'
import { ArrowLeft, Play, Pause, Square, Volume2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function TtsSettingsPage() {
  const navigate = useNavigate()
  const { speed, setSpeed, voices, selectedVoice, setVoice, state, speak, pause, resume, stop, initEngine } = useTtsStore()

  useEffect(() => {
    if (!voices.length) {
      initEngine()
    }
  }, [])

  const testVoices = () => {
    const testText = 'This is a test of the text to speech engine.'
    speak(testText)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate('/settings')}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Text-to-Speech</h1>
      </div>

      <div className="space-y-5">
        {/* Speed */}
        <div>
          <h2 className="text-xs font-semibold text-text mb-3 flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Speed: {speed}x
          </h2>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.25}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-full h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--accent))]"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>0.5x</span>
            <span>1x</span>
            <span>3x</span>
          </div>
        </div>

        {/* Voice selection */}
        <div>
          <h2 className="text-xs font-semibold text-text mb-2">Voice</h2>
          <select
            value={selectedVoice ?? ''}
            onChange={e => setVoice(e.target.value)}
            className="w-full rounded-xl bg-surface border border-border-light px-3 py-2.5 text-sm text-text"
          >
            <option value="">System Default</option>
            {voices.map(v => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.lang}){v.isDefault ? ' — Default' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Test */}
        <div>
          <h2 className="text-xs font-semibold text-text mb-2">Test</h2>
          <div className="flex gap-2">
            <button
              onClick={testVoices}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors text-sm text-text"
            >
              <Play className="w-4 h-4 text-accent" strokeWidth={1.5} />
              Play
            </button>
            {state !== 'idle' && (
              <>
                {state === 'speaking' ? (
                  <button onClick={pause} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors text-sm text-text">
                    <Pause className="w-4 h-4" strokeWidth={1.5} />
                    Pause
                  </button>
                ) : (
                  <button onClick={resume} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-light hover:bg-surface-hover transition-colors text-sm text-text">
                    <Play className="w-4 h-4" strokeWidth={1.5} />
                    Resume
                  </button>
                )}
                <button onClick={stop} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm hover:bg-danger/20 transition-colors">
                  <Square className="w-4 h-4" strokeWidth={1.5} />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="p-3 rounded-xl bg-surface border border-border-light">
          <p className="text-xs text-text-secondary">
            Status: <span className="font-medium text-text capitalize">{state}</span>
          </p>
          <p className="text-xs text-text-muted mt-1">
            Uses your browser's built-in Web Speech API. Voice quality depends on your system.
          </p>
        </div>
      </div>
    </div>
  )
}