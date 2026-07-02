import { Flame, Gauge, Target, Timer } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { ROUTES } from '@/config/routes';
import { CreateMissionDialog, MissionList } from '@/features/missions';
import { SystemStatus } from '@/features/system';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Good to see you"
        description="What should you be doing right now — and how can we help you actually do it?"
        action={<CreateMissionDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Discipline Score"
          value="—"
          hint="Your promise-keeping metric"
          icon={Gauge}
        />
        <StatCard label="Active Missions" value="0" hint="Commitments in progress" icon={Target} />
        <StatCard label="Focus Today" value="0m" hint="Time in Mission Mode" icon={Timer} />
        <StatCard
          label="Current Streak"
          value="0 days"
          hint="Consistency over intensity"
          icon={Flame}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your missions</h2>
            <Link
              href={ROUTES.missions}
              className="text-primary text-sm font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          <MissionList filter={{ pageSize: 6 }} />
        </section>
        <SystemStatus />
      </div>
    </div>
  );
}
