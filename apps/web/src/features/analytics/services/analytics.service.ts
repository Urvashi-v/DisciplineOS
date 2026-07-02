import type { AnalyticsCharts, AnalyticsOverview, DisciplineScore } from '@disciplineos/types';

import { http } from '@/lib/http';

export const analyticsService = {
  overview(): Promise<AnalyticsOverview> {
    return http.get<AnalyticsOverview>('analytics/overview');
  },
  disciplineScore(): Promise<DisciplineScore> {
    return http.get<DisciplineScore>('analytics/discipline-score');
  },
  charts(): Promise<AnalyticsCharts> {
    return http.get<AnalyticsCharts>('analytics/charts');
  },
};
