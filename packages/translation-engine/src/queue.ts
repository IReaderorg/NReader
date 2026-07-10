import { TranslationEngine, TranslationResult } from './abstraction'
import { TranslationCache } from './cache'

export interface QueueItem {
  text: string
  index: number
  targetLang?: string
  sourceLang?: string
}

export interface QueueProgress {
  total: number
  completed: number
  failed: number
}

export class TranslationQueue {
  private engine: TranslationEngine
  private cache: TranslationCache
  private concurrency: number
  private retryCount: number
  private pending: QueueItem[] = []
  private active = 0
  private results: Map<number, TranslationResult> = new Map()
  private errors: Map<number, Error> = new Map()
  private onProgress?: (progress: QueueProgress) => void
  private resolve?: (value: TranslationResult[]) => void
  private reject?: (err: Error) => void

  constructor(engine: TranslationEngine, cache: TranslationCache, concurrency = 3, retryCount = 2) {
    this.engine = engine
    this.cache = cache
    this.concurrency = concurrency
    this.retryCount = retryCount
  }

  /** Translate list of texts (e.g. chapter paragraphs). Returns ordered results. */
  async translateBatch(
    texts: string[],
    targetLang?: string,
    sourceLang?: string,
    onProgress?: (progress: QueueProgress) => void,
  ): Promise<TranslationResult[]> {
    this.pending = texts.map((text, index) => ({ text, index, targetLang, sourceLang }))
    this.results = new Map()
    this.errors = new Map()
    this.onProgress = onProgress

    return new Promise<TranslationResult[]>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
      this.processNext()
    }).then(() => {
      // fill missing with original text
      return texts.map((text, i) => {
        const r = this.results.get(i)
        if (r) return r
        const err = this.errors.get(i)
        return {
          text,
          sourceLang: sourceLang ?? 'auto',
          targetLang: targetLang ?? 'en',
          detectedLang: undefined,
        } as TranslationResult
      })
    })
  }

  private processNext(): void {
    while (this.active < this.concurrency && this.pending.length > 0) {
      const item = this.pending.shift()!
      this.active++
      this.processItem(item).finally(() => {
        this.active--
        this.emitProgress()
        if (this.active === 0 && this.pending.length === 0) {
          this.resolve?.(Array.from(this.results.entries()).sort(([a], [b]) => a - b).map(([, r]) => r))
        } else {
          this.processNext()
        }
      })
    }
  }

  private async processItem(item: QueueItem): Promise<void> {
    const cacheKey = this.cache.key(
      item.sourceLang ?? 'auto',
      item.targetLang ?? 'en',
      item.text,
    )

    // check cache first
    const cached = this.cache.get(cacheKey)
    if (cached !== undefined) {
      this.results.set(item.index, {
        text: cached,
        sourceLang: item.sourceLang ?? 'auto',
        targetLang: item.targetLang ?? 'en',
      })
      return
    }

    let lastError: Error | undefined
    for (let attempt = 0; attempt <= this.retryCount; attempt++) {
      try {
        const result = await this.engine.translate(item.text, item.targetLang, item.sourceLang)
        this.cache.set(cacheKey, result.text)
        this.results.set(item.index, result)
        return
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err))
        if (attempt < this.retryCount) {
          // exponential backoff
          await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
        }
      }
    }

    if (lastError) {
      this.errors.set(item.index, lastError)
    }
  }

  private emitProgress(): void {
    if (!this.onProgress) return
    this.onProgress({
      total: this.results.size + this.errors.size + this.pending.length + this.active,
      completed: this.results.size,
      failed: this.errors.size,
    })
  }
}
