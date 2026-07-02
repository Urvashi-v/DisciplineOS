import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { DevUserGuard } from '../auth/dev-user.guard';
import { UsersService } from './users.service';

@UseGuards(DevUserGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  me(@CurrentUserId() userId: string) {
    return this.users.getMe(userId);
  }
}
