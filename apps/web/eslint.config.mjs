import next from '@disciplineos/config/eslint/next.mjs';

export default [
  ...next,
  {
    ignores: ['.next/**', 'next-env.d.ts'],
  },
];
