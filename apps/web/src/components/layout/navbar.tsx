import { Search, Sparkles } from 'lucide-react';

import { NotificationBell } from '@/features/notifications';

import { ThemeToggle } from './theme-toggle';
import { UserMenu } from './user-menu';

export function Navbar() {
  return (
    <header className="border-border bg-background/80 fixed left-[220px] right-0 top-0 z-20 flex h-[56px] items-center gap-3 border-b px-6 backdrop-blur-md">
      {/* Search */}
      <div className="max-w-[340px] flex-1">
        <button
          type="button"
          className="border-border bg-surface text-muted-foreground hover:border-foreground/20 flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2 transition-colors"
        >
          <Search className="size-3.5 shrink-0" />
          <span className="flex-1 text-left text-xs">Search missions, goals...</span>
          <kbd className="border-border bg-muted text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className="bg-foreground text-background flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
        >
          <Sparkles className="size-3.5" />
          Ask AI
        </button>

        <NotificationBell />

        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
