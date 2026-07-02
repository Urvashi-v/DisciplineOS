import { useQuery } from '@tanstack/react-query';

import { systemService } from '../services/system.service';

export const systemKeys = {
  all: ['system'] as const,
  health: () => [...systemKeys.all, 'health'] as const,
};

/** Polls API/database/Redis health so the dashboard can surface connectivity. */
export function useSystemHealth() {
  return useQuery({
    queryKey: systemKeys.health(),
    queryFn: () => systemService.getHealth(),
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
}
