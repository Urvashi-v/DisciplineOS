'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Skeleton,
} from '@disciplineos/ui';

import { useSystemHealth } from '../hooks/use-system-health';
import type { ServiceState } from '../types/system.types';

function StatusRow({ label, state }: { label: string; state: ServiceState | 'unknown' }) {
  const isUp = state === 'up';
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 font-medium">
        <span
          className={cn(
            'size-2 rounded-full',
            state === 'unknown' ? 'bg-muted-foreground' : isUp ? 'bg-success' : 'bg-destructive',
          )}
        />
        {state === 'unknown' ? 'Unknown' : isUp ? 'Operational' : 'Down'}
      </span>
    </div>
  );
}

/** Live system health, demonstrating the full web → API → DB/Redis path. */
export function SystemStatus() {
  const { data, isLoading, isError } = useSystemHealth();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">System status</CardTitle>
        <CardDescription>
          {isError
            ? 'Cannot reach the API. Is it running on port 4000?'
            : 'Live connectivity across the stack.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        ) : (
          <div className="divide-y">
            <StatusRow label="API" state={isError ? 'down' : 'up'} />
            <StatusRow label="Database" state={data?.services.database ?? 'unknown'} />
            <StatusRow label="Redis" state={data?.services.redis ?? 'unknown'} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
