/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'app')],
  },
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'waba-strapi.fly.dev',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '**',
      },
    ],
  },
};
