// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Новый способ отключения Dev Tools (вместо buildActivity)
  disableDevIndicators: true,

  // Актуальные экспериментальные флаги
  experimental: {
    disablePostcssPresetEnv: true,
  },

  // Перенесенные параметры (если нужны)
  serverExternalPackages: [], // Бывший serverComponentsExternalPackages
};

export default nextConfig;