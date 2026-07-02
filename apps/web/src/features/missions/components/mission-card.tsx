import { type Mission, MissionStatus } from '@disciplineos/types';
import { Button, Card, CardContent, CardFooter } from '@disciplineos/ui';
import { CalendarClock, Check, Clock, Play, Trash2, X } from 'lucide-react';

import { formatDeadline, formatDuration } from '../utils/format';
import { MissionStatusBadge } from './mission-status-badge';
import { PriorityBadge } from './priority-badge';

interface MissionCardProps {
  mission: Mission;
  onActivate: (id: string) => void;
  onComplete: (id: string) => void;
  onAbandon: (id: string) => void;
  onDelete: (id: string) => void;
  isBusy?: boolean;
}

const STARTABLE: MissionStatus[] = [
  MissionStatus.Draft,
  MissionStatus.Scheduled,
  MissionStatus.Paused,
];

export function MissionCard({
  mission,
  onActivate,
  onComplete,
  onAbandon,
  onDelete,
  isBusy = false,
}: MissionCardProps) {
  const canStart = STARTABLE.includes(mission.status);
  const isActive = mission.status === MissionStatus.Active;

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight">{mission.title}</h3>
          <PriorityBadge priority={mission.priority} />
        </div>

        {mission.description ? (
          <p className="text-muted-foreground line-clamp-2 text-sm">{mission.description}</p>
        ) : null}

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {formatDuration(mission.durationMinutes)}
          </span>
          {mission.deadline ? (
            <span className="flex items-center gap-1">
              <CalendarClock className="size-3.5" />
              {formatDeadline(mission.deadline)}
            </span>
          ) : null}
          <MissionStatusBadge status={mission.status} />
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t p-3">
        {canStart ? (
          <Button size="sm" onClick={() => onActivate(mission.id)} disabled={isBusy}>
            <Play /> Start
          </Button>
        ) : null}
        {isActive ? (
          <>
            <Button size="sm" onClick={() => onComplete(mission.id)} disabled={isBusy}>
              <Check /> Complete
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAbandon(mission.id)}
              disabled={isBusy}
            >
              <X /> Abandon
            </Button>
          </>
        ) : null}
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive ml-auto"
          aria-label="Delete mission"
          onClick={() => onDelete(mission.id)}
          disabled={isBusy}
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}
