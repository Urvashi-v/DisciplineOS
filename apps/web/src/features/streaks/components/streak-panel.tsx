'use client';

import { Skeleton } from '@disciplineos/ui';
import { Flame } from 'lucide-react';

import { useDailyFocusStreak } from '../hooks/use-streaks';

export function StreakPanel() {
  const { streak, isLoading } = useDailyFocusStreak();

  if (isLoading) {
    return (
      <div className="border-border bg-card flex items-center gap-4 rounded-2xl border p-5">
        <Skeleton className="size-11 rounded-2xl" />
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  const current = streak?.current ?? 0;
  const isBest = streak ? current > 0 && current >= streak.longest : false;

  return (
    <div className="border-border bg-card flex items-center gap-4 rounded-2xl border p-5">
      <span className="bg-foreground/10 flex size-11 items-center justify-center rounded-2xl">
        <Flame className="text-foreground size-5" />
      </span>
      <div>
        <p className="text-foreground text-2xl font-bold tracking-tight">{current} days</p>
        <p className="text-muted-foreground text-xs">
          Current streak{isBest ? ' — personal best' : ''}
        </p>
      </div>
    </div>
  );
}
