import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Analytics' };

export default function AnalyticsPage() {
  return (
    <FeaturePlaceholder
      title="Analytics"
      description="Understand your behavior: peak focus hours, distraction triggers and completion trends."
    />
  );
}
