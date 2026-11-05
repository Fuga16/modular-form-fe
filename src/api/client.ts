import { getAccessToken, setAccessToken } from './authState';

const DEFAULT_API_URL = 'http://localhost:8080/';
const JSON_CONTENT_TYPE = 'application/json';

export const API_URL = (
  import.meta.env.VITE_API_URL ?? DEFAULT_API_URL
).replace(/\/$/, '');

export const API_UNAUTHORIZED_EVENT = 'api:unauthorized';

const AUTH_PATH_PREFIX = '/api/auth/';
let refreshInFlight: Promise<string | null> | null = null;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

export interface ApiErrorBody {
  message: string;
  details?: unknown;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  query?: QueryParams;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: QueryParams): string {
  const url = new URL(path, API_URL);

  if (!query) {
    return url.toString();
  }

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function parseResponse(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type');

  if (contentType?.includes(JSON_CONTENT_TYPE)) {
    return response.json();
  }

  return response.text();
}

function isApiErrorBody(payload: unknown): payload is ApiErrorBody {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'message' in payload &&
    typeof payload.message === 'string'
  );
}

function createApiError(status: number, payload: unknown): ApiError {
  if (isApiErrorBody(payload)) {
    return new ApiError(status, payload.message, payload.details);
  }

  return new ApiError(status, `Request failed with status ${status}`);
}

function isAuthEndpoint(path: string): boolean {
  const pathname = new URL(buildUrl(path)).pathname;
  return [
    `${AUTH_PATH_PREFIX}register`,
    `${AUTH_PATH_PREFIX}login`,
    `${AUTH_PATH_PREFIX}refresh`,
    `${AUTH_PATH_PREFIX}logout`,
  ].includes(pathname);
}

export function refreshAccessToken(): Promise<string | null> {
  if (!refreshInFlight) {
    const refresh = async () => {
      try {
        const response = await fetch(buildUrl('/api/auth/refresh'), {
          method: 'POST',
          credentials: 'include',
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });

        if (response.status === 401) {
          setAccessToken(null);
          return null;
        }

        const payload = await parseResponse(response);
        if (!response.ok) {
          throw createApiError(response.status, payload);
        }

        if (
          typeof payload !== 'object' ||
          payload === null ||
          !('accessToken' in payload) ||
          typeof payload.accessToken !== 'string'
        ) {
          throw new Error('Refresh response did not contain an access token');
        }

        setAccessToken(payload.accessToken);
        return payload.accessToken;
      } catch (error) {
        setAccessToken(null);
        throw error;
      }
    };

    const refreshOperation =
      typeof navigator !== 'undefined' && navigator.locks
        ? navigator.locks.request('auth-refresh-token', refresh)
        : refresh();

    refreshInFlight = refreshOperation.finally(() => {
      refreshInFlight = null;
    });
  }

  return refreshInFlight;
}

export async function request<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const { method = 'GET', body, query, signal } = options;
  const url = buildUrl(path, query);
  const authEndpoint = isAuthEndpoint(path);
  const bodyText = body !== undefined ? JSON.stringify(body) : undefined;

  const sendRequest = (token: string | null) => {
    const headers = new Headers();
    if (bodyText !== undefined) {
      headers.set('Content-Type', JSON_CONTENT_TYPE);
    }
    if (token && !authEndpoint) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(url, {
      method,
      signal,
      credentials: 'include',
      headers,
      body: bodyText,
    });
  };

  let response = await sendRequest(getAccessToken());

  if (response.status === 401 && !authEndpoint) {
    let refreshedToken: string | null;
    try {
      refreshedToken = await refreshAccessToken();
    } catch (error) {
      window.dispatchEvent(new Event(API_UNAUTHORIZED_EVENT));
      throw error;
    }

    if (refreshedToken) {
      response = await sendRequest(refreshedToken);
    }
  }

  if (response.status === 401 && !authEndpoint) {
    window.dispatchEvent(new Event(API_UNAUTHORIZED_EVENT));
  }

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw createApiError(response.status, payload);
  }

  return payload as TResponse;
}
