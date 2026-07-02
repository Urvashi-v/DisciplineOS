import type { AiInsight, AiRecommendation } from '@disciplineos/types';

import { http } from '@/lib/http';

export const aiService = {
  recommendation(): Promise<AiRecommendation> {
    return http.get<AiRecommendation>('ai/recommendation');
  },
  insights(): Promise<AiInsight[]> {
    return http.get<AiInsight[]>('ai/insights');
  },
};
