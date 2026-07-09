export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validatePlugin(plugin: unknown): ValidationResult {
  const errors: string[] = []

  if (typeof plugin !== 'object' || plugin === null) {
    return { valid: false, errors: ['plugin must be a non-null object'] }
  }

  const p = plugin as Record<string, unknown>

  if (typeof p.info !== 'object' || p.info === null) {
    errors.push('plugin.info must be a non-null object')
    return { valid: false, errors }
  }

  const info = p.info as Record<string, unknown>

  if (typeof info.id !== 'string') {
    errors.push('plugin.info.id must be a string')
  }

  if (typeof info.name !== 'string') {
    errors.push('plugin.info.name must be a string')
  }

  if (typeof info.baseUrl !== 'string') {
    errors.push('plugin.info.baseUrl must be a string')
  } else {
    try {
      new URL(info.baseUrl)
    } catch {
      errors.push('plugin.info.baseUrl must be a valid URL')
    }
  }

  if (typeof p.popular !== 'function') {
    errors.push('plugin.popular must be a function')
  }

  return { valid: errors.length === 0, errors }
}
