'use client';

import { FocusTimer } from '@/features/focus';
import { FriendsActivity, LiveChallenge } from '@/features/social';

import { MiniCalendar } from './mini-calendar';
import { QuickAddMission } from './quick-add-mission';
import { UpcomingDeadlines } from './upcoming-deadlines';

/** Right rail of the dashboard — every widget wired to real data. */
export function DashboardRightRail() {
  return (
    <div className="flex flex-col gap-3">
      <FocusTimer />
      <MiniCalendar />
      <UpcomingDeadlines />
      <QuickAddMission />
      <FriendsActivity />
      <LiveChallenge />
    </div>
  );
}
