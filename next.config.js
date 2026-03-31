/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
  output: 'export',  // ✅ Static export mode
  images: { unoptimized: true },
  trailingSlash: true,
}
