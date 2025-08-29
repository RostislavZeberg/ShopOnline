import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Основной способ отключения Dev Tools
  devIndicators: {
    buildActivity: false, // Полностью отключает иконку и toast
  },

  // Альтернативные варианты (если нужно частичное отключение)
  experimental: {
    // instrumentationHook: false, // Не влияет на Dev Tools
    nextScriptWorkers: false,      // Опционально
  },
}

export default nextConfig;
