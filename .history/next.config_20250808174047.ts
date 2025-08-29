import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* другие настройки конфига */
  
  logging: {
    level: 'error', // показывать только ошибки
    fetches: {
      fullUrl: false
    }
  }
};

export default nextConfig;
