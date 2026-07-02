import { z } from 'zod';

/**
 * Validated public environment. `NEXT_PUBLIC_*` vars are inlined by Next at
 * build time, so each must be referenced explicitly (not via a dynamic key).
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:4000'),
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsed.success) {
  throw new Error(`Invalid public environment variables: ${parsed.error.message}`);
}

export const env = parsed.data;

/** Base URL for versioned API endpoints. */
export const API_V1_URL = `${env.NEXT_PUBLIC_API_URL}/api/v1`;
