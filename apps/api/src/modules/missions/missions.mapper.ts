import type { Mission as PrismaMission } from '@disciplineos/db';
import type { Mission } from '@disciplineos/types';

/** Maps a Prisma Mission row to the shared API contract (ISO date strings). */
export function toMissionDto(mission: PrismaMission): Mission {
  return {
    id: mission.id,
    userId: mission.userId,
    title: mission.title,
    description: mission.description,
    priority: mission.priority,
    status: mission.status,
    durationMinutes: mission.durationMinutes,
    deadline: mission.deadline?.toISOString() ?? null,
    scheduledFor: mission.scheduledFor?.toISOString() ?? null,
    startedAt: mission.startedAt?.toISOString() ?? null,
    completedAt: mission.completedAt?.toISOString() ?? null,
    createdAt: mission.createdAt.toISOString(),
    updatedAt: mission.updatedAt.toISOString(),
  };
}
