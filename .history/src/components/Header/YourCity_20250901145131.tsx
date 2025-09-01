"use client"
import { useCityDetection } from "@/hooks/useCityDetection";
import { useState } from 'react';
import styles from './header.module.scss'

export const YourCity = () => {
  const { city, error, isLoading, coordinates, detectCity } = useCityDetection();
  const [locationRequested, setLocationRequested] = useState(false);

  const handleCityClick = () => {
    if (!city || city === 'Москва') return;
    
    if (coordinates) {
      window.open(`https://yandex.ru/maps/?pt=${coordinates[1]},${coordinates[0]}&z=12&l=map`, '_blank');
    } else {
      window.open(`https://yandex.ru/maps/?text=${encodeURIComponent(city)}`, '_blank');
    }
  };

  const handleDetectLocation = () => {
    setLocationRequested(true);
    detectCity();
  };

  return (
    <div className={styles.cityContainer}>
      {!locationRequested ? (
        <button 
          onClick={handleDetectLocation}
          className={styles.detectButton}
          title="Определить мой город автоматически"
        >
          Определить мой город
        </button>
      ) : isLoading ? (
        <span>Определение...</span>
      ) : error ? (
        <div>
          <span title={error} className={styles.cityError}>
            {city}
          </span>
          <button 
            onClick={handleDetectLocation}
            className={styles.retryButton}
            title="Попробовать снова"
          >
            ↻
          </button>
        </div>
      ) : (
        <span 
          className={`${styles.city} ${styles.clickableCity}`} 
          onClick={handleCityClick}
          title="Открыть на карте"
        >
          {city}
        </span>
      )}
    </div>
  );
};