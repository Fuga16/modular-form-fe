import type { ResourcePriority, ResourceStatus } from '@/api/types';

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
  status: ResourceStatus;
  /** Part of the resource email to search for. */
  email: string;
  /** Part of the resource owner to search for. */
  owner: string;
  /** Selected priority filter. */
  priority: ResourcePriority;
  /** Earliest creation date to include, `YYYY-MM-DD`. Stored in the URL as `createdAtFrom`. */
  createdAtFrom: string;
  /** Latest creation date to include, `YYYY-MM-DD`. Stored in the URL as `createdAtTo`. */
  createdAtTo: string;
  /** Earliest update date to include, `YYYY-MM-DD`. Stored in the URL as `updatedAtFrom`. */
  updatedAtFrom: string;
  /** Latest update date to include, `YYYY-MM-DD`. Stored in the URL as `updatedAtTo`. */
  updatedAtTo: string;
}
