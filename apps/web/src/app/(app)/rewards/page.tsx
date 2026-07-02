import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Rewards' };

export default function RewardsPage() {
  return (
    <FeaturePlaceholder
      title="Rewards"
      description="Unlock personal rewards by keeping your commitments — locked until you follow through."
    />
  );
}
