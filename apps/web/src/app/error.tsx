'use client';

import { Button } from '@disciplineos/ui';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full">
        <AlertTriangle className="size-6" />
      </span>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          An unexpected error occurred. You can retry, or head back and try again.
        </p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
