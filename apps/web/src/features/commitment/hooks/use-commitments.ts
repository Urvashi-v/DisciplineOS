import { useQuery } from '@tanstack/react-query';

import { commitmentService } from '../services/commitment.service';

export const commitmentKeys = {
  all: ['commitments'] as const,
  list: () => [...commitmentKeys.all, 'list'] as const,
  summary: () => [...commitmentKeys.all, 'summary'] as const,
};

export function useCommitments() {
  return useQuery({ queryKey: commitmentKeys.list(), queryFn: () => commitmentService.list() });
}

export function useCommitmentSummary() {
  return useQuery({
    queryKey: commitmentKeys.summary(),
    queryFn: () => commitmentService.summary(),
  });
}
