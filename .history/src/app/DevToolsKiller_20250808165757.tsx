'use client';

import { useEffect } from 'react';

export default function DevToolsKiller() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Функция для удаления Dev Tools
      const killDevTools = () => {
        // Удаляем toast-уведомления
        document.querySelectorAll('[data-nextjs-toast]').forEach(el => el.remove());

        // Удаляем плавающую иконку
        document.querySelectorAll('[data-next-badge-root]').forEach(el => el.remove());

        // Блокируем создание новых элементов
        const originalCreateElement = document.createElement;
        document.createElement = function (tagName, options) {
          if (options?.dataset?.nextjsToast || options?.dataset?.nextBadgeRoot) {
            return document.createElement('template');
          }
          return originalCreateElement.call(this, tagName, options);
        };
      };

      // Запускаем сразу и каждые 500 мс на всякий случай
      killDevTools();
      const interval = setInterval(killDevTools, 500);

      return () => {
        clearInterval(interval);
        document.createElement = originalCreateElement;
      };
    }
  }, []);

  return null;
}