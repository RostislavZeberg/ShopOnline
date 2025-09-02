import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включение сжатия и оптимизации
  compress: true,
  generateEtags: false,
  poweredByHeader: false,

  // Настройки для веб-пакета
  webpack: (config, { isServer, dev }) => {
    // Оптимизация загрузки CSS только в production
    if (!isServer && !dev) {
      // Улучшенная конфигурация для разделения CSS
      const cacheGroups = config.optimization.splitChunks.cacheGroups;
      
      cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
        priority: 40, // Высокий приоритет
      };
      
      // Оптимизация для vendor chunks
      cacheGroups.vendor = {
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        priority: 30,
        reuseExistingChunk: true,
      };
    }

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vue-study.skillbox.cc',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    // Добавляем форматы изображений для лучшей оптимизации
    formats: ['image/webp', 'image/avif'],
    // Оптимизация загрузки изображений
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Включаем SWC минификацию (по умолчанию в Next.js 13+)
  swcMinify: true,

  // Настройка заголовков для безопасности и оптимизации
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      }
    ];
  },
};

// Добавляем логгирование только в development режиме
if (process.env.NODE_ENV === 'development') {
  nextConfig.logging = {
    fetches: {
      fullUrl: false
    }
  };
}

export default nextConfig;