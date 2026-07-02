import type { Priority } from '@disciplineos/types';
import { Badge } from '@disciplineos/ui';

import { PRIORITY_META } from '../constants/mission.constants';

export function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority];
  return <Badge variant={meta.badge}>{meta.label}</Badge>;
}
