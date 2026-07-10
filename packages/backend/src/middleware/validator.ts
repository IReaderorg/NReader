import type { Context } from 'hono'
import { z } from 'zod'
import { ValidationError } from '@ireader/core'

export function validate(schema: z.ZodSchema) {
  return async (c: Context, next: () => Promise<void>) => {
    const result = schema.safeParse(await c.req.json())
    if (!result.success) {
      throw new ValidationError(result.error.message)
    }
    c.set('validated', result.data)
    await next()
  }
}
