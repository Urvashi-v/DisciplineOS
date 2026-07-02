import { type MissionFilter, MissionStatus, Priority } from '@disciplineos/types';
import type { BadgeProps } from '@disciplineos/ui';

type BadgeVariant = NonNullable<BadgeProps['variant']>;

/** Query key factory for all mission-related TanStack Query caches. */
export const missionKeys = {
  all: ['missions'] as const,
  lists: () => [...missionKeys.all, 'list'] as const,
  list: (filter?: Partial<MissionFilter>) => [...missionKeys.lists(), filter ?? {}] as const,
  details: () => [...missionKeys.all, 'detail'] as const,
  detail: (id: string) => [...missionKeys.details(), id] as const,
};

export const PRIORITY_META: Record<Priority, { label: string; badge: BadgeVariant }> = {
  [Priority.Low]: { label: 'Low', badge: 'secondary' },
  [Priority.Medium]: { label: 'Medium', badge: 'default' },
  [Priority.High]: { label: 'High', badge: 'warning' },
  [Priority.Critical]: { label: 'Critical', badge: 'destructive' },
};

export const PRIORITY_OPTIONS = [
  Priority.Low,
  Priority.Medium,
  Priority.High,
  Priority.Critical,
] as const;

export const STATUS_META: Record<MissionStatus, { label: string; badge: BadgeVariant }> = {
  [MissionStatus.Draft]: { label: 'Draft', badge: 'outline' },
  [MissionStatus.Scheduled]: { label: 'Scheduled', badge: 'secondary' },
  [MissionStatus.Active]: { label: 'Active', badge: 'default' },
  [MissionStatus.Paused]: { label: 'Paused', badge: 'warning' },
  [MissionStatus.Completed]: { label: 'Completed', badge: 'success' },
  [MissionStatus.Abandoned]: { label: 'Abandoned', badge: 'destructive' },
  [MissionStatus.Failed]: { label: 'Failed', badge: 'destructive' },
  [MissionStatus.Expired]: { label: 'Expired', badge: 'outline' },
};

export const DEFAULT_MISSION_DURATION = 60;
