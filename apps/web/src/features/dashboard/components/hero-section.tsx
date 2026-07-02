'use client';

import { MissionStatus } from '@disciplineos/types';
import { Skeleton } from '@disciplineos/ui';
import { useEffect, useState } from 'react';

import { DisciplineScorePanel } from '@/features/analytics';
import { useTodaysMissions } from '@/features/missions';
import { StreakPanel } from '@/features/streaks';
import { getFirstName, useCurrentUser } from '@/features/user';

import { formatLongDate, getTimeGreeting } from '../utils/greeting';
import { HeroMission } from './hero-mission';
import { HeroRecommendation } from './hero-recommendation';

/** Dashboard hero: live greeting, today's top mission, AI recommendation,
 * discipline score and streak. */
export function HeroSection() {
  const { data: user } = useCurrentUser();
  const { data: today } = useTodaysMissions();

  // Computed on the client to avoid a timezone-driven hydration mismatch.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const openCount = today?.filter((m) => m.status !== MissionStatus.Completed).length ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="border-border bg-card flex flex-col gap-5 rounded-2xl border p-6 lg:col-span-2">
        <div>
          {now && user ? (
            <>
              <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-widest">
                {formatLongDate(now)}
              </p>
              <h1 className="text-foreground text-balance text-2xl font-semibold tracking-tight">
                {getTimeGreeting(now)}, {getFirstName(user.displayName)}.
              </h1>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                You have{' '}
                <span className="text-foreground font-medium">
                  {openCount} {openCount === 1 ? 'mission' : 'missions'}
                </span>{' '}
                on today&apos;s plan.
              </p>
            </>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-56" />
            </div>
          )}
        </div>

        <HeroMission />
        <HeroRecommendation />
      </div>

      <div className="flex flex-col gap-4">
        <DisciplineScorePanel />
        <StreakPanel />
      </div>
    </div>
  );
}
