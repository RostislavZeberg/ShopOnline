"use client"
import { useCityDetection } from "@/hooks/useCityDetection";
import { useState } from 'react';
import styles from './header.module.scss'

export const YourCity = () => {
  const { city, error, isLoading } = useCityDetection();
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const handleCityClick = () => {
    if (!city || city === 'Определение...') return;
    
    // Если есть координаты - используем их
    if (coordinates) {
      window.open(`https://yandex.ru/maps/?pt=${coordinates[1]},${coordinates[0]}&z=12&l=map`, '_blank');
    } else {
      // Иначе ищем по названию города
      window.open(`https://yandex.ru/maps/?text=${encodeURIComponent(city)}`, '_blank');
    }
  };

  return (
    <>
      {isLoading ? (
        <span>Определение...</span>
      ) : error ? (
        <span title={error} onClick={handleCityClick} className={styles.clickableCity}>
          {city}
        </span>
      ) : (
        <span className={`${styles.city} ${styles.clickableCity}`} onClick={handleCityClick}>
          {city}
        </span>
      )}
    </>
  );
}