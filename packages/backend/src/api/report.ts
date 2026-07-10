import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'

interface ReportEntry {
  id: string
  sourceId: string
  chapterId: string
  chapterName: string
  category: string
  description: string
  reportedAt: string
}

function loadReports(repo: SettingsRepository): Promise<ReportEntry[]> {
  return repo.get('reports').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as ReportEntry[] } catch { return [] }
  })
}

function saveReports(repo: SettingsRepository, reports: ReportEntry[]): Promise<void> {
  return repo.set('reports', JSON.stringify(reports))
}

const VALID_CATEGORIES = [
  'missing_content', 'incorrect_content', 'formatting_issues',
  'translation_errors', 'duplicate_content', 'other',
]

export function createReportRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  app.post('/', async (c) => {
    try {
      const body = await c.req.json<{
        sourceId: string
        chapterId: string
        chapterName?: string
        category: string
        description?: string
      }>()

      if (!body.sourceId || !body.chapterId || !body.category) {
        return c.json({
          error: 'sourceId, chapterId, and category are required',
          code: 'VALIDATION_ERROR',
          status: 400,
        }, 400)
      }

      if (!VALID_CATEGORIES.includes(body.category)) {
        return c.json({
          error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`,
          code: 'VALIDATION_ERROR',
          status: 400,
        }, 400)
      }

      const report: ReportEntry = {
        id: `report_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        sourceId: body.sourceId,
        chapterId: body.chapterId,
        chapterName: body.chapterName || 'Unknown Chapter',
        category: body.category,
        description: body.description || '',
        reportedAt: new Date().toISOString(),
      }

      const reports = await loadReports(repo)
      reports.push(report)
      await saveReports(repo, reports)
      console.log(`[Report] New report: ${report.id} — ${report.category} for chapter "${report.chapterName}"`)

      return c.json({ success: true, reportId: report.id }, 201)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to submit report'
      return c.json({ error: msg, code: 'REPORT_ERROR', status: 500 }, 500)
    }
  })

  app.get('/', async (c) => {
    const reports = await loadReports(repo)
    return c.json(reports.slice(-50))
  })

  return app
}
