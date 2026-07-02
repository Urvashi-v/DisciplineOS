import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { PrismaService } from '../prisma/prisma.service';

const DEMO_EMAIL = 'demo@disciplineos.app';

/**
 * Temporary auth guard for development. It attaches a user id to the request so
 * feature code can be built against `@CurrentUserId()` before real auth exists.
 *
 * Resolution order:
 *   1. `x-user-id` request header (handy for testing multiple users),
 *   2. the seeded demo user.
 *
 * In Phase 5 this is replaced by a JWT guard that sets `request.userId` from a
 * verified token — no controller changes required.
 */
@Injectable()
export class DevUserGuard implements CanActivate {
  private cachedDemoUserId: string | null = null;

  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { userId?: string }>();
    const headerUserId = request.header('x-user-id');
    request.userId = headerUserId ?? (await this.resolveDemoUserId());
    return true;
  }

  private async resolveDemoUserId(): Promise<string> {
    if (this.cachedDemoUserId) {
      return this.cachedDemoUserId;
    }

    const user = await this.prisma.user.findUnique({
      where: { email: DEMO_EMAIL },
      select: { id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Demo user not found — run `pnpm db:seed`.');
    }

    this.cachedDemoUserId = user.id;
    return user.id;
  }
}
