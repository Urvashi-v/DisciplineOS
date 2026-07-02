import { Button } from '@disciplineos/ui';
import Link from 'next/link';

import { ROUTES } from '@/config/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-primary text-6xl font-bold tracking-tight">404</p>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Page not found</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
      </div>
      <Button asChild>
        <Link href={ROUTES.dashboard}>Back to dashboard</Link>
      </Button>
    </div>
  );
}
