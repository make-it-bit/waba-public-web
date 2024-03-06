/** @type {import('next').NextConfig} */
const path = require('path');

const { withAxiom } = require('next-axiom');

module.exports = withAxiom({
  sassOptions: {
    includePaths: [path.join(__dirname, 'app')],
  },
  /* experimental: {
      serverActions: true,
    }, */
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
});
