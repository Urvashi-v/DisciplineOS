import {
  type AnalyticsCharts,
  type AnalyticsOverview,
  type AnalyticsStat,
  type DisciplineScore,
  type FocusHoursPoint,
  type HeatmapCell,
  type MissionCompletionPoint,
  MissionStatus,
  type ScoreTrendPoint,
  type TimeDistributionSlice,
} from '@disciplineos/types';
import { Injectable } from '@nestjs/common';

import { addDays, diffInDays, startOfDay, WEEKDAY_LABELS } from '../../common/utils/date.util';
import { PrismaService } from '../prisma/prisma.service';

const SECONDS_PER_HOUR = 3600;
const FULL_WEEK_FOCUS_HOURS = 20;

function dayKey(date: Date): string {
  return startOfDay(date).toISOString().slice(0, 10);
}
function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
function weekday(date: Date): string {
  return WEEKDAY_LABELS[date.getDay()] ?? '';
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCharts(userId: string): Promise<AnalyticsCharts> {
    const now = new Date();
    const sessions = await this.prisma.focusSession.findMany({
      where: { userId, startedAt: { gte: startOfDay(addDays(now, -34)) } },
      select: { actualSeconds: true, startedAt: true, mission: { select: { tags: true } } },
    });

    const secondsByDay = new Map<string, number>();
    const secondsByTag = new Map<string, number>();
    for (const s of sessions) {
      const key = dayKey(s.startedAt);
      secondsByDay.set(key, (secondsByDay.get(key) ?? 0) + s.actualSeconds);
      const tag = s.mission?.tags[0] ?? 'Focus';
      secondsByTag.set(tag, (secondsByTag.get(tag) ?? 0) + s.actualSeconds);
    }

    const weeklyFocus: FocusHoursPoint[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = addDays(now, -i);
      weeklyFocus.push({
        day: weekday(d),
        hours: round1((secondsByDay.get(dayKey(d)) ?? 0) / SECONDS_PER_HOUR),
      });
    }

    const maxSeconds = Math.max(1, ...Array.from(secondsByDay.values()));
    const heatmap: HeatmapCell[] = [];
    for (let i = 34; i >= 0; i -= 1) {
      const d = addDays(now, -i);
      const secs = secondsByDay.get(dayKey(d)) ?? 0;
      heatmap.push({
        date: startOfDay(d).toISOString(),
        value: round2(secs / maxSeconds),
        active: secs > 0,
      });
    }

    const totalTagSeconds = Math.max(1, sum(Array.from(secondsByTag.values())));
    const timeDistribution: TimeDistributionSlice[] = Array.from(secondsByTag.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, secs]) => ({ name, value: Math.round((secs / totalTagSeconds) * 100) }));

    const missionCompletion = await this.buildMissionCompletion(userId, now);

    return { weeklyFocus, missionCompletion, timeDistribution, heatmap };
  }

  async getOverview(userId: string): Promise<AnalyticsOverview> {
    const now = new Date();
    const [sessions, missions] = await Promise.all([
      this.prisma.focusSession.findMany({
        where: { userId, startedAt: { gte: startOfDay(addDays(now, -13)) } },
        select: { actualSeconds: true, plannedMinutes: true, startedAt: true },
      }),
      this.prisma.mission.findMany({
        where: { userId },
        select: { status: true, deadline: true, completedAt: true },
      }),
    ]);

    const today = dayKey(now);
    const yesterday = dayKey(addDays(now, -1));
    const secondsToday = sum(
      sessions.filter((s) => dayKey(s.startedAt) === today).map((s) => s.actualSeconds),
    );
    const secondsYesterday = sum(
      sessions.filter((s) => dayKey(s.startedAt) === yesterday).map((s) => s.actualSeconds),
    );
    const hoursToday = round1(secondsToday / SECONDS_PER_HOUR);
    const deltaHours = round1((secondsToday - secondsYesterday) / SECONDS_PER_HOUR);

    const completedToday = missions.filter(
      (m) => m.completedAt && dayKey(m.completedAt) === today,
    ).length;
    const dueToday = missions.filter(
      (m) =>
        (m.deadline && dayKey(m.deadline) === today) ||
        (m.completedAt && dayKey(m.completedAt) === today),
    ).length;

    const weekStart = startOfDay(addDays(now, -6));
    const dueThisWeek = missions.filter((m) => m.deadline && m.deadline >= weekStart);
    const completedThisWeek = dueThisWeek.filter(
      (m) => m.status === MissionStatus.Completed,
    ).length;
    const weeklyProgress = dueThisWeek.length
      ? Math.round((completedThisWeek / dueThisWeek.length) * 100)
      : 0;

    const last7 = sum(
      sessions.filter((s) => diffInDays(now, s.startedAt) < 7).map((s) => s.actualSeconds),
    );
    const prior7 = sum(
      sessions
        .filter((s) => {
          const d = diffInDays(now, s.startedAt);
          return d >= 7 && d < 14;
        })
        .map((s) => s.actualSeconds),
    );
    const productivity = prior7 ? Math.round(((last7 - prior7) / prior7) * 100) : 0;

    const savedSeconds = sum(
      sessions
        .filter((s) => diffInDays(now, s.startedAt) < 7)
        .map((s) => Math.max(0, s.plannedMinutes * 60 - s.actualSeconds)),
    );
    const timeSaved = round1(savedSeconds / SECONDS_PER_HOUR);

    const stats: AnalyticsStat[] = [
      {
        key: 'focus-hours',
        label: 'Focus Hours',
        value: `${hoursToday}h`,
        sub: `${deltaHours >= 0 ? '+' : ''}${deltaHours}h vs yesterday`,
        trend: deltaHours >= 0 ? 'up' : 'down',
      },
      {
        key: 'weekly-progress',
        label: 'Weekly Progress',
        value: `${weeklyProgress}%`,
        sub: 'Missions due this week',
        trend: 'up',
      },
      {
        key: 'mission-completion',
        label: 'Mission Completion',
        value: `${completedToday}/${dueToday}`,
        sub: `${Math.max(0, dueToday - completedToday)} remaining today`,
        trend: 'neutral',
      },
      {
        key: 'productivity',
        label: 'Productivity Trend',
        value: `${productivity >= 0 ? '+' : ''}${productivity}%`,
        sub: 'vs previous 7 days',
        trend: productivity >= 0 ? 'up' : 'down',
      },
      {
        key: 'time-saved',
        label: 'Time Saved',
        value: `${timeSaved}h`,
        sub: 'Focus vs planned',
        trend: 'up',
      },
    ];

    return { stats };
  }

  async getDisciplineScore(userId: string): Promise<DisciplineScore> {
    const now = new Date();
    const from = startOfDay(addDays(now, -55));
    const [missions, sessions] = await Promise.all([
      this.prisma.mission.findMany({
        where: { userId, OR: [{ deadline: { gte: from } }, { completedAt: { gte: from } }] },
        select: { status: true, deadline: true },
      }),
      this.prisma.focusSession.findMany({
        where: { userId, startedAt: { gte: from } },
        select: { actualSeconds: true, startedAt: true },
      }),
    ]);

    const weekScore = (weeksAgo: number): number => {
      const start = startOfDay(addDays(now, -7 * (weeksAgo + 1) + 1));
      const end = startOfDay(addDays(now, -7 * weeksAgo + 1));
      const due = missions.filter((m) => m.deadline && m.deadline >= start && m.deadline < end);
      const completed = due.filter((m) => m.status === MissionStatus.Completed).length;
      const completionRate = due.length ? completed / due.length : 0.7;
      const focusSeconds = sum(
        sessions
          .filter((s) => s.startedAt >= start && s.startedAt < end)
          .map((s) => s.actualSeconds),
      );
      const focusScore = Math.min(1, focusSeconds / (FULL_WEEK_FOCUS_HOURS * SECONDS_PER_HOUR));
      return Math.round((completionRate * 0.6 + focusScore * 0.4) * 100);
    };

    const trend: ScoreTrendPoint[] = [];
    for (let w = 6; w >= 0; w -= 1) {
      trend.push({ week: `W${7 - w}`, score: weekScore(w) });
    }

    const score = trend.at(-1)?.score ?? 0;
    const previous = trend.at(-2)?.score ?? score;
    return { score, deltaFromLastWeek: score - previous, trend };
  }

  private async buildMissionCompletion(
    userId: string,
    now: Date,
  ): Promise<MissionCompletionPoint[]> {
    const from = startOfDay(addDays(now, -6));
    const missions = await this.prisma.mission.findMany({
      where: { userId, OR: [{ deadline: { gte: from } }, { completedAt: { gte: from } }] },
      select: { deadline: true, completedAt: true },
    });

    const points: MissionCompletionPoint[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const key = dayKey(addDays(now, -i));
      let completed = 0;
      let total = 0;
      for (const m of missions) {
        const completedThatDay = m.completedAt && dayKey(m.completedAt) === key;
        const dueThatDay = m.deadline && dayKey(m.deadline) === key;
        if (completedThatDay) completed += 1;
        if (dueThatDay || completedThatDay) total += 1;
      }
      points.push({ day: weekday(addDays(now, -i)), completed, total });
    }
    return points;
  }
}
