import type { ResourcePriority } from '@/constants/ResourcePriority';
import type { ResourceProjectCategory } from '@/constants/ResourceProjectCategory';
import type { TeamMember } from '@/constants/TeamOptions';

export type ResourceStatus = 'draft' | 'completed';

export interface GeneralInfo {
  name: string;
  owner: string;
  email: string;
  description: string;
  priority: ResourcePriority | '';
}

export interface ProjectDetails {
  projectName: string;
  budget: string;
  projectCategory: ResourceProjectCategory | '';
  options: TeamMember[];
}

export interface ResourceFields extends GeneralInfo {
  projectDetails: ProjectDetails;
}

export interface Resource extends ResourceFields {
  id: number;
  _id?: string;
  status: ResourceStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type ResourcePayload = ResourceFields;
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ListResourcesResponse {
  data: Resource[];
  pagination: Pagination;
}

export interface ListResourcesQuery {
  page?: number;
  pageSize?: number;

  status?: ResourceStatus;
  name?: string;
  email?: string;

  sortOrder?: 'asc' | 'desc';
}
