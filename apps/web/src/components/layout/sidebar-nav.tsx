'use client';

import { cn } from '@disciplineos/ui';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type NavItem, navItems, settingsNavItem } from '@/config/navigation';

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        isActive
          ? 'bg-accent text-foreground font-medium'
          : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
      {isActive ? <ChevronRight className="size-3 opacity-40" /> : null}
    </Link>
  );
}

export function SidebarNav() {
  return (
    <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Primary">
      <div className="space-y-0.5">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>
      <div className="border-border mt-4 border-t pt-4">
        <NavLink item={settingsNavItem} />
      </div>
    </nav>
  );
}
