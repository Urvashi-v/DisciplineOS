'use client';

import { cn, Skeleton } from '@disciplineos/ui';
import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function MiniCalendar() {
  // Date is resolved on the client only — the server's UTC "today" would differ
  // from the browser's local date and break hydration.
  const [now, setNow] = useState<Date | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    setNow(today);
    setSelected(today.getDate());
  }, []);

  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
          {now ? now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'Calendar'}
        </p>
        <CalendarDays className="text-muted-foreground size-3.5" />
      </div>

      {!now ? (
        <Skeleton className="h-40 w-full rounded-xl" />
      ) : (
        <Grid now={now} selected={selected} onSelect={setSelected} />
      )}
    </div>
  );
}

function Grid({
  now,
  selected,
  onSelect,
}: {
  now: Date;
  selected: number | null;
  onSelect: (day: number) => void;
}) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first

  return (
    <>
      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-muted-foreground py-0.5 text-center text-[10px] font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(day)}
              className={cn(
                'flex aspect-square w-full items-center justify-center rounded-lg text-[11px] transition-colors',
                day === selected
                  ? 'bg-foreground text-background font-semibold'
                  : day === today
                    ? 'border-border text-foreground border'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
}
