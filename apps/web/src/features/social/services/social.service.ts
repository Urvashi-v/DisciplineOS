import type { ActiveChallenge, FriendActivity } from '@disciplineos/types';

import { http } from '@/lib/http';

export const socialService = {
  friends(): Promise<FriendActivity[]> {
    return http.get<FriendActivity[]>('social/friends');
  },
  challenge(): Promise<ActiveChallenge | null> {
    return http.get<ActiveChallenge | null>('social/challenge');
  },
};
