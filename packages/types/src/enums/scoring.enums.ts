/**
 * Scoring & behavioural-profile enums — the Discipline Score ledger and the
 * seven Focus DNA dimensions.
 */

/** Kinds of events that adjust a user's Discipline Score (append-only ledger). */
export const ScoreEventType = {
  CommitmentMade: 'COMMITMENT_MADE',
  CommitmentFulfilled: 'COMMITMENT_FULFILLED',
  CommitmentForfeited: 'COMMITMENT_FORFEITED',
  MissionCompleted: 'MISSION_COMPLETED',
  MissionAbandoned: 'MISSION_ABANDONED',
  Delay: 'DELAY',
  RecoveryAfterFailure: 'RECOVERY_AFTER_FAILURE',
  StreakMilestone: 'STREAK_MILESTONE',
} as const;
export type ScoreEventType = (typeof ScoreEventType)[keyof typeof ScoreEventType];

/** The seven behavioural dimensions that make up a user's Focus DNA. */
export const FocusDnaDimension = {
  Consistency: 'CONSISTENCY',
  DeepWork: 'DEEP_WORK',
  Planning: 'PLANNING',
  Execution: 'EXECUTION',
  RecoverySpeed: 'RECOVERY_SPEED',
  ImpulseControl: 'IMPULSE_CONTROL',
  DistractionResistance: 'DISTRACTION_RESISTANCE',
} as const;
export type FocusDnaDimension = (typeof FocusDnaDimension)[keyof typeof FocusDnaDimension];

export const StreakType = {
  DailyFocus: 'DAILY_FOCUS',
  MissionCompletion: 'MISSION_COMPLETION',
  Challenge: 'CHALLENGE',
} as const;
export type StreakType = (typeof StreakType)[keyof typeof StreakType];
