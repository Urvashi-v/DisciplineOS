import { Button } from '@disciplineos/ui';
import { Bell } from 'lucide-react';

import { ThemeToggle } from './theme-toggle';
import { UserMenu } from './user-menu';

export function Navbar() {
  return (
    <header className="bg-background/80 sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b px-4 backdrop-blur lg:px-8">
      <div className="min-w-0">
        <p className="text-muted-foreground truncate text-sm">
          What should you be doing right now?
        </p>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
