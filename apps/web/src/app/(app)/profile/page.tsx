import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Profile' };

export default function ProfilePage() {
  return (
    <FeaturePlaceholder
      title="Profile"
      description="Your Focus DNA, RPG progression and skill tree — a behavioral identity that evolves through real actions."
    />
  );
}
