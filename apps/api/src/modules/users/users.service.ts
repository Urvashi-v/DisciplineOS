import type { AuthenticatedUser } from '@disciplineos/types';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly users: UsersRepository) {}

  /** Returns the profile of the authenticated user for the app shell. */
  async getMe(userId: string): Promise<AuthenticatedUser> {
    const user = await this.users.findByIdWithProfile(userId);

    if (!user || !user.profile) {
      throw new NotFoundException({ code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      planTier: user.planTier,
      displayName: user.profile.displayName,
      username: user.profile.username,
      avatarUrl: user.profile.avatarUrl,
    };
  }
}
