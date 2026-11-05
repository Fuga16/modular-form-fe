import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getAccessToken, setAccessToken } from '@/api/authState';
import { request } from '@/api/client';
import { loginUser, logoutUser } from '@/api/resources';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('API authentication client', () => {
  beforeEach(() => {
    vi.stubGlobal('window', new EventTarget());
    setAccessToken(null);
  });

  afterEach(() => {
    setAccessToken(null);
    vi.unstubAllGlobals();
  });

  it('sends email and password to the login endpoint without refreshing on failure', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        jsonResponse({ message: 'Invalid email or password' }, 401),
      );
    vi.stubGlobal('fetch', fetchMock);

    await expect(
      loginUser({ email: 'person@example.com', password: 'secret' }),
    ).rejects.toMatchObject({ status: 401 });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/login'),
      expect.objectContaining({
        body: JSON.stringify({
          email: 'person@example.com',
          password: 'secret',
        }),
      }),
    );
  });

  it('attaches the in-memory bearer token to protected requests', async () => {
    setAccessToken('access-token');
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ data: [] }));
    vi.stubGlobal('fetch', fetchMock);

    await request('/api/resources');

    const [, options] = fetchMock.mock.calls[0];
    expect(new Headers(options?.headers).get('Authorization')).toBe(
      'Bearer access-token',
    );
  });

  it('shares one refresh request and retries each protected request once', async () => {
    setAccessToken('expired-access-token');
    let refreshCalls = 0;
    const fetchMock = vi.fn<typeof fetch>(async (input, init) => {
      const path = new URL(String(input)).pathname;

      if (path === '/api/auth/refresh') {
        refreshCalls += 1;
        await new Promise((resolve) => setTimeout(resolve, 0));
        return jsonResponse({
          accessToken: 'rotated-access-token',
          tokenType: 'Bearer',
          expiresIn: 900,
        });
      }

      if (
        new Headers(init?.headers).get('Authorization') ===
        'Bearer expired-access-token'
      ) {
        return jsonResponse({ message: 'Unauthorized' }, 401);
      }

      return jsonResponse({ ok: true });
    });
    vi.stubGlobal('fetch', fetchMock);

    const results = await Promise.all([
      request<{ ok: boolean }>('/api/resources'),
      request<{ ok: boolean }>('/api/resources?page=2'),
    ]);

    expect(results).toEqual([{ ok: true }, { ok: true }]);
    expect(refreshCalls).toBe(1);
    expect(getAccessToken()).toBe('rotated-access-token');
    const protectedCalls = fetchMock.mock.calls.filter(
      ([input]) => new URL(String(input)).pathname === '/api/resources',
    );
    expect(protectedCalls).toHaveLength(4);
    expect(
      protectedCalls.every(
        ([, options]) =>
          new Headers(options?.headers).get('Authorization') ===
            'Bearer rotated-access-token' ||
          new Headers(options?.headers).get('Authorization') ===
            'Bearer expired-access-token',
      ),
    ).toBe(true);
  });

  it('does not refresh or retry when the refresh request is rejected', async () => {
    setAccessToken('expired-access-token');
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({ message: 'Unauthorized' }, 401))
      .mockResolvedValueOnce(
        jsonResponse({ message: 'Invalid refresh token' }, 401),
      );
    vi.stubGlobal('fetch', fetchMock);

    await expect(request('/api/resources')).rejects.toMatchObject({
      status: 401,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(getAccessToken()).toBeNull();
  });

  it('sends logout once without attempting token refresh', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);

    await logoutUser();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/logout'),
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    );
  });
});
