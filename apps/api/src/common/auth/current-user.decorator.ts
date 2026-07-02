import { createParamDecorator, type ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

/**
 * Injects the authenticated user's id into a handler parameter. The id is placed
 * on the request by the active auth guard (today `DevUserGuard`, later a real
 * `JwtAuthGuard`) — controllers depend only on this decorator, never the guard.
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request & { userId?: string }>();
    if (!request.userId) {
      throw new UnauthorizedException('No authenticated user in request context');
    }
    return request.userId;
  },
);
