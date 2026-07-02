import type { IsoDateString } from '../common/api';
import type { FocusSessionStatus } from '../enums/mission.enums';

/** A focus/deep-work session — the source of focus-hour analytics. */
export interface FocusSession {
  id: string;
  userId: string;
  missionId: string | null;
  status: FocusSessionStatus;
  plannedMinutes: number;
  actualSeconds: number;
  interruptions: number;
  startedAt: IsoDateString;
  endedAt: IsoDateString | null;
}
