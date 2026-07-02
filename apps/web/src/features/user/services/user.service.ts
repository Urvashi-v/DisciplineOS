import type { AuthenticatedUser } from '@disciplineos/types';

import { http } from '@/lib/http';

/** Talks to the users API. Components never call the HTTP client directly. */
export const userService = {
  getMe(): Promise<AuthenticatedUser> {
    return http.get<AuthenticatedUser>('users/me');
  },
};
