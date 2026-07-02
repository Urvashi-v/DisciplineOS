import type { ActiveChallenge, FriendActivity } from '@disciplineos/types';
import { Controller, Get, Injectable, Module, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { DevUserGuard } from '../auth/dev-user.guard';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  async friendsActivity(userId: string): Promise<FriendActivity[]> {
    const friendships = await this.prisma.friendship.findMany({
      where: { userId, status: 'ACCEPTED' },
      include: {
        friend: {
          include: {
            profile: true,
            streaks: { where: { type: 'DAILY_FOCUS' }, take: 1 },
            focusSessions: { where: { status: 'ACTIVE' }, take: 1 },
          },
        },
      },
    });

    return friendships.map(({ friend }) => {
      const active = friend.focusSessions.length > 0;
      return {
        id: friend.id,
        displayName: friend.profile?.displayName ?? 'Member',
        username: friend.profile?.username ?? 'member',
        avatarUrl: friend.profile?.avatarUrl ?? null,
        status: active ? 'Focus Mode ON' : 'Idle',
        streak: friend.streaks[0]?.current ?? 0,
        active,
      };
    });
  }

  async activeChallenge(userId: string): Promise<ActiveChallenge | null> {
    const participation = await this.prisma.challengeParticipant.findFirst({
      where: { userId, challenge: { status: 'ACTIVE' } },
      include: { challenge: { include: { _count: { select: { participants: true } } } } },
    });

    if (!participation) return null;

    const { challenge } = participation;
    return {
      id: challenge.id,
      title: challenge.title,
      participantCount: challenge._count.participants,
      currentDay: challenge.currentDay,
      totalDays: challenge.totalDays,
      rank: participation.rank,
      endsAt: challenge.endsAt?.toISOString() ?? null,
    };
  }
}

@UseGuards(DevUserGuard)
@Controller({ path: 'social', version: '1' })
export class SocialController {
  constructor(private readonly social: SocialService) {}

  @Get('friends')
  friends(@CurrentUserId() userId: string) {
    return this.social.friendsActivity(userId);
  }

  @Get('challenge')
  challenge(@CurrentUserId() userId: string) {
    return this.social.activeChallenge(userId);
  }
}

@Module({
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
