import {
  ChallengeStatus,
  ChallengeVisibility,
  CommitmentStatus,
  CommitmentType,
  FocusSessionStatus,
  FriendshipStatus,
  MissionStatus,
  NotificationChannel,
  NotificationType,
  PlanTier,
  Priority,
  PrismaClient,
  StreakType,
  SubscriptionStatus,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_EMAIL = 'demo@disciplineos.app';

function atTime(base: Date, hour: number, minute = 0): Date {
  const d = new Date(base);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function seedPlans() {
  const free = await prisma.plan.upsert({
    where: { tier: PlanTier.FREE },
    update: {},
    create: {
      tier: PlanTier.FREE,
      name: 'Free',
      description: 'Build discipline with the essentials.',
      priceCents: 0,
      features: ['Mission creation', 'Focus mode', 'Basic analytics', 'Streak tracking'],
    },
  });
  await prisma.plan.upsert({
    where: { tier: PlanTier.PREMIUM },
    update: {},
    create: {
      tier: PlanTier.PREMIUM,
      name: 'Premium',
      description: 'Unlock the full AI Discipline Coach and advanced analytics.',
      priceCents: 1200,
      features: ['Unlimited AI coaching', 'Advanced analytics', 'Accountability groups'],
    },
  });
  return free;
}

async function seedDemoUser(freePlanId: string) {
  const passwordHash = await bcrypt.hash('Password123', 10);
  return prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: {
      email: DEMO_EMAIL,
      passwordHash,
      emailVerified: true,
      planTier: PlanTier.FREE,
      profile: {
        create: {
          displayName: 'Alex Rivera',
          username: 'alex',
          timezone: 'Asia/Kolkata',
          bio: 'Keeping promises to myself, one mission at a time.',
        },
      },
      subscription: { create: { planId: freePlanId, status: SubscriptionStatus.ACTIVE } },
    },
  });
}

async function clearUserData(userId: string) {
  await prisma.focusSession.deleteMany({ where: { userId } });
  await prisma.commitment.deleteMany({ where: { userId } });
  await prisma.notification.deleteMany({ where: { userId } });
  await prisma.mission.deleteMany({ where: { userId } });
  await prisma.streak.deleteMany({ where: { userId } });
}

async function seedTodaysMissions(userId: string) {
  const today = new Date();
  const missions = [
    {
      title: 'Research Paper — Section 3: Methodology',
      priority: Priority.CRITICAL,
      status: MissionStatus.ACTIVE,
      durationMinutes: 180,
      progress: 62,
      tags: ['Deep Work', 'Academic'],
      deadline: atTime(today, 23, 59),
      startedAt: atTime(today, 9, 0),
    },
    {
      title: 'Review Q3 product roadmap & add comments',
      priority: Priority.HIGH,
      status: MissionStatus.SCHEDULED,
      durationMinutes: 45,
      progress: 20,
      tags: ['Product', 'Review'],
      deadline: atTime(today, 17, 0),
    },
    {
      title: 'Morning workout: strength training session',
      priority: Priority.MEDIUM,
      status: MissionStatus.COMPLETED,
      durationMinutes: 60,
      progress: 100,
      tags: ['Health', 'Habit'],
      deadline: atTime(today, 8, 0),
      completedAt: atTime(today, 8, 5),
    },
    {
      title: 'Read 30 pages of Atomic Habits',
      priority: Priority.LOW,
      status: MissionStatus.SCHEDULED,
      durationMinutes: 40,
      progress: 0,
      tags: ['Reading', 'Growth'],
      deadline: atTime(today, 22, 0),
    },
    {
      title: 'Inbox zero & plan tomorrow',
      priority: Priority.MEDIUM,
      status: MissionStatus.SCHEDULED,
      durationMinutes: 30,
      progress: 0,
      tags: ['Admin'],
      deadline: atTime(today, 19, 30),
    },
  ];

  for (const m of missions) {
    await prisma.mission.create({ data: { userId, ...m } });
  }
}

async function seedHistoricalMissions(userId: string) {
  // Completed missions across the last two weeks feed the completion chart + score.
  const perDay = [5, 4, 3, 6, 5, 2, 1, 4, 5, 3, 6, 4, 5, 3];
  for (let i = 0; i < perDay.length; i += 1) {
    const day = daysAgo(i + 1);
    for (let j = 0; j < (perDay[i] ?? 0); j += 1) {
      await prisma.mission.create({
        data: {
          userId,
          title: `Completed task ${i}-${j}`,
          priority: Priority.MEDIUM,
          status: MissionStatus.COMPLETED,
          durationMinutes: 45,
          progress: 100,
          tags: ['Archive'],
          deadline: atTime(day, 12),
          completedAt: atTime(day, 10 + (j % 8)),
          createdAt: atTime(day, 8),
        },
      });
    }
    // A missed mission on most days so completion never looks perfect.
    if (i % 2 === 0) {
      await prisma.mission.create({
        data: {
          userId,
          title: `Missed task ${i}`,
          priority: Priority.LOW,
          status: MissionStatus.EXPIRED,
          durationMinutes: 30,
          progress: 0,
          tags: ['Archive'],
          deadline: atTime(day, 20),
          createdAt: atTime(day, 8),
        },
      });
    }
  }
}

async function seedFocusSessions(userId: string) {
  // ~35 days of focus sessions feed weekly hours, focus hours, and the heatmap.
  const data: {
    userId: string;
    status: FocusSessionStatus;
    plannedMinutes: number;
    actualSeconds: number;
    startedAt: Date;
    endedAt: Date;
    interruptions: number;
  }[] = [];

  for (let i = 0; i < 35; i += 1) {
    const day = daysAgo(i);
    const sessionsToday = i === 0 ? 3 : 1 + (i % 3);
    for (let s = 0; s < sessionsToday; s += 1) {
      const minutes = 25 + ((i * 7 + s * 13) % 90);
      const start = atTime(day, 9 + s * 2, (i * 5) % 60);
      data.push({
        userId,
        status: FocusSessionStatus.COMPLETED,
        plannedMinutes: minutes,
        actualSeconds: Math.round(minutes * 60 * 0.88),
        startedAt: start,
        endedAt: new Date(start.getTime() + minutes * 60_000),
        interruptions: (i + s) % 3,
      });
    }
  }

  await prisma.focusSession.createMany({ data });
}

async function seedCommitments(userId: string) {
  const missions = await prisma.mission.findMany({
    where: { userId, status: { in: [MissionStatus.ACTIVE, MissionStatus.SCHEDULED] } },
    take: 2,
  });

  await prisma.commitment.create({
    data: {
      userId,
      missionId: missions[0]?.id ?? null,
      title: 'Research Paper Submission',
      type: CommitmentType.REFUNDABLE_DEPOSIT,
      status: CommitmentStatus.ACTIVE,
      stakeAmountCents: 5000,
      reward: 'Dinner at your favorite restaurant',
      completion: 62,
      deadline: daysAgo(-3),
    },
  });
  await prisma.commitment.create({
    data: {
      userId,
      missionId: missions[1]?.id ?? null,
      title: '30-Day Workout Streak',
      type: CommitmentType.STREAK_RISK,
      status: CommitmentStatus.ACTIVE,
      stakeAmountCents: 10000,
      reward: 'New running shoes',
      completion: 80,
      deadline: daysAgo(-13),
    },
  });
}

async function seedStreaks(userId: string) {
  await prisma.streak.create({
    data: {
      userId,
      type: StreakType.DAILY_FOCUS,
      current: 24,
      longest: 24,
      lastActiveDate: new Date(),
    },
  });
  await prisma.streak.create({
    data: {
      userId,
      type: StreakType.MISSION_COMPLETION,
      current: 8,
      longest: 15,
      lastActiveDate: new Date(),
    },
  });
}

async function seedNotifications(userId: string) {
  await prisma.notification.createMany({
    data: [
      {
        userId,
        type: NotificationType.COMMITMENT_AT_RISK,
        channel: NotificationChannel.IN_APP,
        title: 'Commitment at risk',
        body: 'Research Paper is due today — $50 is on the line.',
      },
      {
        userId,
        type: NotificationType.STREAK_MILESTONE,
        channel: NotificationChannel.IN_APP,
        title: '24-day streak!',
        body: 'You just hit a personal best. Keep it going.',
      },
      {
        userId,
        type: NotificationType.COACH_INSIGHT,
        channel: NotificationChannel.IN_APP,
        title: 'New coaching insight',
        body: 'Your peak focus window is 9–11 AM.',
      },
    ],
  });
}

async function seedFriendsAndChallenge(userId: string) {
  const friendsData = [
    { email: 'sarah@disciplineos.app', name: 'Sarah Kim', username: 'sarahk', streak: 18 },
    { email: 'marcus@disciplineos.app', name: 'Marcus Reed', username: 'marcusr', streak: 31 },
    { email: 'yuna@disciplineos.app', name: 'Yuna Park', username: 'yunap', streak: 7 },
  ];

  const friendIds: string[] = [];
  for (const f of friendsData) {
    const friend = await prisma.user.upsert({
      where: { email: f.email },
      update: {},
      create: {
        email: f.email,
        emailVerified: true,
        profile: { create: { displayName: f.name, username: f.username } },
      },
    });
    friendIds.push(friend.id);

    await prisma.streak.deleteMany({ where: { userId: friend.id, type: StreakType.DAILY_FOCUS } });
    await prisma.streak.create({
      data: {
        userId: friend.id,
        type: StreakType.DAILY_FOCUS,
        current: f.streak,
        longest: f.streak,
        lastActiveDate: new Date(),
      },
    });

    await prisma.friendship.upsert({
      where: { userId_friendId: { userId, friendId: friend.id } },
      update: { status: FriendshipStatus.ACCEPTED },
      create: { userId, friendId: friend.id, status: FriendshipStatus.ACCEPTED },
    });
  }

  // One person is currently in a focus session (drives "active" presence).
  await prisma.focusSession.create({
    data: {
      userId: friendIds[0]!,
      status: FocusSessionStatus.ACTIVE,
      plannedMinutes: 50,
      startedAt: new Date(),
    },
  });

  await prisma.challenge.deleteMany({ where: { title: '7-Day Deep Work Sprint' } });
  const challenge = await prisma.challenge.create({
    data: {
      title: '7-Day Deep Work Sprint',
      description: 'Log at least 3 hours of deep work every day for a week.',
      visibility: ChallengeVisibility.PUBLIC,
      status: ChallengeStatus.ACTIVE,
      totalDays: 7,
      currentDay: 4,
      endsAt: daysAgo(-3),
    },
  });

  await prisma.challengeParticipant.create({
    data: { challengeId: challenge.id, userId, rank: 12, progress: 57 },
  });
  for (let i = 0; i < friendIds.length; i += 1) {
    await prisma.challengeParticipant.create({
      data: {
        challengeId: challenge.id,
        userId: friendIds[i]!,
        rank: i + 1,
        progress: 90 - i * 10,
      },
    });
  }
}

async function main() {
  const free = await seedPlans();
  const user = await seedDemoUser(free.id);

  await clearUserData(user.id);
  await seedTodaysMissions(user.id);
  await seedHistoricalMissions(user.id);
  await seedFocusSessions(user.id);
  await seedCommitments(user.id);
  await seedStreaks(user.id);
  await seedNotifications(user.id);
  await seedFriendsAndChallenge(user.id);

  console.log(`Seeded dashboard demo data for ${user.email} (password: Password123)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
