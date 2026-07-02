import type { Metadata } from 'next';

import { FeaturePlaceholder } from '@/components/feature-placeholder';

export const metadata: Metadata = { title: 'Commitment Vault' };

export default function VaultPage() {
  return (
    <FeaturePlaceholder
      title="Commitment Vault"
      description="Attach a real stake to every mission — deposits, social accountability, time or a personal promise."
    />
  );
}
