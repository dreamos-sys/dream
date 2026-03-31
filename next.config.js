/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
  experimental: { webpackBuildWorker: true },
  output: 'export',
  images: { unoptimized: true },
}
