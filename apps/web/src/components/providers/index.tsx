'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

/** Single composition point for all client-side providers. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        {children}
        <Toaster richColors closeButton position="top-right" />
      </QueryProvider>
    </ThemeProvider>
  );
}
