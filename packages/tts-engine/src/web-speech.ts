import { TtsEngine, TtsEngineConfig, TtsState, TtsVoice } from './abstraction'

type StateHandler = (state: TtsState) => void

export class WebSpeechEngine implements TtsEngine {
  readonly type = 'web-speech' as const
  readonly name = 'Web Speech API'

  private synth: SpeechSynthesis
  private utterance: SpeechSynthesisUtterance | null = null
  private _state: TtsState = 'idle'
  private handlers = new Set<StateHandler>()
  private _speed: number = 1
  private _voice: string | null = null
  private charIndex = 0

  constructor(config?: Partial<TtsEngineConfig>) {
    this.synth = window.speechSynthesis
    this._speed = config?.speed ?? 1
    this._voice = config?.voice ?? null
  }

  getState(): TtsState { return this._state }

  private setState(s: TtsState) {
    this._state = s
    this.handlers.forEach(h => h(s))
  }

  on(_event: 'statechange', handler: StateHandler) { this.handlers.add(handler) }
  off(_event: 'statechange', handler: StateHandler) { this.handlers.delete(handler) }

  async speak(text: string, onProgress?: (char: number, total: number) => void): Promise<void> {
    this.stop()
    this.charIndex = 0

    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = this._speed
      utter.volume = 1

      if (this._voice) {
        const voices = this.synth.getVoices()
        const found = voices.find(v => v.voiceURI === this._voice)
        if (found) utter.voice = found
      }

      utter.onstart = () => { this.setState('speaking') }
      utter.onboundary = (e) => {
        this.charIndex = e.charIndex ?? this.charIndex
        onProgress?.(this.charIndex, text.length)
      }
      utter.onend = () => {
        this.setState('idle')
        this.utterance = null
        resolve()
      }
      utter.onerror = () => {
        this.setState('idle')
        this.utterance = null
        resolve()
      }

      this.utterance = utter
      this.synth.speak(utter)
    })
  }

  pause(): void {
    if (this._state === 'speaking') {
      this.synth.pause()
      this.setState('paused')
    }
  }

  resume(): void {
    if (this._state === 'paused') {
      this.synth.resume()
      this.setState('speaking')
    }
  }

  stop(): void {
    if (this.utterance) {
      this.synth.cancel()
      this.utterance = null
    }
    this.setState('idle')
  }

  setVoice(voiceId: string): void { this._voice = voiceId }
  setSpeed(speed: number): void { this._speed = speed }

  async getVoices(): Promise<TtsVoice[]> {
    // Voices may not be loaded immediately
    if (this.synth.getVoices().length > 0) {
      return this.synth.getVoices().map(v => ({
        id: v.voiceURI,
        name: v.name,
        lang: v.lang,
        isDefault: v.default
      }))
    }
    // Wait for voices to load
    return new Promise(resolve => {
      this.synth.onvoiceschanged = () => {
        resolve(this.synth.getVoices().map(v => ({
          id: v.voiceURI,
          name: v.name,
          lang: v.lang,
          isDefault: v.default
        })))
      }
      // Timeout fallback
      setTimeout(() => resolve([]), 3000)
    })
  }

  destroy(): void {
    this.stop()
    this.handlers.clear()
  }
}
