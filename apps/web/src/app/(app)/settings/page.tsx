import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <FeaturePlaceholder
      title="Settings"
      description="Manage your account, plan, notifications and integrations."
    />
  );
}
