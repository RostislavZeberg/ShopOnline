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
  }
};

export default nextConfig;