'use client';

import { Skeleton } from '@disciplineos/ui';
import { Zap } from 'lucide-react';

import { getInitials } from '@/features/user';

import { useFriendsActivity } from '../hooks/use-social';

export function FriendsActivity() {
  const { data, isLoading } = useFriendsActivity();

  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <p className="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-widest">
        Friends
      </p>

      {isLoading ? (
        <div className="space-y-2.5">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      ) : (data?.length ?? 0) === 0 ? (
        <p className="text-muted-foreground text-xs">Add friends to see their activity here.</p>
      ) : (
        <div className="space-y-2.5">
          {data?.map((friend) => (
            <div key={friend.id} className="flex items-center gap-2.5">
              <div className="relative">
                <span className="border-border bg-surface text-foreground flex size-7 items-center justify-center rounded-full border text-[10px] font-semibold">
                  {getInitials(friend.displayName)}
                </span>
                {friend.active ? (
                  <span className="border-card bg-foreground/80 absolute -bottom-0.5 -right-0.5 size-2 rounded-full border" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-xs font-medium">{friend.displayName}</p>
                <p className="text-muted-foreground truncate text-[10px]">{friend.status}</p>
              </div>
              <div className="text-muted-foreground flex items-center gap-0.5 text-[10px]">
                <Zap className="size-2.5" />
                {friend.streak}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
