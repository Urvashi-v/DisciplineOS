import type { ApiResponse } from '@disciplineos/types';
import ky, { HTTPError, type Options } from 'ky';

import { ApiError } from './api-error';
import { API_V1_URL } from './env';

/**
 * Typed HTTP client. Components and services never call `fetch` directly — they
 * use this client, which:
 *   - targets the versioned API base URL,
 *   - unwraps the `{ success, data }` envelope,
 *   - converts every failure into an `ApiError`.
 */
const client = ky.create({
  prefixUrl: API_V1_URL,
  timeout: 15_000,
  retry: { limit: 2, methods: ['get'] },
});

async function unwrap<T>(request: Promise<Response>): Promise<T> {
  try {
    const response = await request;
    const payload = (await response.json()) as ApiResponse<T>;

    if (!payload.success) {
      throw new ApiError(payload.error, response.status);
    }

    return payload.data;
  } catch (error) {
    throw await toApiError(error);
  }
}

async function toApiError(error: unknown): Promise<ApiError> {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof HTTPError) {
    try {
      const payload = (await error.response.json()) as ApiResponse<never>;
      if (payload && payload.success === false) {
        return new ApiError(payload.error, error.response.status);
      }
    } catch {
      // Response body was not our envelope; fall through.
    }
    return new ApiError({ code: 'HTTP_ERROR', message: error.message }, error.response.status);
  }

  if (error instanceof TypeError) {
    return ApiError.network();
  }

  return ApiError.unknown();
}

/** Strip a leading slash — ky's `prefixUrl` requires relative paths. */
function normalize(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}

export const http = {
  get: <T>(path: string, options?: Options) => unwrap<T>(client.get(normalize(path), options)),
  post: <T>(path: string, json?: unknown, options?: Options) =>
    unwrap<T>(client.post(normalize(path), { json, ...options })),
  put: <T>(path: string, json?: unknown, options?: Options) =>
    unwrap<T>(client.put(normalize(path), { json, ...options })),
  patch: <T>(path: string, json?: unknown, options?: Options) =>
    unwrap<T>(client.patch(normalize(path), { json, ...options })),
  delete: <T>(path: string, options?: Options) =>
    unwrap<T>(client.delete(normalize(path), options)),
};

/** Perform a request against an absolute URL (e.g. the unversioned /health probe). */
export function httpAbsolute<T>(url: string, options?: Options): Promise<T> {
  return unwrap<T>(ky(url, options));
}
