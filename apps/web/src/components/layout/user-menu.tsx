import Link from 'next/link';

import { ROUTES } from '@/config/routes';

// Placeholder identity until the auth feature lands. Rendered as a link to the
// profile so the shell is navigable end-to-end today.
const DEMO_INITIALS = 'DF';

export function UserMenu() {
  return (
    <Link
      href={ROUTES.profile}
      aria-label="Your profile"
      className="bg-primary/10 text-primary hover:bg-primary/20 ml-1 flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors"
    >
      {DEMO_INITIALS}
    </Link>
  );
}
