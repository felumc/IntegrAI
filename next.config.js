/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    localeDetection: false,
  },
  trailingSlash: true,
};

module.exports = nextConfig; 