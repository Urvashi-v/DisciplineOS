import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton.
 *
 * In development, Next.js/Nest hot-reload can otherwise instantiate a new client
 * on every reload and exhaust the connection pool. Caching the instance on
 * `globalThis` guards against that. This module is server-only — the web app
 * never imports it; it talks to the API over HTTP.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Re-export the generated types & enums so consumers depend only on
// `@disciplineos/db` rather than reaching into `@prisma/client` directly.
export * from '@prisma/client';
export { Prisma, PrismaClient } from '@prisma/client';
