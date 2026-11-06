import type { UpdateResourcePayload } from '@/api/types';

/**
 * Unsaved changes for one resource.
 */
export type ResourceBufferItem = UpdateResourcePayload;

/**
 * Unsaved changes for all resources, keyed by resource id.
 */
export type ResourceBuffer = Record<string, ResourceBufferItem>;

export interface ResourceBufferContextValue {
  buffer: ResourceBuffer;

  getBuffer: (resourceId: string) => ResourceBufferItem | undefined;

  setResourceChanges: (resourceId: string, changes: ResourceBufferItem) => void;

  clearBuffer: (resourceId: string) => void;
}
