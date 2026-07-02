import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Challenges' };

export default function ChallengesPage() {
  return (
    <FeaturePlaceholder
      title="Challenges"
      description="Join private or public challenges — 30-day coding, fitness sprints, placement prep and more."
    />
  );
}
