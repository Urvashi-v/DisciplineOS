import { Zap } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/config/routes';
import { siteConfig } from '@/config/site';

import { SidebarNav } from './sidebar-nav';

export function Sidebar() {
  return (
    <aside className="border-border bg-sidebar fixed left-0 top-0 z-30 flex h-full w-[220px] flex-col border-r">
      {/* Logo */}
      <div className="border-border flex items-center gap-3 border-b px-5 py-5">
        <span className="bg-foreground flex size-7 shrink-0 items-center justify-center rounded-lg">
          <Zap className="fill-background text-background size-3.5" />
        </span>
        <Link
          href={ROUTES.dashboard}
          className="text-foreground text-sm font-semibold tracking-tight"
        >
          {siteConfig.name}
        </Link>
      </div>

      <SidebarNav />

      {/* Upgrade nudge */}
      <div className="border-border bg-surface mx-3 mb-4 rounded-xl border p-3">
        <p className="text-foreground mb-0.5 text-xs font-medium">Pro Plan</p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          AI coaching &amp; advanced analytics
        </p>
        <button
          type="button"
          className="bg-foreground text-background mt-2.5 w-full rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
        >
          Upgrade
        </button>
      </div>
    </aside>
  );
}
