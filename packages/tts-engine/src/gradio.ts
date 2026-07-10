import { TtsEngine, TtsEngineConfig, TtsState, TtsVoice } from './abstraction'

type StateHandler = (state: TtsState) => void

interface GradioPredictResponse {
  data: [string, string] // [audio_b64, sample_rate]
}

export class GradioTTSEngine implements TtsEngine {
  readonly type = 'gradio' as const
  readonly name = 'Gradio TTS'

  private endpoint: string
  private _state: TtsState = 'idle'
  private handlers = new Set<StateHandler>()
  private _speed: number = 1
  private _voice: string | null = null
  private audioContext: AudioContext | null = null
  private currentSource: AudioBufferSourceNode | null = null
  private voices: TtsVoice[] = []

  constructor(config?: Partial<TtsEngineConfig>) {
    if (!config?.gradioEndpoint) throw new Error('Gradio endpoint URL required')
    this.endpoint = config.gradioEndpoint.replace(/\/$/, '')
    this._speed = config?.speed ?? 1
    this._voice = config?.voice ?? null
  }

  getState(): TtsState { return this._state }

  private setState(s: TtsState) {
    this._state = s
    this.handlers.forEach(h => h(s))
  }

  on(_event: 'statechange', handler: StateHandler) { this.handlers.add(handler); }
  off(_event: 'statechange', handler: StateHandler) { this.handlers.delete(handler); }

  private getOrCreateContext(): AudioContext {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      this.audioContext = new AudioContext()
    }
    return this.audioContext
  }

  async speak(text: string, onProgress?: (char: number, total: number) => void): Promise<void> {
    this.stop()
    const ctx = this.getOrCreateContext()

    // Fire progress start
    onProgress?.(0, text.length)

    try {
      const voice = this._voice ?? 'default'
      const speed = this._speed

      const res = await fetch(`${this.endpoint}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [text, voice, speed]
        })
      })

      if (!res.ok) {
        throw new Error(`Gradio TTS error: ${res.status} ${await res.text()}`)
      }

      const result: GradioPredictResponse = await res.json()
      const b64 = result.data[0]
      const sampleRate = parseInt(result.data[1] ?? '22050', 10)

      // Decode base64 to ArrayBuffer
      const byteString = atob(b64)
      const bytes = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        bytes[i] = byteString.charCodeAt(i)
      }

      // Assume 16-bit PCM mono WAV; create WAV file from raw PCM
      const wavBuffer = this.encodeWav(bytes.buffer, sampleRate)
      const audioBuffer = await ctx.decodeAudioData(wavBuffer)

      return new Promise((resolve) => {
        const source = ctx.createBufferSource()
        source.buffer = audioBuffer
        source.playbackRate.value = 1 // Gradio already applies speed

        source.connect(ctx.destination)
        this.currentSource = source

        source.onended = () => {
          this.currentSource = null
          this.setState('idle')
          onProgress?.(text.length, text.length)
          resolve()
        }

        this.setState('speaking')
        source.start(0)

        // Simulate progress since we can't get per-character from audio
        const totalDuration = audioBuffer.duration * 1000
        const steps = 10
        const interval = totalDuration / steps
        let step = 1
        const timer = setInterval(() => {
          onProgress?.(Math.floor((step / steps) * text.length), text.length)
          step++
          if (step > steps) clearInterval(timer)
        }, interval)
      })
    } catch (err) {
      this.setState('idle')
      throw err
    }
  }

  private encodeWav(pcmData: ArrayBuffer, sampleRate: number): ArrayBuffer {
    const numChannels = 1
    const bitsPerSample = 16
    const byteRate = sampleRate * numChannels * bitsPerSample / 8
    const blockAlign = numChannels * bitsPerSample / 8
    const dataSize = pcmData.byteLength
    const headerSize = 44
    const buffer = new ArrayBuffer(headerSize + dataSize)
    const view = new DataView(buffer)

    // RIFF header
    this.writeString(view, 0, 'RIFF')
    view.setUint32(4, 36 + dataSize, true)
    this.writeString(view, 8, 'WAVE')

    // fmt chunk
    this.writeString(view, 12, 'fmt ')
    view.setUint32(16, 16, true) // chunk size
    view.setUint16(20, 1, true)  // PCM
    view.setUint16(22, numChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, byteRate, true)
    view.setUint16(32, blockAlign, true)
    view.setUint16(34, bitsPerSample, true)

    // data chunk
    this.writeString(view, 36, 'data')
    view.setUint32(40, dataSize, true)
    new Uint8Array(buffer, headerSize).set(new Uint8Array(pcmData))

    return buffer
  }

  private writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i))
    }
  }

  pause(): void {
    if (this._state === 'speaking' && this.currentSource && this.audioContext) {
      this.audioContext.suspend()
      this.setState('paused')
    }
  }

  resume(): void {
    if (this._state === 'paused' && this.audioContext) {
      this.audioContext.resume()
      this.setState('speaking')
    }
  }

  stop(): void {
    if (this.currentSource) {
      try { this.currentSource.stop() } catch { /* already stopped */ }
      this.currentSource = null
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {})
      this.audioContext = null
    }
    this.setState('idle')
  }

  setVoice(voiceId: string): void { this._voice = voiceId; }
  setSpeed(speed: number): void { this._speed = speed; }
  setPitch(_pitch: number): void { /* Gradio handles pitch via voice selection */ }

  async getVoices(): Promise<TtsVoice[]> {
    if (this.voices.length > 0) return this.voices

    try {
      const res = await fetch(`${this.endpoint}/api/voices`)
      if (res.ok) {
        this.voices = await res.json()
        return this.voices
      }
    } catch { /* endpoint may not support voice listing */ }

    this.voices = [
      { id: 'default', name: 'Default', lang: 'en', isDefault: true },
      { id: 'female_1', name: 'Female 1', lang: 'en', isDefault: false },
      { id: 'male_1', name: 'Male 1', lang: 'en', isDefault: false },
    ]
    return this.voices
  }

  destroy(): void {
    this.stop()
    this.handlers.clear()
    this.voices = []
  }
}
