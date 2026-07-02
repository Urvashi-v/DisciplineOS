import { Global, Module } from '@nestjs/common';

import { DevUserGuard } from './dev-user.guard';

/**
 * Auth module. For now it provides the development user guard; in Phase 5 it
 * will own JWT strategy, login/refresh and the real guard.
 */
@Global()
@Module({
  providers: [DevUserGuard],
  exports: [DevUserGuard],
})
export class AuthModule {}
