import type { AiInsight, AiRecommendation } from '@disciplineos/types';
import { Controller, Get, Injectable, Module, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { addDays, endOfToday, startOfDay, startOfToday } from '../../common/utils/date.util';
import { DevUserGuard } from '../auth/dev-user.guard';
import { PrismaService } from '../prisma/prisma.service';

interface CoachContext {
  peakHourLabel: string;
  streakCurrent: number;
  topMissionTitle: string | null;
  missionsDueToday: number;
  commitmentAtRisk: string | null;
}

/** The seam a future LLM provider (Anthropic/OpenAI/Gemini) implements. */
interface CoachProvider {
  recommendation(ctx: CoachContext): AiRecommendation;
  insights(ctx: CoachContext): AiInsight[];
}

/** Rule-based coach derived from the user's real behaviour data. */
class RuleBasedCoachProvider implements CoachProvider {
  recommendation(ctx: CoachContext): AiRecommendation {
    const parts: string[] = [];
    if (ctx.topMissionTitle) parts.push(`Start with "${ctx.topMissionTitle}" now.`);
    parts.push(
      `Your peak focus window is around ${ctx.peakHourLabel} based on your recent history.`,
    );
    if (ctx.streakCurrent > 0) {
      parts.push(
        `You're on a ${ctx.streakCurrent}-day streak — protect it by blocking distractions.`,
      );
    }
    return { text: parts.join(' ') };
  }

  insights(ctx: CoachContext): AiInsight[] {
    return [
      {
        kind: 'ADVICE',
        title: 'Advice',
        body: ctx.topMissionTitle
          ? `Tackle "${ctx.topMissionTitle}" first — your cognitive load is lowest around ${ctx.peakHourLabel}.`
          : `Plan your day and start with your hardest task around ${ctx.peakHourLabel}.`,
      },
      {
        kind: 'FOCUS_PREDICTION',
        title: 'Focus Prediction',
        body: `Based on your last 30 days, your best deep-work window centres on ${ctx.peakHourLabel}.`,
      },
      {
        kind: 'RISK_ALERT',
        title: 'Risk Alert',
        body: ctx.commitmentAtRisk
          ? `"${ctx.commitmentAtRisk}" has a stake on the line and is due soon — protect your flow state.`
          : `You have ${ctx.missionsDueToday} mission${ctx.missionsDueToday === 1 ? '' : 's'} due today. Block distractions to stay on track.`,
      },
    ];
  }
}

function formatHour(hour: number): string {
  const period = hour < 12 ? 'AM' : 'PM';
  const hour12 = ((hour + 11) % 12) + 1;
  return `${hour12} ${period}`;
}

@Injectable()
export class AiService {
  private readonly provider: CoachProvider = new RuleBasedCoachProvider();

  constructor(private readonly prisma: PrismaService) {}

  async getRecommendation(userId: string): Promise<AiRecommendation> {
    return this.provider.recommendation(await this.buildContext(userId));
  }

  async getInsights(userId: string): Promise<AiInsight[]> {
    return this.provider.insights(await this.buildContext(userId));
  }

  private async buildContext(userId: string): Promise<CoachContext> {
    const now = new Date();
    const [sessions, streak, topMission, dueToday, commitment] = await Promise.all([
      this.prisma.focusSession.findMany({
        where: { userId, startedAt: { gte: startOfDay(addDays(now, -29)) } },
        select: { startedAt: true, actualSeconds: true },
      }),
      this.prisma.streak.findFirst({ where: { userId, type: 'DAILY_FOCUS' } }),
      this.prisma.mission.findFirst({
        where: { userId, status: { in: ['ACTIVE', 'SCHEDULED'] } },
        orderBy: [{ priority: 'desc' }, { deadline: 'asc' }],
      }),
      this.prisma.mission.count({
        where: { userId, deadline: { gte: startOfToday(), lt: endOfToday() } },
      }),
      this.prisma.commitment.findFirst({
        where: { userId, status: 'ACTIVE' },
        orderBy: { deadline: 'asc' },
      }),
    ]);

    const secondsByHour = new Map<number, number>();
    for (const s of sessions) {
      const hour = s.startedAt.getHours();
      secondsByHour.set(hour, (secondsByHour.get(hour) ?? 0) + s.actualSeconds);
    }
    let peakHour = 9;
    let best = -1;
    for (const [hour, secs] of secondsByHour) {
      if (secs > best) {
        best = secs;
        peakHour = hour;
      }
    }

    return {
      peakHourLabel: formatHour(peakHour),
      streakCurrent: streak?.current ?? 0,
      topMissionTitle: topMission?.title ?? null,
      missionsDueToday: dueToday,
      commitmentAtRisk: commitment?.title ?? null,
    };
  }
}

@UseGuards(DevUserGuard)
@Controller({ path: 'ai', version: '1' })
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Get('recommendation')
  recommendation(@CurrentUserId() userId: string) {
    return this.ai.getRecommendation(userId);
  }

  @Get('insights')
  insights(@CurrentUserId() userId: string) {
    return this.ai.getInsights(userId);
  }
}

@Module({
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
