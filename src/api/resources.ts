import { request } from './client';
import type {
  BasicInfo,
  ListResourcesQuery,
  ListResourcesResponse,
  ProjectDetails,
  Resource,
  ResourcePayload,
} from './types';
import type { CreateResourceFormValues } from '@/components';

const BASE_PATH = '/api/resources';

type ResourceId = string | number;

type ResourceSection = 'basic-info' | 'project-details';

const RESOURCE_SECTIONS = {
  BASIC_INFO: 'basic-info',
  PROJECT_DETAILS: 'project-details',
} as const;

const getResourcePath = (id: ResourceId) => `${BASE_PATH}/${id}`;

export interface ProvisionResponse {
  completed: boolean;
  resource: Resource;
}

function patchResourceSection<T>(
  id: ResourceId,
  section: ResourceSection,
  data: T,
): Promise<Resource> {
  return request<Resource>(`${getResourcePath(id)}/${section}`, {
    method: 'PATCH',
    body: data,
  });
}

export function listResources(
  query: ListResourcesQuery = {},
  signal?: AbortSignal,
): Promise<ListResourcesResponse> {
  return request<ListResourcesResponse>(BASE_PATH, {
    query: query as Record<string, string | number | undefined>,
    signal,
  });
}

export function getResource(
  id: ResourceId,
  signal?: AbortSignal,
): Promise<Resource> {
  return request<Resource>(getResourcePath(id), {
    signal,
  });
}

export function createResource(
  body: CreateResourceFormValues,
): Promise<Resource> {
  return request<Resource>(BASE_PATH, {
    method: 'POST',
    body,
  });
}

export function patchBasicInfo(
  id: ResourceId,
  data: BasicInfo,
): Promise<Resource> {
  return patchResourceSection(id, RESOURCE_SECTIONS.BASIC_INFO, data);
}

export function patchProjectDetails(
  id: ResourceId,
  data: ProjectDetails,
): Promise<Resource> {
  return patchResourceSection(id, RESOURCE_SECTIONS.PROJECT_DETAILS, data);
}

export function provisionResource(id: ResourceId): Promise<ProvisionResponse> {
  return request<ProvisionResponse>(`${getResourcePath(id)}/provisioning`, {
    method: 'PATCH',
  });
}

export function updateResource(
  id: ResourceId,
  data: ResourcePayload,
): Promise<Resource> {
  return request<Resource>(getResourcePath(id), {
    method: 'PUT',
    body: data,
  });
}

export function deleteResource(id: ResourceId): Promise<Resource> {
  return request<Resource>(getResourcePath(id), {
    method: 'DELETE',
  });
}
