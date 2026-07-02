import type { IsoDateString, Timestamps } from '../common/api';
import type { MissionStatus, Priority } from '../enums/mission.enums';

/**
 * A mission as returned by the API. Date fields are ISO strings (they cross the
 * wire as JSON); the client parses them where a `Date` is needed.
 */
export interface Mission extends Timestamps {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  priority: Priority;
  status: MissionStatus;
  durationMinutes: number;
  deadline: IsoDateString | null;
  scheduledFor: IsoDateString | null;
  startedAt: IsoDateString | null;
  completedAt: IsoDateString | null;
}

/** Lifecycle transitions a mission can be driven through. */
export type MissionTransition = 'activate' | 'complete' | 'abandon';
