/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // strip console.* from production bundles
    removeConsole: { exclude: ['error'] },
  },
};

export default nextConfig;
