export const RESOURCE_PROJECT_CATEGORY = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  VENDOR: 'vendor',
} as const;

export type ResourceProjectCategory =
  (typeof RESOURCE_PROJECT_CATEGORY)[keyof typeof RESOURCE_PROJECT_CATEGORY];

export const RESOURCE_PROJECT_CATEGORY_VALUES = Object.values(
  RESOURCE_PROJECT_CATEGORY,
);
