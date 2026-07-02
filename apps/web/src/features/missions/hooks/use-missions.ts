import type { MissionFilter } from '@disciplineos/types';
import { useQuery } from '@tanstack/react-query';

import { missionKeys } from '../constants/mission.constants';
import { missionService } from '../services/mission.service';

/** Fetches a paginated, optionally filtered list of the current user's missions. */
export function useMissions(filter?: Partial<MissionFilter>) {
  return useQuery({
    queryKey: missionKeys.list(filter),
    queryFn: () => missionService.list(filter),
  });
}
