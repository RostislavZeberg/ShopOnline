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
  /* другие настройки */

  logging: {
    level: 'error', // показывать только ошибки
    fetches: {
      fullUrl: false
    }
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