'use client';

import type { AnalyticsCharts, DisciplineScore } from '@disciplineos/types';
import { Skeleton } from '@disciplineos/ui';
import type { ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useAnalyticsCharts, useDisciplineScore } from '../hooks/use-analytics';

const FG = 'oklch(0.94 0 0)';
const GRID = 'oklch(1 0 0 / 5%)';
const AXIS = 'oklch(0.5 0 0)';
const TOOLTIP = {
  backgroundColor: 'oklch(0.17 0 0)',
  border: '1px solid oklch(1 0 0 / 8%)',
  borderRadius: '10px',
  fontSize: '11px',
  color: FG,
};
const AXIS_TICK = { fontSize: 10, fill: AXIS } as const;

function ChartCard({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <div className="mb-4">
        <p className="text-foreground text-sm font-semibold">{title}</p>
        {sub ? <p className="text-muted-foreground mt-0.5 text-[11px]">{sub}</p> : null}
      </div>
      {children}
    </div>
  );
}

function WeeklyFocusChart({ data }: { data: AnalyticsCharts['weeklyFocus'] }) {
  return (
    <ChartCard title="Weekly Focus Hours" sub="Total deep work per day">
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <defs>
            <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={FG} stopOpacity={0.15} />
              <stop offset="100%" stopColor={FG} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
          <XAxis dataKey="day" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP} cursor={{ stroke: 'oklch(1 0 0 / 10%)' }} />
          <Area
            type="monotone"
            dataKey="hours"
            stroke={FG}
            strokeWidth={1.5}
            fill="url(#focusGrad)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function MissionCompletionChart({ data }: { data: AnalyticsCharts['missionCompletion'] }) {
  return (
    <ChartCard title="Mission Completion" sub="Completed vs total per day">
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
          <XAxis dataKey="day" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP} cursor={{ fill: 'oklch(1 0 0 / 4%)' }} />
          <Bar dataKey="total" fill="oklch(1 0 0 / 8%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill={FG} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function DisciplineScoreChart({ data }: { data: DisciplineScore['trend'] }) {
  return (
    <ChartCard title="Discipline Score" sub="7-week trend">
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
          <XAxis dataKey="week" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis domain={[40, 100]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP} />
          <Line
            type="monotone"
            dataKey="score"
            stroke={FG}
            strokeWidth={1.5}
            dot={{ r: 3, fill: FG, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function TimeDistribution({ data }: { data: AnalyticsCharts['timeDistribution'] }) {
  return (
    <ChartCard title="Time Distribution" sub="This week's breakdown">
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <span className="text-muted-foreground w-20 shrink-0 text-[11px]">{item.name}</span>
            <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-foreground h-full rounded-full"
                style={{ width: `${item.value}%`, opacity: 1 - i * 0.12 }}
              />
            </div>
            <span className="text-muted-foreground w-8 text-right font-mono text-[11px]">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

function FocusHeatmap({ data }: { data: AnalyticsCharts['heatmap'] }) {
  const dayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  return (
    <ChartCard title="Focus Heatmap" sub="Last 5 weeks of activity">
      <div className="flex gap-1.5">
        {dayLabels.map((label, col) => (
          <div key={label} className="flex flex-1 flex-col gap-1">
            <div className="text-muted-foreground mb-0.5 text-center text-[9px]">{label}</div>
            {Array.from({ length: 5 }).map((_, row) => {
              const cell = data[row * 7 + col];
              const active = cell?.active ?? false;
              return (
                <div
                  key={row}
                  className="aspect-square rounded-sm"
                  style={{
                    backgroundColor: active
                      ? `oklch(0.94 0 0 / ${20 + (cell?.value ?? 0) * 60}%)`
                      : 'oklch(1 0 0 / 5%)',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export function ChartsSection() {
  const { data: charts, isLoading } = useAnalyticsCharts();
  const { data: score } = useDisciplineScore();

  if (isLoading || !charts) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-52 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <WeeklyFocusChart data={charts.weeklyFocus} />
      <MissionCompletionChart data={charts.missionCompletion} />
      <DisciplineScoreChart data={score?.trend ?? []} />
      <div className="grid grid-cols-1 gap-4">
        <TimeDistribution data={charts.timeDistribution} />
        <FocusHeatmap data={charts.heatmap} />
      </div>
    </div>
  );
}
