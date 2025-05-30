/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fablearner.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fablearner.com",
        pathname: "/wp-content/**",
      },
    ],
  },
  eslint: {
    // Warning: This disables ESLint completely during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
