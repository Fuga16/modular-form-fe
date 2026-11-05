export const AUTH_TOKEN_CHANGED_EVENT = 'auth:token-changed';

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
  window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED_EVENT));
}
