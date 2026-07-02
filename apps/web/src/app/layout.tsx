import './globals.css';

import { cn } from '@disciplineos/ui';
import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';

import { Providers } from '@/components/providers';
import { siteConfig } from '@/config/site';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          'bg-background min-h-screen font-sans antialiased',
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
