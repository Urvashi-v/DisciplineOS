import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

export type ServiceState = 'up' | 'down';

export interface HealthReport {
  status: 'ok' | 'degraded';
  uptime: number;
  timestamp: string;
  services: {
    database: ServiceState;
    redis: ServiceState;
  };
}

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<HealthReport> {
    const [database, redis] = await Promise.all([this.checkDatabase(), this.redis.ping()]);

    return {
      status: database && redis ? 'ok' : 'degraded',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      services: {
        database: database ? 'up' : 'down',
        redis: redis ? 'up' : 'down',
      },
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
