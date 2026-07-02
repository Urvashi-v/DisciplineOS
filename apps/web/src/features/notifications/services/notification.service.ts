import type { NotificationList } from '@disciplineos/types';

import { http } from '@/lib/http';

export const notificationService = {
  list(): Promise<NotificationList> {
    return http.get<NotificationList>('notifications');
  },
};
