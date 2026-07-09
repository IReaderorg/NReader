import { create } from 'zustand'
import type { TtsEngine, TtsState, TtsVoice, TtsEngineType } from '@ireader/tts-engine'
import { WebSpeechEngine } from '@ireader/tts-engine'

interface TtsStore {
  engine: TtsEngine | null
  engineType: TtsEngineType
  state: TtsState
  voices: TtsVoice[]
  selectedVoice: string | null
  speed: number
  text: string
  charIndex: number

  initEngine: (type?: TtsEngineType) => void
  speak: (text: string) => Promise<void>
  pause: () => void
  resume: () => void
  stop: () => void
  setSpeed: (speed: number) => void
  setVoice: (voiceId: string) => void
  loadVoices: () => Promise<void>
}

export const useTtsStore = create<TtsStore>((set, get) => ({
  engine: null,
  engineType: 'web-speech',
  state: 'idle',
  voices: [],
  selectedVoice: null,
  speed: 1,
  text: '',
  charIndex: 0,

  initEngine: (type = 'web-speech') => {
    const existing = get().engine
    if (existing) existing.destroy()

    let engine: TtsEngine
    if (type === 'web-speech') {
      engine = new WebSpeechEngine({ speed: get().speed })
    } else {
      engine = new WebSpeechEngine({ speed: get().speed })
    }

    engine.on('statechange', (state) => set({ state }))
    set({ engine, engineType: type })
    get().loadVoices()
  },

  speak: async (text: string) => {
    const { engine } = get()
    if (!engine) {
      get().initEngine()
    }
    const eng = get().engine!
    set({ text, charIndex: 0 })
    await eng.speak(text, (charIndex) => set({ charIndex }))
  },

  pause: () => get().engine?.pause(),
  resume: () => get().engine?.resume(),
  stop: () => get().engine?.stop(),
  setSpeed: (speed: number) => {
    get().engine?.setSpeed(speed)
    set({ speed })
  },
  setVoice: (voiceId: string) => {
    get().engine?.setVoice(voiceId)
    set({ selectedVoice: voiceId })
  },

  loadVoices: async () => {
    const { engine } = get()
    if (!engine) return
    const voices = await engine.getVoices()
    set({ voices })
  }
}))