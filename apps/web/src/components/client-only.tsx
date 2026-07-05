'use client';

import { type ReactNode, useEffect, useState } from 'react';

/**
 * Renders its children only after the component has mounted on the client.
 *
 * Used for fully client-data-driven surfaces (e.g. the personalized dashboard),
 * where nothing meaningful is server-rendered anyway. The server (and the first
 * client render) show `fallback`, so there is no server/client HTML to diverge —
 * eliminating hydration mismatches by construction.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return <>{mounted ? children : fallback}</>;
}
