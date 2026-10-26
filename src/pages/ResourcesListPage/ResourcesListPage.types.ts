import type { Resource, ResourceStatus } from '@/api/types';
import type { ResourcePriority } from '@/constants/ResourcePriority';

/** One row of the resources table. */
export interface ResourceTable {
  /** Unique id of the resource. */
  resourceId: number;
  /** Technical name taken from basic info. */
  resourceName: string;
  /** Description taken from basic info. */
  description: string;
  /** Email taken from basic info. */
  email: string;
  /** Owner taken from basic info. */
  owner: string;
  /** Priority taken from basic info. Empty when it is not set. */
  priority: ResourcePriority | '';
  /** Current status of the resource. */
  status: ResourceStatus;
  /** ISO date when the resource was created. */
  createdAt?: string;
  /** ISO date of the last change. */
  updatedAt?: string;
}

/** Values of the filter form. Each key is also a query parameter in the URL. */
export interface ResourcesFilters {
  /** Part of the resource name to search for. */
  name: string;
  /** Selected status filter. */
  status: string;
}

/** Maps a resource from the API to a row of the table. */
export const toResourceTableRow = ({
  resourceId,
  status,
  createdAt,
  updatedAt,
  basicInfo,
}: Resource): ResourceTable => ({
  resourceId,
  resourceName: basicInfo.resourceName,
  description: basicInfo.description,
  email: basicInfo.email,
  owner: basicInfo.owner,
  priority: basicInfo.priority,
  status,
  createdAt,
  updatedAt,
});
