import { QueryClient } from '@tanstack/react-query';

import { ApiError } from './api-error';

/**
 * Factory for the app's TanStack Query client. Created per browser session (and
 * once per request on the server) to avoid sharing cache across users.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          // Don't retry client errors (4xx) — only transient failures.
          if (error instanceof ApiError && error.status && error.status < 500) {
            return false;
          }
          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
