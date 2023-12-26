/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'app')],
  },
  images: {
    domains: ['127.0.0.1'],
  },
};
