import type { ResourceStatus } from '@/api/types';
import type { ResourcePriority } from '@/constants/ResourcePriority';

/** One row of the resources table. */
export interface ResourceTable {
  /** Unique id of the resource. */
  id: number;
  /** Technical name taken from general information. */
  name: string;
  /** Description taken from general information. */
  description: string;
  /** Email taken from general information. */
  email: string;
  /** Owner taken from general information. */
  owner: string;
  /** Priority taken from general information. Empty when it is not set. */
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
  /** Part of the resource email to search for. */
  email: string;
}
