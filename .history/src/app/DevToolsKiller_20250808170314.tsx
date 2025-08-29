'use client';

import { useEffect } from 'react';

export default function DevToolsKiller() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Сохраняем оригинальную функцию createElement с правильным типом
      const originalCreateElement: typeof document.createElement = 
        document.createElement.bind(document);

      // Функция для удаления Dev Tools
      const killDevTools = () => {
        // Удаляем toast-уведомления
        document.querySelectorAll('[data-nextjs-toast]').forEach(el => el.remove());
        
        // Удаляем плавающую иконку
        document.querySelectorAll('[data-next-badge-root]').forEach(el => el.remove());
      };

      // Переопределяем createElement с типами
      document.createElement = function <K extends keyof HTMLElementTagNameMap>(
        tagName: K,
        options?: ElementCreationOptions
      ): HTMLElementTagNameMap[K] {
        if (options?.dataset?.nextjsToast || options?.dataset?.nextBadgeRoot) {
          return document.createElement('template') as unknown as HTMLElementTagNameMap[K];
        }
        return originalCreateElement(tagName, options);
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