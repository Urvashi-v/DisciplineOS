import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Focus Mode' };

export default function FocusPage() {
  return (
    <FeaturePlaceholder
      title="Focus Mode"
      description="Enter Mission Mode: block distractions, run the focus timer and track interruptions."
    />
  );
}
