/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,  // ✅ Skip ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true,  // ✅ Skip TypeScript errors
  },
  images: { 
    unoptimized: true 
  }
}
module.exports = nextConfig
