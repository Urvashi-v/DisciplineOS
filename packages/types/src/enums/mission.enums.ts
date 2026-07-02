/**
 * Mission & focus-session enums.
 * String values mirror the Prisma schema so DB and TS layers stay in sync.
 */

export const Priority = {
  Low: 'LOW',
  Medium: 'MEDIUM',
  High: 'HIGH',
  Critical: 'CRITICAL',
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];

export const MissionStatus = {
  Draft: 'DRAFT',
  Scheduled: 'SCHEDULED',
  Active: 'ACTIVE',
  Paused: 'PAUSED',
  Completed: 'COMPLETED',
  Abandoned: 'ABANDONED',
  Failed: 'FAILED',
  Expired: 'EXPIRED',
} as const;
export type MissionStatus = (typeof MissionStatus)[keyof typeof MissionStatus];

export const FocusSessionStatus = {
  Active: 'ACTIVE',
  Paused: 'PAUSED',
  Completed: 'COMPLETED',
  Abandoned: 'ABANDONED',
} as const;
export type FocusSessionStatus = (typeof FocusSessionStatus)[keyof typeof FocusSessionStatus];

export const EscapeTrigger = {
  Notification: 'NOTIFICATION',
  SocialMedia: 'SOCIAL_MEDIA',
  Boredom: 'BOREDOM',
  Fatigue: 'FATIGUE',
  ExternalInterruption: 'EXTERNAL_INTERRUPTION',
  Unknown: 'UNKNOWN',
} as const;
export type EscapeTrigger = (typeof EscapeTrigger)[keyof typeof EscapeTrigger];

export const EmotionalState = {
  Motivated: 'MOTIVATED',
  Neutral: 'NEUTRAL',
  Anxious: 'ANXIOUS',
  Overwhelmed: 'OVERWHELMED',
  Tired: 'TIRED',
} as const;
export type EmotionalState = (typeof EmotionalState)[keyof typeof EmotionalState];
