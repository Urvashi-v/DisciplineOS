/**
 * Transport envelope shared by the API and the web HTTP client. Every endpoint
 * returns a discriminated `ApiResponse` so clients can branch on `success`.
 */

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiErrorBody {
  /** Stable, machine-readable code, e.g. `MISSION_NOT_FOUND`. */
  code: string;
  /** Human-readable message safe to surface in the UI. */
  message: string;
  /** Optional field-level validation errors, keyed by field path. */
  fieldErrors?: Record<string, string[]>;
  /** Optional additional context for debugging (never rendered directly). */
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorBody;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorResponse;

/** ISO-8601 timestamp string (e.g. `2026-07-01T14:00:00.000Z`). */
export type IsoDateString = string;

/** Common fields present on every persisted entity. */
export interface Timestamps {
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}
