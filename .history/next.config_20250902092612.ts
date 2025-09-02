import type { NextConfig } from "next";

// Расширяем стандартный интерфейс NextConfig
interface CustomNextConfig extends NextConfig {
  logging?: {
    level?: 'verbose' | 'info' | 'warn' | 'error';
    fetches?: {
      fullUrl?: boolean;
    };
  };
}

const nextConfig: CustomNextConfig = {
  // Включения сжатие и оптимизации
  compress: true,
  generateEtags: false,
  poweredByHeader: false,

  // Оптимизация для CSS
  experimental: {
    optimizeCss: true,
  },

  logging: {
    level: 'error', // показывать только ошибки
    fetches: {
      fullUrl: false
    }
  },

  // Настройки для веб-пакета
  webpack: (config, { isServer }) => {
    // Оптимизация загрузки CSS
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      };
    }

    return config;
  },

  images: {
    // domains: ['vue-study.skillbox.cc'], // Разрешаем домен
    // Или более безопасный вариант:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vue-study.skillbox.cc',
        port: '',
        pathname: '/uploads/**', // Разрешаем только изображения из папки uploads
      },
    ],
  },
};

export default nextConfig;