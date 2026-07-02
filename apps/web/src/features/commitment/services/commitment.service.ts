import type { Commitment, CommitmentSummary } from '@disciplineos/types';

import { http } from '@/lib/http';

export const commitmentService = {
  list(): Promise<Commitment[]> {
    return http.get<Commitment[]>('commitments');
  },
  summary(): Promise<CommitmentSummary> {
    return http.get<CommitmentSummary>('commitments/summary');
  },
};
