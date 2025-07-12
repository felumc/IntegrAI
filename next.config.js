const createNextIntlPlugin =  require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/requests.ts');

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es/',
        permanent: true,
      },
      {
        source: '/((?!es/|en/)(?!.*\\..*).*)',
        destination: '/es/',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);