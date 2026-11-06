import { request } from './client';
import type {
  GeneralInfo,
  ListResourcesQuery,
  ListResourcesResponse,
  ProjectDetails,
  Resource,
  UpdateResourcePayload,
} from './types';
import type { CreateResourceFormValues } from '@/components';

const BASE_PATH = '/api/resources';

type ResourceId = string | number;

type ResourceSection = 'general-info' | 'project-details';

const RESOURCE_SECTIONS = {
  GENERAL_INFO: 'general-info',
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

export interface AuthResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  role: UserRole;
}

export type UserRole = 'USER' | 'ADMIN';

export interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export function createUser(
  credentials: AuthCredentials,
): Promise<AuthResponse> {
  return request<AuthResponse, AuthCredentials>('/api/auth/register', {
    method: 'POST',
    body: credentials,
  });
}

export function loginUser(credentials: AuthCredentials): Promise<AuthResponse> {
  return request<AuthResponse, AuthCredentials>('/api/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export function logoutUser(): Promise<void> {
  return request<void>('/api/auth/logout', { method: 'POST' });
}

export function getCurrentUser(): Promise<CurrentUser> {
  return request<CurrentUser>('/api/auth/me');
}

export function patchGeneralInfo(
  id: ResourceId,
  data: GeneralInfo,
): Promise<Resource> {
  return patchResourceSection(id, RESOURCE_SECTIONS.GENERAL_INFO, data);
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
  data: UpdateResourcePayload,
): Promise<Resource> {
  return request<Resource>(getResourcePath(id), {
    method: 'PATCH',
    body: data,
  });
}

export function deleteResource(id: ResourceId): Promise<Resource> {
  return request<Resource>(getResourcePath(id), {
    method: 'DELETE',
  });
}
