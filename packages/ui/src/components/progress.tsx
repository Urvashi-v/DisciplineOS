import type * as React from 'react';

import { cn } from '../lib/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value from 0 to 100. */
  value?: number;
  /** Classes for the filled indicator. */
  indicatorClassName?: string;
}

/** Thin, token-driven progress bar used for missions, commitments and challenges. */
export function Progress({ value = 0, className, indicatorClassName, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('bg-muted h-1 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <div
        className={cn(
          'bg-foreground h-full rounded-full transition-[width] duration-500 ease-out',
          indicatorClassName,
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
