/**
 * AI-layer enums — provider identifiers and report types. The provider enum is
 * the seam that keeps the app decoupled from any single vendor.
 */

export const AiProvider = {
  Anthropic: 'ANTHROPIC',
  OpenAI: 'OPENAI',
  Gemini: 'GEMINI',
} as const;
export type AiProvider = (typeof AiProvider)[keyof typeof AiProvider];

export const AiReportType = {
  DailyDebrief: 'DAILY_DEBRIEF',
  WeeklyReview: 'WEEKLY_REVIEW',
  GoalPlan: 'GOAL_PLAN',
  HabitPrediction: 'HABIT_PREDICTION',
  Coaching: 'COACHING',
} as const;
export type AiReportType = (typeof AiReportType)[keyof typeof AiReportType];

export const CoachTone = {
  Supportive: 'SUPPORTIVE',
  Direct: 'DIRECT',
  Tough: 'TOUGH',
} as const;
export type CoachTone = (typeof CoachTone)[keyof typeof CoachTone];
