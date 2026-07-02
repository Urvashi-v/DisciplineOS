import { PlanTier, PrismaClient, SubscriptionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedPlans() {
  const free = await prisma.plan.upsert({
    where: { tier: PlanTier.FREE },
    update: {},
    create: {
      tier: PlanTier.FREE,
      name: 'Free',
      description: 'Build discipline with the essentials.',
      priceCents: 0,
      features: [
        'Mission creation',
        'Focus mode',
        'Basic analytics',
        'Streak tracking',
        'Challenges',
        'Community features',
        'Limited AI coaching',
      ],
    },
  });

  const premium = await prisma.plan.upsert({
    where: { tier: PlanTier.PREMIUM },
    update: {},
    create: {
      tier: PlanTier.PREMIUM,
      name: 'Premium',
      description: 'Unlock the full AI Discipline Coach and advanced analytics.',
      priceCents: 1200,
      features: [
        'Unlimited AI coaching',
        'Advanced behavioral analytics',
        'AI weekly strategy session',
        'AI schedule optimizer',
        'Smart website blocking',
        'Cross-platform tracking',
        'Accountability groups',
      ],
    },
  });

  return { free, premium };
}

async function seedDemoUser(freePlanId: string) {
  const passwordHash = await bcrypt.hash('Password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@disciplineos.app' },
    update: {},
    create: {
      email: 'demo@disciplineos.app',
      passwordHash,
      emailVerified: true,
      planTier: PlanTier.FREE,
      profile: {
        create: {
          displayName: 'Demo Founder',
          username: 'demo',
          timezone: 'Asia/Kolkata',
          bio: 'Keeping promises to myself, one mission at a time.',
        },
      },
      subscription: {
        create: {
          planId: freePlanId,
          status: SubscriptionStatus.ACTIVE,
        },
      },
    },
  });

  return user;
}

async function main() {
  const { free } = await seedPlans();
  const user = await seedDemoUser(free.id);

  // eslint-disable-next-line no-console
  console.log(`Seeded plans and demo user: ${user.email} (password: Password123)`);
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
