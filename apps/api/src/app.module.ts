import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnv } from './config/env.schema';
import { AiModule } from './modules/ai/ai.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommitmentsModule } from './modules/commitments/commitments.module';
import { FocusModule } from './modules/focus/focus.module';
import { HealthModule } from './modules/health/health.module';
import { MissionsModule } from './modules/missions/missions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { SocialModule } from './modules/social/social.module';
import { StreaksModule } from './modules/streaks/streaks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    HealthModule,
    UsersModule,
    MissionsModule,
    FocusModule,
    AnalyticsModule,
    StreaksModule,
    CommitmentsModule,
    NotificationsModule,
    AiModule,
    SocialModule,
  ],
})
export class AppModule {}
