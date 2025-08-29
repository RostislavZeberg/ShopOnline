import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactProductionProfiling: false, // Отключает Dev Tools
  },
  /* config options here */
};

module.exports = {
};

export default nextConfig;
