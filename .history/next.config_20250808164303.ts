// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Основная настройка
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: undefined
  },

  // Дополнительные меры
  experimental: {
    instrumentationHook: false,
    serverActionsBodySizeLimit: '2mb'
  }
};

export default nextConfig;
