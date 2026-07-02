import { useQuery } from '@tanstack/react-query';

import { notificationService } from '../services/notification.service';

export const notificationKeys = {
  all: ['notifications'] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: () => notificationService.list(),
    refetchInterval: 60_000,
  });
}
