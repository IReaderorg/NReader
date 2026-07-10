import { useState, useEffect } from 'react'
import { X, Play, Pause, Square, Volume2, Gauge, ChevronDown } from 'lucide-react'
import { useTtsStore } from '../store/tts-store'
import { useScrollLock } from '../hooks/useScrollLock'

interface TtsControlSheetProps {
  visible: boolean
  onClose: () => void
  /** Current text content to preview */
  textContent: string
}

export function TtsControlSheet({ visible, onClose, textContent }: TtsControlSheetProps) {
  const {
    state: ttsState, speed, setSpeed, pitch, setPitch,
    voices, selectedVoice, setVoice,
    speak, pause, resume, stop, text,
  } = useTtsStore()

  const [voiceDropdown, setVoiceDropdown] = useState(false)

  useScrollLock(visible)

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  if (!visible) return null

  const isActive = ttsState !== 'idle'
  const isSpeaking = ttsState === 'speaking'
  const isPaused = ttsState === 'paused'

  const handlePlayPause = () => {
    if (isSpeaking) {
      pause()
    } else if (isPaused) {
      resume()
    } else {
      speak(textContent)
    }
  }

  // Preview text: show last ~200 chars of current TTS text, or first 200 of available content
  const previewText = text
    ? text.slice(Math.max(0, text.length - 300))
    : textContent.slice(0, 300)

  return (
    <div className="fixed inset-0 z-[65]">
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-150" onClick={onClose} />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-surface rounded-t-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Handle + Header */}
        <div className="shrink-0">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-text-muted/30" />
          </div>
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-accent/10' : 'bg-surface-hover/50'}`}>
                <Volume2 className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
              </div>
              <h2 className="text-base font-semibold text-text">Text-to-Speech</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
          {/* Voice Selection */}
          <div>
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Voice</p>
            <div className="relative">
              <button
                onClick={() => setVoiceDropdown(v => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-hover/50 hover:bg-surface-hover transition-colors text-sm text-text"
              >
                <span className="truncate">
                  {selectedVoice
                    ? voices.find(v => v.id === selectedVoice)?.name || 'Custom Voice'
                    : 'Default Voice'}
                </span>
                <ChevronDown className={`w-4 h-4 text-text-muted shrink-0 ml-2 transition-transform ${voiceDropdown ? 'rotate-180' : ''}`} />
              </button>
              {voiceDropdown && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-surface border border-border-light rounded-xl shadow-lg max-h-40 overflow-y-auto z-10 animate-in fade-in slide-in-from-bottom-2">
                  <button
                    onClick={() => { setVoice(''); setVoiceDropdown(false) }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-surface-hover transition-colors ${!selectedVoice ? 'text-accent' : 'text-text'}`}
                  >
                    Default Voice
                  </button>
                  {voices.map(v => (
                    <button
                      key={v.id}
                      onClick={() => { setVoice(v.id); setVoiceDropdown(false) }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-surface-hover transition-colors flex justify-between ${selectedVoice === v.id ? 'text-accent' : 'text-text'}`}
                    >
                      <span className="truncate">{v.name}</span>
                      <span className="text-xs text-text-muted shrink-0 ml-2">{v.lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Speed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-text-secondary" />
                <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Speed</p>
              </div>
              <span className="text-xs text-text-muted tabular-nums">{speed.toFixed(2)}x</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSpeed(Math.max(0.5, speed - 0.25))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-surface-hover/50 text-text-secondary text-sm shrink-0 hover:bg-surface-hover"
              >−</button>
              <input
                type="range" min={0.5} max={3.0} step={0.05}
                value={speed}
                onChange={e => setSpeed(Number(e.target.value))}
                className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
              />
              <button
                onClick={() => setSpeed(Math.min(3.0, speed + 0.25))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-surface-hover/50 text-text-secondary text-sm shrink-0 hover:bg-surface-hover"
              >+</button>
              {/* Speed presets */}
              <div className="flex gap-1 shrink-0">
                {[0.75, 1, 1.5, 2].map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${speed === s ? 'bg-accent text-black' : 'bg-surface-hover/30 text-text-muted hover:bg-surface-hover'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pitch */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Pitch</p>
              <span className="text-xs text-text-muted tabular-nums">{pitch.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPitch(Math.max(0.5, pitch - 0.1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-surface-hover/50 text-text-secondary text-sm shrink-0 hover:bg-surface-hover"
              >−</button>
              <input
                type="range" min={0.5} max={2.0} step={0.1}
                value={pitch}
                onChange={e => setPitch(Number(e.target.value))}
                className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
              />
              <button
                onClick={() => setPitch(Math.min(2.0, pitch + 0.1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-surface-hover/50 text-text-secondary text-sm shrink-0 hover:bg-surface-hover"
              >+</button>
            </div>
          </div>

          {/* Transport Controls */}
          <div>
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-3">Controls</p>
            <div className="flex items-center justify-center">
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 ${isActive ? 'bg-accent text-black' : 'bg-accent/10 text-accent hover:bg-accent'}`}
              >
                {isSpeaking ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className={`w-6 h-6 ${!isActive ? 'ml-0.5' : ''}`} />
                )}
              </button>
            </div>

            {/* Status + Stop */}
            {isActive && (
              <div className="flex items-center justify-between mt-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-medium text-text">
                    {isSpeaking ? 'Playing' : 'Paused'}
                  </span>
                </div>
                <button
                  onClick={stop}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-danger hover:bg-danger/10 transition-colors"
                >
                  <Square className="w-3.5 h-3.5" />
                  Stop
                </button>
              </div>
            )}
          </div>

          {/* Text Preview */}
          {(isActive || previewText) && (
            <div>
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                {isActive ? 'Now Reading' : 'Preview'}
              </p>
              <div className="bg-surface-hover/30 rounded-xl p-3 max-h-24 overflow-y-auto">
                <p className="text-xs text-text-muted leading-relaxed whitespace-pre-wrap">
                  {previewText}
                  {previewText.length >= 300 && '…'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Safe area */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </div>
    </div>
  )
}
