import type { ApiErrorBody } from '@disciplineos/types';

/**
 * Normalised client-side error. Every failed request — validation, HTTP or
 * network — surfaces as an `ApiError`, so UI and hooks branch on one type.
 */
export class ApiError extends Error {
  readonly code: string;
  readonly fieldErrors?: Record<string, string[]>;
  readonly status?: number;

  constructor(body: ApiErrorBody, status?: number) {
    super(body.message);
    this.name = 'ApiError';
    this.code = body.code;
    this.fieldErrors = body.fieldErrors;
    this.status = status;
  }

  static network(): ApiError {
    return new ApiError({
      code: 'NETWORK_ERROR',
      message: 'Unable to reach the server. Check your connection and try again.',
    });
  }

  static unknown(): ApiError {
    return new ApiError({
      code: 'UNKNOWN_ERROR',
      message: 'Something went wrong. Please try again.',
    });
  }
}
