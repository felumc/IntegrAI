const createNextIntlPlugin =  require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/requests.ts');

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
};

module.exports = withNextIntl(nextConfig);