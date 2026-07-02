import type { IsoDateString } from '../common/api';
import type { NotificationChannel, NotificationType } from '../enums/platform.enums';
import type { StreakType } from '../enums/scoring.enums';

export interface StreakSummary {
  type: StreakType;
  current: number;
  longest: number;
  lastActiveDate: IsoDateString | null;
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  body: string;
  readAt: IsoDateString | null;
  createdAt: IsoDateString;
}

export interface NotificationList {
  items: AppNotification[];
  unreadCount: number;
}
