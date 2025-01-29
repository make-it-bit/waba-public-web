/** @type {import('next').NextConfig} */
const path = require('path');

const { withAxiom } = require('next-axiom');

module.exports = withAxiom({
  sassOptions: {
    includePaths: [path.join(__dirname, 'app')],
  },
  // experimental: { serverActions: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'waba-strapi.fly.dev', pathname: '**' },
      { protocol: 'https', hostname: 'instagram.ftll2-1.fna.fbcdn.net', pathname: '**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '**' },
      { protocol: 'http', hostname: 'localhost', pathname: '**' },
      { protocol: 'https', hostname: '*.cdninstagram.com' },
    ],
  },
  // async redirects() {
  //   return [{ source: '/', destination: 'https://www.waba.health', permanent: true }];
  // },
});
