import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  outputFileTracingRoot: __dirname,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // strip console.* from production bundles
    removeConsole: { exclude: ['error'] },
  },
};

export default nextConfig;
