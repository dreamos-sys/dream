/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // ✅ Plugin baru untuk Tailwind v4
    autoprefixer: {},            // ✅ Tetap pake autoprefixer
  },
}
