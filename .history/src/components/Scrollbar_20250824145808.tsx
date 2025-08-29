"use client"
import React, { useRef, useState, useCallback, useEffect } from 'react';

const ScrollbarComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [currentPadding, setCurrentPadding] = useState(10);

  // Функция для проверки наличия скролла и вычисления его ширины
  const checkScrollbar = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const hasVerticalScroll = container.scrollHeight > container.clientHeight;
    
    if (hasVerticalScroll) {
      // Вычисляем ширину полосы прокрутки
      const scrollbarWidth = container.offsetWidth - container.clientWidth;
      setScrollbarWidth(scrollbarWidth);
      setHasScrollbar(true);
    } else {
      setHasScrollbar(false);
      setScrollbarWidth(0);
    }
  }, []);

  console.log("scrollbarWidth:", scrollbarWidth)

  // Функция для добавления отступа при клике на кнопку
  const handleAddPadding = useCallback(() => {
    if (hasScrollbar && scrollbarWidth > 0) {
      setCurrentPadding(prev => prev + scrollbarWidth);
    }
  }, [hasScrollbar, scrollbarWidth]);

  // Функция для сброса отступа
  const handleResetPadding = useCallback(() => {
    setCurrentPadding(10);
  }, []);

  // Проверяем наличие скролла при монтировании компонента
  useEffect(() => {
    checkScrollbar();
    
    // Также проверяем при изменении размера окна
    const handleResize = () => checkScrollbar();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkScrollbar]);

  return (
    <div ref={containerRef} style={width: 100%}>     
    </div>
  );
};

export default ScrollbarComponent;