export const getNestedValue = (path: string, data: Record<string, unknown>): unknown => {
  const [current, ...rest] = path.split('.')

  const value = data[current]

  if (!rest.length) {
    return value ?? '-'
  }

  if (value === null || value === undefined || typeof value !== 'object') {
    return '-'
  }

  return getNestedValue(rest.join('.'), value as Record<string, unknown>)
}
