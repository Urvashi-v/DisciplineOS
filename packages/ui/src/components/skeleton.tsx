import type * as React from 'react';

import { cn } from '../lib/cn';

/** Placeholder block shown while content loads. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />;
}
