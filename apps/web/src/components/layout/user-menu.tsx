'use client';

import { Avatar } from '@disciplineos/ui';
import Link from 'next/link';

import { ROUTES } from '@/config/routes';
import { getInitials, useCurrentUser } from '@/features/user';

export function UserMenu() {
  const { data, isLoading } = useCurrentUser();

  if (isLoading || !data) {
    return (
      <span className="border-border bg-surface ml-1 size-8 animate-pulse rounded-full border" />
    );
  }

  return (
    <Link href={ROUTES.profile} aria-label="Your profile" className="ml-1">
      <Avatar
        fallback={getInitials(data.displayName)}
        src={data.avatarUrl}
        className="hover:border-foreground/20 transition-colors"
      />
    </Link>
  );
}
