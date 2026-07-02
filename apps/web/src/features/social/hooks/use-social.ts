import { useQuery } from '@tanstack/react-query';

import { socialService } from '../services/social.service';

export const socialKeys = {
  all: ['social'] as const,
  friends: () => [...socialKeys.all, 'friends'] as const,
  challenge: () => [...socialKeys.all, 'challenge'] as const,
};

export function useFriendsActivity() {
  return useQuery({ queryKey: socialKeys.friends(), queryFn: () => socialService.friends() });
}

export function useActiveChallenge() {
  return useQuery({ queryKey: socialKeys.challenge(), queryFn: () => socialService.challenge() });
}
