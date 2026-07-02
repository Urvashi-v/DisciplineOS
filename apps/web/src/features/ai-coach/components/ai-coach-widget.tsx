'use client';

import { Skeleton } from '@disciplineos/ui';
import { AlertTriangle, ArrowRight, Bot, Clock, type LucideIcon, TrendingUp } from 'lucide-react';

import { useAiInsights } from '../hooks/use-ai';

const ICONS: Record<string, LucideIcon> = {
  ADVICE: TrendingUp,
  FOCUS_PREDICTION: Clock,
  RISK_ALERT: AlertTriangle,
};

export function AiCoachWidget() {
  const { data, isLoading } = useAiInsights();

  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="bg-foreground/10 flex size-7 items-center justify-center rounded-lg">
            <Bot className="text-foreground size-3.5" />
          </span>
          <div>
            <h3 className="text-foreground text-sm font-semibold">AI Coach</h3>
            <p className="text-muted-foreground text-[10px]">Powered by behavioral analysis</p>
          </div>
        </div>
        <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
          <span className="bg-foreground/60 size-1.5 animate-pulse rounded-full" />
          Live
        </span>
      </div>

      <div className="space-y-3">
        {isLoading || !data
          ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)
          : data.map((insight) => {
              const Icon = ICONS[insight.kind] ?? TrendingUp;
              return (
                <div
                  key={insight.kind}
                  className="border-border bg-surface flex items-start gap-3 rounded-xl border p-3"
                >
                  <span className="bg-foreground/10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="text-foreground size-3" />
                  </span>
                  <div>
                    <p className="text-muted-foreground mb-0.5 text-[10px] font-semibold uppercase tracking-widest">
                      {insight.title}
                    </p>
                    <p className="text-foreground/80 text-xs leading-relaxed">{insight.body}</p>
                  </div>
                </div>
              );
            })}
      </div>

      <button
        type="button"
        className="text-muted-foreground hover:text-foreground mt-4 flex items-center gap-1.5 text-xs transition-colors"
      >
        View full coaching session
        <ArrowRight className="size-3" />
      </button>
    </div>
  );
}
