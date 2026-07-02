import globals from 'globals';

import base from './base.mjs';

/**
 * ESLint (flat) config for NestJS services.
 * Decorator-heavy code and DI patterns relax a few of the base rules.
 */
export default [
  ...base,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      // NestJS relies on runtime (value) imports of injected classes so that
      // `emitDecoratorMetadata` can emit them as DI tokens. Converting them to
      // type-only imports silently breaks dependency injection, so disable this.
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
];
