'use client';

import { Progress, Skeleton } from '@disciplineos/ui';
import { Trophy } from 'lucide-react';

import { useActiveChallenge } from '../hooks/use-social';

function endsLabel(iso: string | null): string {
  return iso
    ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '—';
}

export function LiveChallenge() {
  const { data, isLoading } = useActiveChallenge();

  if (isLoading) {
    return (
      <div className="border-border bg-card space-y-3 rounded-2xl border p-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-1 w-full" />
      </div>
    );
  }

  if (!data) return null;

  const progress = Math.round((data.currentDay / Math.max(1, data.totalDays)) * 100);

  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="text-foreground size-3.5" />
          <p className="text-foreground text-xs font-semibold">Live Challenge</p>
        </div>
        <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
          <span className="bg-foreground/60 size-1.5 animate-pulse rounded-full" />
          Active
        </span>
      </div>
      <p className="text-foreground mb-1 text-sm font-medium">{data.title}</p>
      <p className="text-muted-foreground mb-3 text-[11px]">
        {data.participantCount} participants · Ends {endsLabel(data.endsAt)}
      </p>
      <div className="mb-3 flex items-center gap-2.5">
        <Progress value={progress} className="flex-1" />
        <span className="text-muted-foreground font-mono text-[11px]">
          Day {data.currentDay}/{data.totalDays}
        </span>
      </div>
      {data.rank ? (
        <p className="text-muted-foreground text-[11px]">
          You&apos;re ranked <span className="text-foreground font-semibold">#{data.rank}</span> of{' '}
          {data.participantCount}
        </p>
      ) : null}
    </div>
  );
}
