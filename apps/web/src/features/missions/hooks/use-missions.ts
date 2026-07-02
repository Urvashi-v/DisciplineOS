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

/** Missions due or scheduled today (or currently active). */
export function useTodaysMissions() {
  return useQuery({
    queryKey: missionKeys.today(),
    queryFn: () => missionService.today(),
  });
}

/** The next few upcoming missions by deadline. */
export function useUpcomingMissions() {
  return useQuery({
    queryKey: missionKeys.upcoming(),
    queryFn: () => missionService.upcoming(),
  });
}
