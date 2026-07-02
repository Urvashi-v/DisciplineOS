import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Community' };

export default function CommunityPage() {
  return (
    <FeaturePlaceholder
      title="Community"
      description="Accountability groups, friends and the Focus Arena — compete and grow together."
    />
  );
}
