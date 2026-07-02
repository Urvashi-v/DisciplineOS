import type { NotificationList } from '@disciplineos/types';
import { Controller, Get, Injectable, Module, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { DevUserGuard } from '../auth/dev-user.guard';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string): Promise<NotificationList> {
    const [items, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      this.prisma.notification.count({ where: { userId, readAt: null } }),
    ]);

    return {
      unreadCount,
      items: items.map((n) => ({
        id: n.id,
        type: n.type,
        channel: n.channel,
        title: n.title,
        body: n.body,
        readAt: n.readAt?.toISOString() ?? null,
        createdAt: n.createdAt.toISOString(),
      })),
    };
  }
}

@UseGuards(DevUserGuard)
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Get()
  list(@CurrentUserId() userId: string) {
    return this.notifications.list(userId);
  }
}

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
