/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fablearner.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fablearner.com',
        pathname: '/wp-content/**',
      },
    ],
  },
};

module.exports = nextConfig;