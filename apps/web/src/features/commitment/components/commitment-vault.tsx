'use client';

import { EmptyState, Progress, Skeleton } from '@disciplineos/ui';
import { ArrowRight, DollarSign, Gift, Lock } from 'lucide-react';

import { useCommitments, useCommitmentSummary } from '../hooks/use-commitments';

function dollars(cents?: number | null): string {
  return `$${Math.round((cents ?? 0) / 100)}`;
}

function dueLabel(iso: string | null): string {
  return iso
    ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '—';
}

export function CommitmentVault() {
  const { data: commitments, isLoading } = useCommitments();
  const { data: summary } = useCommitmentSummary();

  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="bg-foreground/10 flex size-7 items-center justify-center rounded-lg">
            <Lock className="text-foreground size-3.5" />
          </span>
          <div>
            <h3 className="text-foreground text-sm font-semibold">Commitment Vault</h3>
            <p className="text-muted-foreground text-[10px]">Accountability contracts</p>
          </div>
        </div>
        <span className="text-foreground text-xs font-semibold">
          {dollars(summary?.totalLockedCents)} locked
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : (commitments?.length ?? 0) === 0 ? (
        <EmptyState
          icon={Lock}
          title="No commitments yet"
          description="Attach a stake to a mission to hold yourself accountable."
          className="p-6"
        />
      ) : (
        <div className="space-y-3">
          {commitments?.map((c) => (
            <div key={c.id} className="border-border bg-surface rounded-xl border p-3">
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-foreground text-xs font-medium leading-snug">{c.title}</p>
                <span className="bg-muted text-muted-foreground whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px]">
                  Due {dueLabel(c.deadline)}
                </span>
              </div>
              <div className="text-muted-foreground mb-2.5 flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3" />
                  {dollars(c.stakeAmountCents)} locked
                </span>
                {c.reward ? (
                  <span className="flex items-center gap-1">
                    <Gift className="size-3" />
                    {c.reward}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center gap-2.5">
                <Progress value={c.completion} className="flex-1" />
                <span className="text-muted-foreground font-mono text-[11px]">{c.completion}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        className="text-muted-foreground hover:text-foreground mt-4 flex items-center gap-1.5 text-xs transition-colors"
      >
        Add new commitment
        <ArrowRight className="size-3" />
      </button>
    </div>
  );
}
