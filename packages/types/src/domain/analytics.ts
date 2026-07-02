import type { IsoDateString } from '../common/api';

export type TrendDirection = 'up' | 'down' | 'neutral';

/** A single tile in the "Today's Overview" grid. */
export interface AnalyticsStat {
  key: string;
  label: string;
  value: string;
  sub: string;
  trend: TrendDirection;
}

export interface AnalyticsOverview {
  stats: AnalyticsStat[];
}

export interface ScoreTrendPoint {
  week: string;
  score: number;
}

export interface DisciplineScore {
  score: number;
  deltaFromLastWeek: number;
  trend: ScoreTrendPoint[];
}

export interface FocusHoursPoint {
  day: string;
  hours: number;
}

export interface MissionCompletionPoint {
  day: string;
  completed: number;
  total: number;
}

export interface TimeDistributionSlice {
  name: string;
  value: number;
}

export interface HeatmapCell {
  date: IsoDateString;
  value: number;
  active: boolean;
}

/** All chart series for the analytics section, in one payload. */
export interface AnalyticsCharts {
  weeklyFocus: FocusHoursPoint[];
  missionCompletion: MissionCompletionPoint[];
  timeDistribution: TimeDistributionSlice[];
  heatmap: HeatmapCell[];
}
