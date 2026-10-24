export const RESOURCE_CATEGORY = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  VENDOR: 'vendor',
} as const

export type ResourceCategory = (typeof RESOURCE_CATEGORY)[keyof typeof RESOURCE_CATEGORY]

export const RESOURCE_CATEGORY_VALUES = Object.values(RESOURCE_CATEGORY)
