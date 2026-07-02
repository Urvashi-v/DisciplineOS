import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The UI design system is consumed as TypeScript source and must be
  // transpiled by Next rather than pre-built.
  transpilePackages: ['@disciplineos/ui'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
