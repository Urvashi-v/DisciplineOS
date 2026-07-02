import type { ReactNode } from 'react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

/**
 * The application frame: a fixed 220px sidebar and 56px top nav, with content
 * offset beneath them. Individual pages own the padding/layout of their content.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <Sidebar />
      <Navbar />
      <div className="ml-[220px] pt-[56px]">{children}</div>
    </div>
  );
}
