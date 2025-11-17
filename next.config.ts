import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    // Allow production builds to succeed even if type errors are present
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
