import { useRef, useState } from 'react';

export default function ScrollbarExample() {
  const containerRef = useRef(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [currentPadding, setCurrentPadding] = useState(10);

  // Функция для проверки наличия скролла и вычисления его ширины
  const checkScrollbar = () => {
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
  };

  // Функция для добавления отступа при клике на кнопку
  const handleAddPadding = () => {
    if (hasScrollbar) {
      setCurrentPadding(prev => prev + scrollbarWidth);
    }
  };

  // Функция для сброса отступа
  const handleResetPadding = () => {
    setCurrentPadding(10);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Управление отступами при наличии скролла</h1>
      <p>Проверьте наличие скролла и добавьте отступ при необходимости</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkScrollbar}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          Проверить скролл
        </button>
        
        <button 
          onClick={handleAddPadding}
          disabled={!hasScrollbar}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          Добавить отступ справа
        </button>
        
        <button 
          onClick={handleResetPadding}
          style={{ padding: '8px 16px' }}
        >
          Сбросить отступ
        </button>
      </div>
      
      <div
        ref={containerRef}
        style={{
          width: '400px',
          height: '200px',
          overflowY: 'auto',
          border: '2px solid #4CAF50',
          borderRadius: '5px',
          padding: `${currentPadding}px`,
          backgroundColor: '#f9f9f9',
          transition: 'padding 0.3s ease'
        }}
      >
        <div style={{ height: '300px', padding: '10px' }}>
          <h2>Прокручиваемый контент</h2>
          <p>Этот контейнер имеет фиксированную высоту и может содержать вертикальную полосу прокрутки.</p>
          <p>Для активации скролла здесь размещен контент, превышающий высоту контейнера.</p>
          <p>Попробуйте нажать "Проверить скролл", чтобы определить наличие полосы прокрутки, затем "Добавить отступ справа", если скролл присутствует.</p>
          <div style={{ height: '100px', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Дополнительный контент
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Информация о состоянии:</h3>
        <p>Наличие скролла: <strong>{hasScrollbar ? 'Да' : 'Нет'}</strong></p>
        <p>Ширина полосы прокрутки: <strong>{scrollbarWidth}px</strong></p>
        <p>Текущий отступ: <strong>{currentPadding}px</strong></p>
      </div>
    </div>
  );
}