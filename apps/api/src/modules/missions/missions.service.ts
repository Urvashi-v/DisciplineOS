import { type Prisma } from '@disciplineos/db';
import {
  type CreateMissionInput,
  type Mission,
  type MissionFilter,
  MissionStatus,
  type MissionTransition,
  type Paginated,
  type UpdateMissionInput,
} from '@disciplineos/types';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { toMissionDto } from './missions.mapper';

@Injectable()
export class MissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, input: CreateMissionInput): Promise<Mission> {
    const mission = await this.prisma.mission.create({
      data: {
        userId,
        title: input.title,
        description: input.description ?? null,
        priority: input.priority,
        durationMinutes: input.durationMinutes,
        deadline: input.deadline ? new Date(input.deadline) : null,
        scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : null,
      },
    });

    return toMissionDto(mission);
  }

  async findMany(userId: string, filter: MissionFilter): Promise<Paginated<Mission>> {
    const where: Prisma.MissionWhereInput = {
      userId,
      ...(filter.status ? { status: filter.status } : {}),
      ...(filter.priority ? { priority: filter.priority } : {}),
    };

    const { page, pageSize } = filter;
    const [total, missions] = await this.prisma.$transaction([
      this.prisma.mission.count({ where }),
      this.prisma.mission.findMany({
        where,
        orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      items: missions.map(toMissionDto),
      meta: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(userId: string, id: string): Promise<Mission> {
    const mission = await this.prisma.mission.findFirst({ where: { id, userId } });
    if (!mission) {
      throw new NotFoundException({ code: 'MISSION_NOT_FOUND', message: 'Mission not found' });
    }
    return toMissionDto(mission);
  }

  async update(userId: string, id: string, input: UpdateMissionInput): Promise<Mission> {
    await this.ensureExists(userId, id);

    const mission = await this.prisma.mission.update({
      where: { id },
      data: {
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.description !== undefined ? { description: input.description ?? null } : {}),
        ...(input.priority !== undefined ? { priority: input.priority } : {}),
        ...(input.status !== undefined ? { status: input.status } : {}),
        ...(input.durationMinutes !== undefined ? { durationMinutes: input.durationMinutes } : {}),
        ...(input.deadline !== undefined
          ? { deadline: input.deadline ? new Date(input.deadline) : null }
          : {}),
        ...(input.scheduledFor !== undefined
          ? { scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : null }
          : {}),
      },
    });

    return toMissionDto(mission);
  }

  async remove(userId: string, id: string): Promise<{ id: string }> {
    await this.ensureExists(userId, id);
    await this.prisma.mission.delete({ where: { id } });
    return { id };
  }

  async transition(userId: string, id: string, transition: MissionTransition): Promise<Mission> {
    await this.ensureExists(userId, id);

    const now = new Date();
    const data: Prisma.MissionUpdateInput = {
      activate: { status: MissionStatus.Active, startedAt: now },
      complete: { status: MissionStatus.Completed, completedAt: now },
      abandon: { status: MissionStatus.Abandoned },
    }[transition];

    const mission = await this.prisma.mission.update({ where: { id }, data });
    return toMissionDto(mission);
  }

  private async ensureExists(userId: string, id: string): Promise<void> {
    const count = await this.prisma.mission.count({ where: { id, userId } });
    if (count === 0) {
      throw new NotFoundException({ code: 'MISSION_NOT_FOUND', message: 'Mission not found' });
    }
  }
}
