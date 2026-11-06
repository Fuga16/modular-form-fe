import type { TeamMember } from '@/constants/TeamOptions';

export const ResourceStatus = {
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
} as const;

export type ResourceStatus =
  (typeof ResourceStatus)[keyof typeof ResourceStatus];

export const RESOURCE_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export type ResourcePriority =
  (typeof RESOURCE_PRIORITY)[keyof typeof RESOURCE_PRIORITY];

export const RESOURCE_PRIORITY_VALUES = Object.values(RESOURCE_PRIORITY);

export const RESOURCE_PROJECT_CATEGORY = {
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL',
  VENDOR: 'VENDOR',
} as const;

export type ResourceProjectCategory =
  (typeof RESOURCE_PROJECT_CATEGORY)[keyof typeof RESOURCE_PROJECT_CATEGORY];

export const RESOURCE_PROJECT_CATEGORY_VALUES = Object.values(
  RESOURCE_PROJECT_CATEGORY,
);

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

export type UpdateResourcePayload = Partial<GeneralInfo> & {
  projectDetails?: Partial<ProjectDetails>;
};

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
