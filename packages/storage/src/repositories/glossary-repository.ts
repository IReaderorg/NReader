import type { GlossaryRepository, GlossaryEntry } from '@ireader/core'
import type { SQLiteDriver } from '../drivers/interface.js'
import { randomUUID } from 'node:crypto'

export class SqliteGlossaryRepository implements GlossaryRepository {
  constructor(private driver: SQLiteDriver) {}

  async getAll(): Promise<GlossaryEntry[]> {
    const rows = await this.driver.query<Record<string, string | null>>(
      'SELECT * FROM glossary ORDER BY source_lang, target_lang, source_text'
    )
    return rows.map(row => ({
      id: row.id ?? '',
      sourceLang: row.source_lang ?? '',
      targetLang: row.target_lang ?? 'en',
      sourceText: row.source_text ?? '',
      targetText: row.target_text ?? '',
      context: row.context ?? undefined,
      createdAt: row.created_at ?? '',
      updatedAt: row.updated_at ?? '',
    }))
  }

  async getById(id: string): Promise<GlossaryEntry | null> {
    const row = await this.driver.queryOne<Record<string, string | null>>(
      'SELECT * FROM glossary WHERE id = ?', [id]
    )
    if (!row) return null
    return {
      id: row.id ?? '',
      sourceLang: row.source_lang ?? '',
      targetLang: row.target_lang ?? 'en',
      sourceText: row.source_text ?? '',
      targetText: row.target_text ?? '',
      context: row.context ?? undefined,
      createdAt: row.created_at ?? '',
      updatedAt: row.updated_at ?? '',
    }
  }

  async search(sourceText: string, sourceLang: string, targetLang: string): Promise<GlossaryEntry | null> {
    const row = await this.driver.queryOne<Record<string, string | null>>(
      'SELECT * FROM glossary WHERE source_text = ? AND source_lang = ? AND target_lang = ? LIMIT 1',
      [sourceText, sourceLang, targetLang]
    )
    if (!row) return null
    return {
      id: row.id ?? '',
      sourceLang: row.source_lang ?? '',
      targetLang: row.target_lang ?? 'en',
      sourceText: row.source_text ?? '',
      targetText: row.target_text ?? '',
      context: row.context ?? undefined,
      createdAt: row.created_at ?? '',
      updatedAt: row.updated_at ?? '',
    }
  }

  async add(entry: GlossaryEntry): Promise<void> {
    const id = entry.id || randomUUID()
    await this.driver.execute(
      `INSERT INTO glossary (id, source_lang, target_lang, source_text, target_text, context, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, entry.sourceLang, entry.targetLang, entry.sourceText, entry.targetText, entry.context ?? null, entry.createdAt || new Date().toISOString(), entry.updatedAt || new Date().toISOString()]
    )
  }

  async update(entry: Partial<GlossaryEntry> & { id: string }): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []
    if (entry.sourceLang !== undefined) { fields.push('source_lang = ?'); values.push(entry.sourceLang) }
    if (entry.targetLang !== undefined) { fields.push('target_lang = ?'); values.push(entry.targetLang) }
    if (entry.sourceText !== undefined) { fields.push('source_text = ?'); values.push(entry.sourceText) }
    if (entry.targetText !== undefined) { fields.push('target_text = ?'); values.push(entry.targetText) }
    if (entry.context !== undefined) { fields.push('context = ?'); values.push(entry.context) }
    fields.push('updated_at = ?'); values.push(new Date().toISOString())
    if (fields.length === 0) return
    values.push(entry.id)
    await this.driver.execute(`UPDATE glossary SET ${fields.join(', ')} WHERE id = ?`, values)
  }

  async remove(id: string): Promise<void> {
    await this.driver.execute('DELETE FROM glossary WHERE id = ?', [id])
  }
}
