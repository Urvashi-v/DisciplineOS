import { useQuery } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

/** The authenticated user for the app shell (greeting, avatar, plan). */
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userService.getMe(),
    staleTime: 5 * 60_000,
  });
}
