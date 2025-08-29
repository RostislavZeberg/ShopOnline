import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Основной способ отключения Dev Tools
  devIndicators: {
    buildActivity: false, // Полностью отключает иконку и toast
    buildActivityPosition: undefined // Дополнительная мера
  },

  // Современные экспериментальные флаги (актуальные для v14+)
  experimental: {
    // instrumentationHook больше не поддерживается
    // Вместо этого используйте:
    disablePostcssPresetEnv: true, // Опционально
    serverComponentsExternalPackages: [], // Опционально
  }
};

export default nextConfig;