import type { StreakSummary } from '@disciplineos/types';

import { http } from '@/lib/http';

export const streakService = {
  list(): Promise<StreakSummary[]> {
    return http.get<StreakSummary[]>('streaks');
  },
};
