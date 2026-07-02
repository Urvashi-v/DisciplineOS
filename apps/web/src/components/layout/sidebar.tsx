import { Target } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/config/routes';
import { siteConfig } from '@/config/site';

import { SidebarNav } from './sidebar-nav';

export function Sidebar() {
  return (
    <aside className="bg-card hidden w-64 shrink-0 flex-col border-r lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href={ROUTES.dashboard} className="flex items-center gap-2 font-semibold">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <Target className="size-5" />
          </span>
          <span className="text-base tracking-tight">{siteConfig.name}</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNav />
      </div>
    </aside>
  );
}
