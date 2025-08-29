import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  experimental: {
    reactProductionProfiling: false, // Отключает Dev Tools
  },
};

export default nextConfig;
