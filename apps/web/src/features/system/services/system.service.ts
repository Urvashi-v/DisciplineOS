import { env } from '@/lib/env';
import { httpAbsolute } from '@/lib/http';

import type { SystemHealth } from '../types/system.types';

/**
 * System service — talks to the API's infrastructure endpoints. Establishes the
 * service-layer convention: components never call the HTTP client directly.
 */
export const systemService = {
  getHealth(): Promise<SystemHealth> {
    return httpAbsolute<SystemHealth>(`${env.NEXT_PUBLIC_API_URL}/health`);
  },
};
