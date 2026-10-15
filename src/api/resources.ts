import { request } from "./client";

import type {
  ListResourcesQuery,
  ListResourcesResponse,
  Resource,
} from "./types";

export interface ProvisionResponse {
  completed: boolean;
  resource: Resource;
}

export const BASE_URL = "/api/items";

const getResourcePath = (id: any) => `${BASE_URL}/${id}`;

export function listResources(
  query: ListResourcesQuery = {},
  signal?: AbortSignal,
): Promise<ListResourcesResponse> {
  return request<ListResourcesResponse>(BASE_URL, {
    query: query as Record<string, string | number | undefined>,
    signal,
  });
}

export function getResource(id: any, signal?: AbortSignal): Promise<Resource> {
  return request<Resource>(getResourcePath(id), {
    signal,
  });
}

export function createResource(name: string): Promise<Resource> {
  return request<Resource>(BASE_URL, {
    method: "POST",
    body: {
      name,
    },
  });
}

export function updateResource(id: any, data: any): Promise<Resource> {
  console.log("data for put", data);
  return request<Resource>(getResourcePath(id), {
    method: "PUT",
    body: data,
  });
}

export function deleteResource(id: any): Promise<Resource> {
  return request<Resource>(getResourcePath(id), {
    method: "DELETE",
  });
}
