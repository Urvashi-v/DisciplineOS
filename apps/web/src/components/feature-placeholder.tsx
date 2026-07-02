import { EmptyState } from '@disciplineos/ui';
import { Sparkles } from 'lucide-react';

import { PageHeader } from './page-header';

interface FeaturePlaceholderProps {
  title: string;
  description: string;
}

/**
 * Standard scaffold for routes whose feature module is on the roadmap but not
 * yet built. Keeps the shell fully navigable and communicates intent.
 */
export function FeaturePlaceholder({ title, description }: FeaturePlaceholderProps) {
  return (
    <div className="space-y-6 px-6 py-6 lg:px-8">
      <PageHeader title={title} description={description} />
      <EmptyState
        icon={Sparkles}
        title={`${title} is coming soon`}
        description="This module is on the DisciplineOS roadmap and will come online in an upcoming build phase."
      />
    </div>
  );
}
