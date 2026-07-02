'use client';

import { Skeleton } from '@disciplineos/ui';

import { useDisciplineScore } from '../hooks/use-analytics';
import { ScoreRing } from './score-ring';

export function DisciplineScorePanel() {
  const { data, isLoading } = useDisciplineScore();

  return (
    <div className="border-border bg-card flex-1 rounded-2xl border p-6">
      <p className="text-muted-foreground mb-4 text-xs font-medium uppercase tracking-widest">
        Discipline Score
      </p>

      {isLoading || !data ? (
        <>
          <Skeleton className="mb-4 h-12 w-24" />
          <div className="flex justify-center">
            <Skeleton className="size-[88px] rounded-full" />
          </div>
        </>
      ) : (
        <>
          <div className="mb-1 flex items-end gap-2">
            <span className="text-foreground text-5xl font-bold tracking-tighter">
              {data.score}
            </span>
            <span className="text-muted-foreground mb-1 text-lg">/100</span>
          </div>
          <p className="text-muted-foreground mb-4 text-xs">
            {data.deltaFromLastWeek >= 0 ? '+' : ''}
            {data.deltaFromLastWeek} pts from last week
          </p>
          <div className="flex justify-center">
            <ScoreRing value={data.score} />
          </div>
        </>
      )}
    </div>
  );
}
