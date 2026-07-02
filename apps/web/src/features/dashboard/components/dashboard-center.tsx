'use client';

import { Skeleton } from '@disciplineos/ui';
import dynamic from 'next/dynamic';

import { AiCoachWidget } from '@/features/ai-coach';
import { AnalyticsGrid } from '@/features/analytics';
import { CommitmentVault } from '@/features/commitment';

import { HeroSection } from './hero-section';
import { SectionHeading } from './panel';
import { TodaysMissions } from './todays-missions';

// Recharts is loaded client-only (it doesn't SSR/hydrate cleanly under React 19),
// isolating it from the rest of the page's hydration.
const ChartsSection = dynamic(
  () => import('@/features/analytics/components/charts-section').then((m) => m.ChartsSection),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-52 rounded-2xl" />
        ))}
      </div>
    ),
  },
);

/** Center column of the dashboard — every section wired to real data. */
export function DashboardCenter() {
  return (
    <>
      <HeroSection />

      <section>
        <SectionHeading>Today&apos;s Overview</SectionHeading>
        <AnalyticsGrid />
      </section>

      <section>
        <SectionHeading>Today&apos;s Missions</SectionHeading>
        <TodaysMissions />
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AiCoachWidget />
        <CommitmentVault />
      </div>

      <section>
        <SectionHeading>Analytics</SectionHeading>
        <ChartsSection />
      </section>
    </>
  );
}
