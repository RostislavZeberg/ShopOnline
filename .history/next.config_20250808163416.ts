import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    instrumentationHook: false
  }
  /* config options here */
};

export default nextConfig;
