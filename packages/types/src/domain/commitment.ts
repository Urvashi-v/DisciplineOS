import type { IsoDateString } from '../common/api';
import type { CommitmentStatus, CommitmentType } from '../enums/commitment.enums';

export interface Commitment {
  id: string;
  title: string;
  type: CommitmentType;
  status: CommitmentStatus;
  stakeAmountCents: number | null;
  reward: string | null;
  completion: number;
  deadline: IsoDateString | null;
}

export interface CommitmentSummary {
  totalLockedCents: number;
  activeCount: number;
}
