import type { IsoDateString } from '../common/api';

export interface FriendActivity {
  id: string;
  displayName: string;
  username: string;
  avatarUrl: string | null;
  status: string;
  streak: number;
  active: boolean;
}

export interface ActiveChallenge {
  id: string;
  title: string;
  participantCount: number;
  currentDay: number;
  totalDays: number;
  rank: number | null;
  endsAt: IsoDateString | null;
}
