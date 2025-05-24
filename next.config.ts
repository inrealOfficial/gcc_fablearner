import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fablearner.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
