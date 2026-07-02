import { useQuery } from '@tanstack/react-query';

import { analyticsService } from '../services/analytics.service';

export const analyticsKeys = {
  all: ['analytics'] as const,
  overview: () => [...analyticsKeys.all, 'overview'] as const,
  score: () => [...analyticsKeys.all, 'discipline-score'] as const,
  charts: () => [...analyticsKeys.all, 'charts'] as const,
};

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: analyticsKeys.overview(),
    queryFn: () => analyticsService.overview(),
  });
}

export function useDisciplineScore() {
  return useQuery({
    queryKey: analyticsKeys.score(),
    queryFn: () => analyticsService.disciplineScore(),
  });
}

export function useAnalyticsCharts() {
  return useQuery({
    queryKey: analyticsKeys.charts(),
    queryFn: () => analyticsService.charts(),
  });
}
