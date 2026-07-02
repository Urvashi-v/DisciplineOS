'use client';

import { Moon } from 'lucide-react';

/**
 * Theme control. DisciplineOS ships as a dark-only experience (the approved
 * design), so this renders the design's moon affordance without toggling.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Theme"
      className="text-muted-foreground hover:bg-accent hover:text-foreground relative flex size-8 items-center justify-center rounded-lg transition-colors"
    >
      <Moon className="size-4" />
    </button>
  );
}
