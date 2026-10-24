import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types'
import { sanitizePaginationParams } from './sanitizePaginationParams'
import { sanitizeSortParams } from './sanitizeSortParams'

export const sanitizeSearchParams = (
  searchParams: URLSearchParams,
  config: FieldConfig[],
) => {
  const params = new URLSearchParams()

  config.forEach((field) => {
    const value = searchParams.get(field.name)

    if (!value) {
      return
    }

    const sanitized =
      'sanitize' in field && field.sanitize ? field.sanitize(value) : value

    params.set(field.name, sanitized)
  })

  const { page, pageSize } = sanitizePaginationParams(searchParams)

  params.set('page', page)
  params.set('pageSize', pageSize)

  const sortOrder = sanitizeSortParams(searchParams)

  if (sortOrder) {
    params.set('sortOrder', sortOrder)
  }

  return params
}
