import type { MissionStatus } from '@disciplineos/types';
import { Badge } from '@disciplineos/ui';

import { STATUS_META } from '../constants/mission.constants';

export function MissionStatusBadge({ status }: { status: MissionStatus }) {
  const meta = STATUS_META[status];
  return <Badge variant={meta.badge}>{meta.label}</Badge>;
}
