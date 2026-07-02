import type { StreakSummary } from '@disciplineos/types';
import { Controller, Get, Injectable, Module, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { DevUserGuard } from '../auth/dev-user.guard';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StreaksService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string): Promise<StreakSummary[]> {
    const streaks = await this.prisma.streak.findMany({ where: { userId } });
    return streaks.map((s) => ({
      type: s.type,
      current: s.current,
      longest: s.longest,
      lastActiveDate: s.lastActiveDate?.toISOString() ?? null,
    }));
  }
}

@UseGuards(DevUserGuard)
@Controller({ path: 'streaks', version: '1' })
export class StreaksController {
  constructor(private readonly streaks: StreaksService) {}

  @Get()
  list(@CurrentUserId() userId: string) {
    return this.streaks.list(userId);
  }
}

@Module({
  controllers: [StreaksController],
  providers: [StreaksService],
})
export class StreaksModule {}
