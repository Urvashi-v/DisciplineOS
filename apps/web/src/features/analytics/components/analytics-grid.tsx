'use client';

import { Skeleton } from '@disciplineos/ui';
import { CheckSquare, Clock, type LucideIcon, Timer, TrendingUp, Zap } from 'lucide-react';

import { useAnalyticsOverview } from '../hooks/use-analytics';

const ICONS: Record<string, LucideIcon> = {
  'focus-hours': Clock,
  'weekly-progress': TrendingUp,
  'mission-completion': CheckSquare,
  productivity: Zap,
  'time-saved': Timer,
};

export function AnalyticsGrid() {
  const { data, isLoading } = useAnalyticsOverview();

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {data.stats.map((stat) => {
        const Icon = ICONS[stat.key] ?? Clock;
        return (
          <div
            key={stat.key}
            className="border-border bg-card group flex flex-col gap-3 rounded-2xl border p-4 transition-transform hover:-translate-y-0.5"
          >
            <span className="bg-surface flex size-8 items-center justify-center rounded-xl">
              <Icon className="text-muted-foreground group-hover:text-foreground size-3.5 transition-colors" />
            </span>
            <div>
              <p className="text-muted-foreground mb-1 text-[10px] font-medium uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-foreground text-xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">{stat.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
