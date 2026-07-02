'use client';

import { PageHeader } from '@/components/page-header';

import { CreateMissionDialog } from './create-mission-dialog';
import { MissionList } from './mission-list';

export function MissionsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Missions"
        description="Every mission is an active commitment — not a passive task."
        action={<CreateMissionDialog />}
      />
      <MissionList />
    </div>
  );
}
