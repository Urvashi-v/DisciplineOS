import { PrismaClient } from '@disciplineos/db';
import { Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';

/**
 * Nest-managed Prisma client. Extends the generated client so repositories can
 * inject a single, connection-pooled instance and rely on Nest lifecycle hooks
 * for connect/disconnect.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Connected to database');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
