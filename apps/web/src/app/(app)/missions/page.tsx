import type { Metadata } from 'next';

import { MissionsView } from '@/features/missions';

export const metadata: Metadata = { title: 'Missions' };

export default function MissionsPage() {
  return <MissionsView />;
}
