import { cn } from '@disciplineos/ui';
import type { ReactNode } from 'react';

/** The design's standard rounded card surface used across dashboard widgets. */
export function Panel({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cn('border-border bg-card rounded-2xl border p-5', className)}>{children}</div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-widest">
      {children}
    </h2>
  );
}
