import type { Context } from 'hono'
import { AppError } from '@ireader/core'

export function errorHandler(err: Error, c: Context) {
  if (err instanceof AppError) {
    return c.json({ error: err.message, code: err.code, status: err.status }, err.status as 400|404|409|500)
  }
  console.error('Unhandled:', err)
  return c.json({ error: 'Internal server error', code: 'INTERNAL', status: 500 }, 500)
}
