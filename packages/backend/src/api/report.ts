import { Hono } from 'hono'

const reportLogs: Array<{
  id: string
  sourceId: string
  chapterId: string
  chapterName: string
  category: string
  description: string
  reportedAt: string
}> = []

export function createReportRouter(): Hono {
  const app = new Hono()

  // Submit a chapter report
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

      const validCategories = [
        'missing_content', 'incorrect_content', 'formatting_issues',
        'translation_errors', 'duplicate_content', 'other',
      ]

      if (!validCategories.includes(body.category)) {
        return c.json({
          error: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
          code: 'VALIDATION_ERROR',
          status: 400,
        }, 400)
      }

      const report = {
        id: `report_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        sourceId: body.sourceId,
        chapterId: body.chapterId,
        chapterName: body.chapterName || 'Unknown Chapter',
        category: body.category,
        description: body.description || '',
        reportedAt: new Date().toISOString(),
      }

      reportLogs.push(report)
      console.log(`[Report] New report: ${report.id} — ${report.category} for chapter "${report.chapterName}"`)

      return c.json({ success: true, reportId: report.id }, 201)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to submit report'
      return c.json({ error: msg, code: 'REPORT_ERROR', status: 500 }, 500)
    }
  })

  // Get recent reports (admin/debug)
  app.get('/', (c) => {
    return c.json(reportLogs.slice(-50))
  })

  return app
}
