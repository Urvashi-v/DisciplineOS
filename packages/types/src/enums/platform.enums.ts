/**
 * Platform-wide enums — identity, billing and notifications.
 */

export const UserRole = {
  User: 'USER',
  Admin: 'ADMIN',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const AuthProvider = {
  Credentials: 'CREDENTIALS',
  Google: 'GOOGLE',
  GitHub: 'GITHUB',
} as const;
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];

export const PlanTier = {
  Free: 'FREE',
  Premium: 'PREMIUM',
} as const;
export type PlanTier = (typeof PlanTier)[keyof typeof PlanTier];

export const SubscriptionStatus = {
  Active: 'ACTIVE',
  Trialing: 'TRIALING',
  PastDue: 'PAST_DUE',
  Canceled: 'CANCELED',
  Expired: 'EXPIRED',
} as const;
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export const NotificationType = {
  MissionReminder: 'MISSION_REMINDER',
  CommitmentAtRisk: 'COMMITMENT_AT_RISK',
  StreakMilestone: 'STREAK_MILESTONE',
  CoachInsight: 'COACH_INSIGHT',
  ChallengeUpdate: 'CHALLENGE_UPDATE',
  FriendActivity: 'FRIEND_ACTIVITY',
  System: 'SYSTEM',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationChannel = {
  InApp: 'IN_APP',
  Push: 'PUSH',
  Email: 'EMAIL',
} as const;
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
