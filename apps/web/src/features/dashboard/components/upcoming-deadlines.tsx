'use client';

import { Skeleton } from '@disciplineos/ui';
import { Clock } from 'lucide-react';

import { useUpcomingMissions } from '@/features/missions';

function label(iso: string | null): string {
  return iso
    ? new Date(iso).toLocaleString(undefined, {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '';
}

export function UpcomingDeadlines() {
  const { data, isLoading } = useUpcomingMissions();

  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <p className="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-widest">
        Upcoming
      </p>
      {isLoading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-11 w-full rounded-xl" />
          ))}
        </div>
      ) : (data?.length ?? 0) === 0 ? (
        <p className="text-muted-foreground text-xs">No upcoming deadlines.</p>
      ) : (
        <div className="space-y-2">
          {data?.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="border-border bg-surface flex items-center gap-2.5 rounded-xl border p-2.5"
            >
              <Clock className="text-muted-foreground size-3.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-xs font-medium">{m.title}</p>
                <p className="text-muted-foreground text-[10px]">{label(m.deadline)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
