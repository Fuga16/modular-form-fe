import type { ResourceCategory } from '@/constants/ResourceCategory';
import type { ResourcePriority } from '@/constants/ResourcePriority';
import type { TeamMember } from '@/constants/TeamOptions';

export type ResourceStatus = 'draft' | 'completed';

export interface BasicInfo {
  resourceName: string;
  owner: string;
  email: string;
  description: string;
  priority: ResourcePriority | '';
}

export interface ProjectDetails {
  projectName: string;
  budget: string;
  category: ResourceCategory | '';
  options: TeamMember[];
}

export interface Resource {
  resourceId: number;
  _id?: string;

  name: string;
  status: ResourceStatus;

  basicInfo: BasicInfo;
  projectDetails: ProjectDetails;

  createdAt?: string;
  updatedAt?: string;
}

export interface ResourcePayload {
  name: string;
  basicInfo: BasicInfo;
  projectDetails: ProjectDetails;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ListResourcesResponse {
  items: Resource[];
  pagination: Pagination;
}

export interface ListResourcesQuery {
  page?: number;
  pageSize?: number;

  status?: ResourceStatus;
  name?: string;

  sortOrder?: 'asc' | 'desc';
}
