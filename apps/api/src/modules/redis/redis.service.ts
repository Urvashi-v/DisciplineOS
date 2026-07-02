import { Injectable, Logger, type OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import type { Env } from '../../config/env.schema';

/**
 * Thin wrapper around a single ioredis connection. Redis backs session/refresh
 * token storage, rate limiting, AI-response caching and Focus Arena leaderboards
 * (sorted sets) as those features come online.
 */
@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  readonly client: Redis;

  constructor(config: ConfigService<Env, true>) {
    this.client = new Redis(config.get('REDIS_URL', { infer: true }), {
      maxRetriesPerRequest: 3,
      lazyConnect: false,
    });

    this.client.on('connect', () => this.logger.log('Connected to Redis'));
    this.client.on('error', (error) => this.logger.error(`Redis error: ${error.message}`));
  }

  async ping(): Promise<boolean> {
    try {
      return (await this.client.ping()) === 'PONG';
    } catch {
      return false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
