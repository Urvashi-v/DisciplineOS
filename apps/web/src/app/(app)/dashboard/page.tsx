import type { Metadata } from 'next';

import { DashboardCenter, DashboardRightRail } from '@/features/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <main className="min-w-0 flex-1 space-y-6 px-6 py-6">
        <DashboardCenter />
      </main>
      <aside className="border-border sticky top-[56px] hidden h-[calc(100vh-56px)] w-[300px] shrink-0 overflow-y-auto border-l px-4 py-6 xl:block">
        <DashboardRightRail />
      </aside>
    </div>
  );
}
