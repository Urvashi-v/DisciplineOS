import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  // Type declarations are served directly from `src/index.ts` (see the package's
  // `exports.types`), so we don't bundle a `.d.ts` here. This keeps the build
  // fast and independent of Prisma's generated client, and makes it impossible
  // for consumers to end up with a missing/stale declaration file.
  dts: false,
  clean: true,
  sourcemap: true,
  external: ['@prisma/client', '.prisma/client'],
});
