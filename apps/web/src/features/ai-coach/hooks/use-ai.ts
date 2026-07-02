import { useQuery } from '@tanstack/react-query';

import { aiService } from '../services/ai.service';

export const aiKeys = {
  all: ['ai'] as const,
  recommendation: () => [...aiKeys.all, 'recommendation'] as const,
  insights: () => [...aiKeys.all, 'insights'] as const,
};

export function useAiRecommendation() {
  return useQuery({
    queryKey: aiKeys.recommendation(),
    queryFn: () => aiService.recommendation(),
    staleTime: 5 * 60_000,
  });
}

export function useAiInsights() {
  return useQuery({
    queryKey: aiKeys.insights(),
    queryFn: () => aiService.insights(),
    staleTime: 5 * 60_000,
  });
}
