'use client';

import { type Mission, MissionStatus, type Priority } from '@disciplineos/types';
import { cn, EmptyState, Progress, Skeleton } from '@disciplineos/ui';
import { CalendarClock, Check, Clock, Play, Target } from 'lucide-react';

import { formatDuration, useMissionTransition, useTodaysMissions } from '@/features/missions';

const STARTABLE: MissionStatus[] = [
  MissionStatus.Draft,
  MissionStatus.Scheduled,
  MissionStatus.Paused,
];

const PRIORITY_DOT: Record<Priority, string> = {
  LOW: 'bg-muted-foreground/50',
  MEDIUM: 'bg-muted-foreground',
  HIGH: 'bg-foreground/70',
  CRITICAL: 'bg-foreground',
};

const PRIORITY_LABEL: Record<Priority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

function timeLabel(iso: string | null): string | null {
  return iso
    ? new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    : null;
}

interface CardProps {
  mission: Mission;
  busy: boolean;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
}

function TodayMissionCard({ mission, busy, onStart, onComplete }: CardProps) {
  const isComplete = mission.status === MissionStatus.Completed || mission.progress === 100;
  const deadline = timeLabel(mission.deadline);

  return (
    <div className={cn('border-border bg-card rounded-2xl border p-4', isComplete && 'opacity-60')}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label={isComplete ? 'Completed' : 'Mark complete'}
          onClick={() => onComplete(mission.id)}
          disabled={busy || isComplete}
          className={cn(
            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
            isComplete
              ? 'border-foreground bg-foreground'
              : 'border-border hover:border-foreground/40',
          )}
        >
          {isComplete ? <Check className="text-background size-3" /> : null}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <span className="border-border bg-surface text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              <span className={cn('size-1.5 rounded-full', PRIORITY_DOT[mission.priority])} />
              {PRIORITY_LABEL[mission.priority]}
            </span>
            {mission.tags.map((tag) => (
              <span
                key={tag}
                className="border-border bg-surface text-muted-foreground rounded-md border px-1.5 py-0.5 text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className={cn(
              'text-foreground text-sm font-medium leading-snug',
              isComplete && 'text-muted-foreground line-through',
            )}
          >
            {mission.title}
          </p>

          <div className="text-muted-foreground mt-2 flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDuration(mission.durationMinutes)}
            </span>
            {deadline ? (
              <span className="flex items-center gap-1">
                <CalendarClock className="size-3" />
                {deadline}
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex items-center gap-2.5">
            <Progress value={mission.progress} className="flex-1" />
            <span className="text-muted-foreground w-8 text-right font-mono text-[11px]">
              {mission.progress}%
            </span>
          </div>
        </div>

        {!isComplete && STARTABLE.includes(mission.status) ? (
          <button
            type="button"
            onClick={() => onStart(mission.id)}
            disabled={busy}
            className="bg-foreground text-background flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Play className="fill-background size-3" />
            Start
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function TodaysMissions() {
  const { data, isLoading } = useTodaysMissions();
  const transition = useMissionTransition();
  const busyId = transition.variables?.id;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2.5">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  const missions = data ?? [];
  if (missions.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="Nothing due today"
        description="Create a mission with a deadline today to see it here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {missions.map((mission) => (
        <TodayMissionCard
          key={mission.id}
          mission={mission}
          busy={transition.isPending && busyId === mission.id}
          onStart={(id) => transition.mutate({ id, transition: 'activate' })}
          onComplete={(id) => transition.mutate({ id, transition: 'complete' })}
        />
      ))}
    </div>
  );
}
