import type { FocusSession as PrismaFocusSession } from '@disciplineos/db';
import {
  type CompleteFocusSessionInput,
  type FocusSession,
  FocusSessionStatus,
  type StartFocusSessionInput,
} from '@disciplineos/types';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

function toDto(session: PrismaFocusSession): FocusSession {
  return {
    id: session.id,
    userId: session.userId,
    missionId: session.missionId,
    status: session.status,
    plannedMinutes: session.plannedMinutes,
    actualSeconds: session.actualSeconds,
    interruptions: session.interruptions,
    startedAt: session.startedAt.toISOString(),
    endedAt: session.endedAt?.toISOString() ?? null,
  };
}

@Injectable()
export class FocusService {
  constructor(private readonly prisma: PrismaService) {}

  async start(userId: string, input: StartFocusSessionInput): Promise<FocusSession> {
    const session = await this.prisma.focusSession.create({
      data: {
        userId,
        missionId: input.missionId ?? null,
        plannedMinutes: input.plannedMinutes,
        status: FocusSessionStatus.Active,
      },
    });
    return toDto(session);
  }

  async complete(
    userId: string,
    id: string,
    input: CompleteFocusSessionInput,
  ): Promise<FocusSession> {
    await this.ensureExists(userId, id);
    const session = await this.prisma.focusSession.update({
      where: { id },
      data: {
        status: FocusSessionStatus.Completed,
        actualSeconds: input.actualSeconds,
        interruptions: input.interruptions,
        endedAt: new Date(),
      },
    });
    return toDto(session);
  }

  async findActive(userId: string): Promise<FocusSession | null> {
    const session = await this.prisma.focusSession.findFirst({
      where: { userId, status: FocusSessionStatus.Active },
      orderBy: { startedAt: 'desc' },
    });
    return session ? toDto(session) : null;
  }

  private async ensureExists(userId: string, id: string): Promise<void> {
    const count = await this.prisma.focusSession.count({ where: { id, userId } });
    if (count === 0) {
      throw new NotFoundException({
        code: 'FOCUS_SESSION_NOT_FOUND',
        message: 'Session not found',
      });
    }
  }
}
