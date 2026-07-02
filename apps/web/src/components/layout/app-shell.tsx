import type { ReactNode } from 'react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

/** The authenticated application frame: persistent sidebar + top navbar + content. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
