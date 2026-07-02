/**
 * Social, gamification & progression enums — challenges, groups, friendships,
 * RPG skill trees and life domains.
 */

export const ChallengeVisibility = {
  Private: 'PRIVATE',
  Public: 'PUBLIC',
} as const;
export type ChallengeVisibility = (typeof ChallengeVisibility)[keyof typeof ChallengeVisibility];

export const ChallengeStatus = {
  Upcoming: 'UPCOMING',
  Active: 'ACTIVE',
  Completed: 'COMPLETED',
  Archived: 'ARCHIVED',
} as const;
export type ChallengeStatus = (typeof ChallengeStatus)[keyof typeof ChallengeStatus];

export const FriendshipStatus = {
  Pending: 'PENDING',
  Accepted: 'ACCEPTED',
  Declined: 'DECLINED',
  Blocked: 'BLOCKED',
} as const;
export type FriendshipStatus = (typeof FriendshipStatus)[keyof typeof FriendshipStatus];

export const GroupRole = {
  Owner: 'OWNER',
  Admin: 'ADMIN',
  Member: 'MEMBER',
} as const;
export type GroupRole = (typeof GroupRole)[keyof typeof GroupRole];

export const SkillTreeCategory = {
  DeepWork: 'DEEP_WORK',
  Consistency: 'CONSISTENCY',
  LearningSpeed: 'LEARNING_SPEED',
  MentalEndurance: 'MENTAL_ENDURANCE',
  TimeManagement: 'TIME_MANAGEMENT',
} as const;
export type SkillTreeCategory = (typeof SkillTreeCategory)[keyof typeof SkillTreeCategory];

export const LifeDomain = {
  Career: 'CAREER',
  Health: 'HEALTH',
  Learning: 'LEARNING',
  Finance: 'FINANCE',
  Relationships: 'RELATIONSHIPS',
  PersonalGrowth: 'PERSONAL_GROWTH',
} as const;
export type LifeDomain = (typeof LifeDomain)[keyof typeof LifeDomain];
