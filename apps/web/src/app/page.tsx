import { redirect } from 'next/navigation';

import { ROUTES } from '@/config/routes';

// The product entry point. Until marketing/auth pages exist, land users in the
// app shell at the dashboard.
export default function HomePage() {
  redirect(ROUTES.dashboard);
}
