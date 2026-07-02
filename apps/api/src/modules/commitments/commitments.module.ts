import { type Commitment, CommitmentStatus, type CommitmentSummary } from '@disciplineos/types';
import { Controller, Get, Injectable, Module, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { DevUserGuard } from '../auth/dev-user.guard';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommitmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string): Promise<Commitment[]> {
    const items = await this.prisma.commitment.findMany({
      where: { userId, status: { in: [CommitmentStatus.Active, CommitmentStatus.Pending] } },
      orderBy: { deadline: 'asc' },
    });
    return items.map((c) => ({
      id: c.id,
      title: c.title,
      type: c.type,
      status: c.status,
      stakeAmountCents: c.stakeAmountCents,
      reward: c.reward,
      completion: c.completion,
      deadline: c.deadline?.toISOString() ?? null,
    }));
  }

  async summary(userId: string): Promise<CommitmentSummary> {
    const active = await this.prisma.commitment.findMany({
      where: { userId, status: CommitmentStatus.Active },
      select: { stakeAmountCents: true },
    });
    return {
      totalLockedCents: active.reduce((total, c) => total + (c.stakeAmountCents ?? 0), 0),
      activeCount: active.length,
    };
  }
}

@UseGuards(DevUserGuard)
@Controller({ path: 'commitments', version: '1' })
export class CommitmentsController {
  constructor(private readonly commitments: CommitmentsService) {}

  @Get()
  list(@CurrentUserId() userId: string) {
    return this.commitments.list(userId);
  }

  @Get('summary')
  summary(@CurrentUserId() userId: string) {
    return this.commitments.summary(userId);
  }
}

@Module({
  controllers: [CommitmentsController],
  providers: [CommitmentsService],
})
export class CommitmentsModule {}
