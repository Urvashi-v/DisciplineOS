'use client';

import { Badge, cn } from '@disciplineos/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/config/navigation';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6" aria-label="Primary">
      {navigation.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <p className="text-muted-foreground px-3 text-xs font-semibold uppercase tracking-wider">
            {section.title}
          </p>
          {section.items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.premium ? (
                  <Badge variant="warning" className="px-1.5 py-0 text-[10px]">
                    PRO
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
