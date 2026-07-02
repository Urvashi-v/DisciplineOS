import { Card, CardContent } from '@disciplineos/ui';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
}

/** Compact metric tile used across the dashboard and analytics surfaces. */
export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-6">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {hint ? <p className="text-muted-foreground text-xs">{hint}</p> : null}
        </div>
        {Icon ? (
          <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md">
            <Icon className="size-5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
