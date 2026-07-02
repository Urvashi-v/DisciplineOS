import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'AI Coach' };

export default function CoachPage() {
  return (
    <FeaturePlaceholder
      title="AI Discipline Coach"
      description="Personalized coaching that understands your goals, habits and recovery patterns."
    />
  );
}
