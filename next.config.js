/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // ⚡ MATIKAN JALUR SARAF WEBPACK SECARA TOTAL
  experimental: {
    webpackBuildWorker: false, // INI KUNCINYA!
    parallelServerBuildTraces: false,
    workerThreads: false,
    cpus: 1
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = false;
    }
    return config;
  }
}

module.exports = nextConfig
