import preset from '@disciplineos/config/tailwind/tailwind.preset';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    // Scan the design-system source so its utility classes are generated.
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};

export default config;
