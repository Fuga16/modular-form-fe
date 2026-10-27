export const RESOURCE_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type ResourcePriority =
  (typeof RESOURCE_PRIORITY)[keyof typeof RESOURCE_PRIORITY];

export const RESOURCE_PRIORITY_VALUES = Object.values(RESOURCE_PRIORITY);
