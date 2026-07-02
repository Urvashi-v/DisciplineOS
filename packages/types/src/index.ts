/**
 * @disciplineos/types — the shared contract layer.
 *
 * Domain types, enums, transport envelopes and Zod validation schemas consumed
 * by both the Next.js web app and the NestJS API. This package has no runtime
 * dependencies beyond Zod and must never import from an app.
 */
export * from './common';
export * from './domain';
export * from './enums';
export * from './schemas';
