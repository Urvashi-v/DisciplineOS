'use client';

import { MissionStatus } from '@disciplineos/types';
import { Progress, Skeleton } from '@disciplineos/ui';
import { ArrowRight, TrendingUp } from 'lucide-react';

import { PRIORITY_META, useTodaysMissions } from '@/features/missions';

export function HeroMission() {
  const { data, isLoading } = useTodaysMissions();
  const mission =
    data?.find((m) => m.status === MissionStatus.Active) ??
    data?.find((m) => m.status !== MissionStatus.Completed) ??
    data?.[0];

  return (
    <div className="border-border bg-surface flex items-start gap-4 rounded-xl border p-4">
      <span className="bg-foreground/10 flex size-9 shrink-0 items-center justify-center rounded-xl">
        <TrendingUp className="text-foreground size-4" />
      </span>

      {isLoading ? (
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-full max-w-xs" />
          <Skeleton className="h-1 w-full" />
        </div>
      ) : mission ? (
        <>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-2">
              <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-widest">
                Today&apos;s Mission
              </span>
              <span className="bg-foreground/10 text-foreground rounded-md px-1.5 py-0.5 text-[10px] font-medium">
                {PRIORITY_META[mission.priority].label}
              </span>
            </div>
            <p className="text-foreground text-sm font-medium">{mission.title}</p>
            <div className="mt-2.5 flex items-center gap-3">
              <Progress value={mission.progress} className="flex-1" />
              <span className="text-muted-foreground font-mono text-xs">{mission.progress}%</span>
            </div>
          </div>
          <button
            type="button"
            className="border-border text-foreground hover:bg-accent flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
          >
            Continue
            <ArrowRight className="size-3" />
          </button>
        </>
      ) : (
        <p className="text-muted-foreground flex-1 text-sm">No mission scheduled for today yet.</p>
      )}
    </div>
  );
}
