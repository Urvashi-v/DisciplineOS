'use client';

import type { MissionFilter } from '@disciplineos/types';
import { Button, EmptyState, Skeleton } from '@disciplineos/ui';
import { Target } from 'lucide-react';

import { useDeleteMission, useMissionTransition } from '../hooks/use-mission-mutations';
import { useMissions } from '../hooks/use-missions';
import { MissionCard } from './mission-card';

interface MissionListProps {
  filter?: Partial<MissionFilter>;
}

export function MissionList({ filter }: MissionListProps) {
  const { data, isLoading, isError, refetch } = useMissions(filter);
  const transition = useMissionTransition();
  const remove = useDeleteMission();

  const busyId =
    transition.variables?.id ??
    (typeof remove.variables === 'string' ? remove.variables : undefined);
  const isMutating = transition.isPending || remove.isPending;

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon={Target}
        title="Couldn't load missions"
        description="Something went wrong reaching the server."
        action={
          <Button variant="outline" onClick={() => void refetch()}>
            Retry
          </Button>
        }
      />
    );
  }

  const missions = data?.items ?? [];

  if (missions.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="No missions yet"
        description="Create your first mission to turn a commitment into focused action."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          isBusy={isMutating && busyId === mission.id}
          onActivate={(id) => transition.mutate({ id, transition: 'activate' })}
          onComplete={(id) => transition.mutate({ id, transition: 'complete' })}
          onAbandon={(id) => transition.mutate({ id, transition: 'abandon' })}
          onDelete={(id) => remove.mutate(id)}
        />
      ))}
    </div>
  );
}
