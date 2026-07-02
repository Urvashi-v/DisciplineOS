import { type Prisma } from '@disciplineos/db';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

export type UserWithProfile = Prisma.UserGetPayload<{ include: { profile: true } }>;

/** Data-access for users. Keeps Prisma queries out of the service layer. */
@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Explicit return type keeps the emitted types portable (avoids TS2742 from
  // pnpm's nested Prisma runtime path).
  async findByIdWithProfile(id: string): Promise<UserWithProfile | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }
}
