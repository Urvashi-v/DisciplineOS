'use client';

import { Bell } from 'lucide-react';

import { useNotifications } from '../hooks/use-notifications';

/** Top-nav notifications bell — shows an indicator when there are unread items. */
export function NotificationBell() {
  const { data } = useNotifications();
  const hasUnread = (data?.unreadCount ?? 0) > 0;

  return (
    <button
      type="button"
      aria-label={`Notifications${hasUnread ? ` (${data?.unreadCount} unread)` : ''}`}
      className="text-muted-foreground hover:bg-accent hover:text-foreground relative flex size-8 items-center justify-center rounded-lg transition-colors"
    >
      <Bell className="size-4" />
      {hasUnread ? (
        <span className="bg-foreground absolute right-1 top-1 size-1.5 rounded-full" />
      ) : null}
    </button>
  );
}
