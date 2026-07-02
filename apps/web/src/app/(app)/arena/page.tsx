import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Focus Arena' };

export default function ArenaPage() {
  return (
    <FeaturePlaceholder
      title="Focus Arena"
      description="Compare focus hours, streaks and mission completion with friends — healthy competition, not comparison."
    />
  );
}
