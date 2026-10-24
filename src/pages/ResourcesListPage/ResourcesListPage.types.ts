import type { Resource, ResourceStatus } from '@/api/types';
import type { ResourcePriority } from '@/constants/ResourcePriority';

export interface ResourceTable {
  resourceId: number;
  resourceName: string;
  description: string;
  email: string;
  owner: string;
  priority: ResourcePriority | '';
  status: ResourceStatus;
  createdAt?: string;
  updatedAt?: string;
}

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
