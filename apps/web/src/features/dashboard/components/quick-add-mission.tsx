'use client';

import { Priority } from '@disciplineos/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useCreateMission } from '@/features/missions';

export function QuickAddMission() {
  const [value, setValue] = useState('');
  const createMission = useCreateMission();

  const submit = () => {
    const title = value.trim();
    if (title.length < 2) return;
    createMission.mutate(
      { title, priority: Priority.Medium, durationMinutes: 30 },
      { onSuccess: () => setValue('') },
    );
  };

  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <p className="text-muted-foreground mb-2.5 text-xs font-semibold uppercase tracking-widest">
        Quick Add Mission
      </p>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          className="border-border bg-surface text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/30 flex-1 rounded-xl border px-3 py-2 text-xs focus:outline-none"
          placeholder="Describe a mission..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Add mission"
          disabled={createMission.isPending || value.trim().length < 2}
          className="bg-foreground text-background flex size-8 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Plus className="size-3.5" />
        </button>
      </form>
    </div>
  );
}
