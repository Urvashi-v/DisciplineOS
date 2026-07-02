/**
 * Commitment Vault enums — the stakes a user attaches to a mission and the
 * outcomes that trigger on failure.
 */

export const CommitmentType = {
  RefundableDeposit: 'REFUNDABLE_DEPOSIT',
  SocialAccountability: 'SOCIAL_ACCOUNTABILITY',
  TimeCommitment: 'TIME_COMMITMENT',
  PersonalPromise: 'PERSONAL_PROMISE',
  StreakRisk: 'STREAK_RISK',
  CharacterProgress: 'CHARACTER_PROGRESS',
  RewardLock: 'REWARD_LOCK',
} as const;
export type CommitmentType = (typeof CommitmentType)[keyof typeof CommitmentType];

export const CommitmentStatus = {
  Pending: 'PENDING',
  Active: 'ACTIVE',
  Fulfilled: 'FULFILLED',
  Forfeited: 'FORFEITED',
  Released: 'RELEASED',
} as const;
export type CommitmentStatus = (typeof CommitmentStatus)[keyof typeof CommitmentStatus];

/** Pre-selected consequence applied when a refundable-deposit mission fails. */
export const DepositFailureOutcome = {
  LockedForDays: 'LOCKED_FOR_DAYS',
  LockedUntilMissions: 'LOCKED_UNTIL_MISSIONS',
  ReleasedAfterStreak: 'RELEASED_AFTER_STREAK',
  DonatedToCharity: 'DONATED_TO_CHARITY',
  AddedToRewardFund: 'ADDED_TO_REWARD_FUND',
} as const;
export type DepositFailureOutcome =
  (typeof DepositFailureOutcome)[keyof typeof DepositFailureOutcome];

export const AccountabilityContact = {
  Friend: 'FRIEND',
  Mentor: 'MENTOR',
  Parent: 'PARENT',
  StudyPartner: 'STUDY_PARTNER',
  Team: 'TEAM',
} as const;
export type AccountabilityContact =
  (typeof AccountabilityContact)[keyof typeof AccountabilityContact];
