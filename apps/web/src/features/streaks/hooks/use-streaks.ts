import { type StreakSummary, StreakType } from '@disciplineos/types';
import { useQuery } from '@tanstack/react-query';

import { streakService } from '../services/streak.service';

export const streakKeys = {
  all: ['streaks'] as const,
};

export function useStreaks() {
  return useQuery({ queryKey: streakKeys.all, queryFn: () => streakService.list() });
}

/** Convenience selector for the daily-focus streak shown in the hero. */
export function useDailyFocusStreak() {
  const query = useStreaks();
  const streak: StreakSummary | undefined = query.data?.find(
    (s) => s.type === StreakType.DailyFocus,
  );
  return { ...query, streak };
}
