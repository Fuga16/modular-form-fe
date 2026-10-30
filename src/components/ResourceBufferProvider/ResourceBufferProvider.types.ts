import type { GeneralInfo, ProjectDetails } from '@/api/types';

/** Unsaved changes for one resource. Each section is a partial of its full type. */
export type ResourceBufferItem = {
  /** Pending edits to the general information section. */
  generalInfo?: Partial<GeneralInfo>;
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
   * Merges the given fields into the resource's general information buffer.
   * Fields not passed are kept from earlier updates.
   */
  updateGeneralInfo: (resourceId: string, data: Partial<GeneralInfo>) => void;

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
