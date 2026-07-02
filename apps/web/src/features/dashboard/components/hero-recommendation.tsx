'use client';

import { Skeleton } from '@disciplineos/ui';
import { Sparkles } from 'lucide-react';

import { useAiRecommendation } from '@/features/ai-coach';

export function HeroRecommendation() {
  const { data, isLoading } = useAiRecommendation();

  return (
    <div className="border-border bg-surface flex items-start gap-3 rounded-xl border p-4">
      <span className="bg-foreground/10 mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg">
        <Sparkles className="text-foreground size-3.5" />
      </span>
      <div className="flex-1">
        <p className="text-foreground mb-0.5 text-xs font-semibold">AI Recommendation</p>
        {isLoading || !data ? (
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        ) : (
          <p className="text-muted-foreground text-xs leading-relaxed">{data.text}</p>
        )}
      </div>
    </div>
  );
}
