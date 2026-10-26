import type { BasicInfo, ProjectDetails } from '@/api/types';

/** Unsaved changes for one resource. Each section is a partial of its full type. */
export type ResourceBufferItem = {
  /** Pending edits to the basic info section. */
  basicInfo?: Partial<BasicInfo>;
  /** Pending edits to the project details section. */
  projectDetails?: Partial<ProjectDetails>;
};

/** Unsaved changes for all resources, keyed by resource id. */
export type ResourceBuffer = Record<string, ResourceBufferItem>;

/** Value shared through ResourceBufferContext. */
export interface ResourceBufferContextValue {
  /** All buffered changes. Prefer `getBuffer` for a single resource. */
  buffer: ResourceBuffer;

  /** Returns the buffered changes for a resource, or `undefined` if there are none. */
  getBuffer: (resourceId: string) => ResourceBufferItem | undefined;

  /**
   * Merges the given fields into the resource's basic info buffer.
   * Fields not passed are kept from earlier updates.
   */
  updateBasicInfo: (resourceId: string, data: Partial<BasicInfo>) => void;

  /**
   * Merges the given fields into the resource's project details buffer.
   * Fields not passed are kept from earlier updates.
   */
  updateProjectDetails: (
    resourceId: string,
    data: Partial<ProjectDetails>,
  ) => void;

  /** Removes all buffered changes for a resource, for example after saving or discarding. */
  clearBuffer: (resourceId: string) => void;
}
