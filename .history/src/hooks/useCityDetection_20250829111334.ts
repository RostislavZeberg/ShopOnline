import { useState, useEffect } from 'react';

export const useCityDetection = (defaultCity = 'Москва') => {
  const [city, setCity] = useState<string>('Определение...');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    const getCityFromCoordinates = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        setCoordinates([lon, lat]); // Сохраняем координаты [долгота, широта]
        return data.address?.city || data.address?.town || data.address?.village || defaultCity;
      } catch (err) {
        console.error('Ошибка при получении города:', err);
        return defaultCity;
      }
    };

    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const detectedCity = await getCityFromCoordinates(latitude, longitude);
              setCity(detectedCity);
            } catch {
              setError('Ошибка определения города');
              setCity(defaultCity);
            } finally {
              setIsLoading(false);
            }
          },
          (error) => {
            console.error('Ошибка геолокации:', error);
            setError('Не удалось определить местоположение');
            setCity(defaultCity);
            setIsLoading(false);
          }
        );
      } else {
        setError('Геолокация не поддерживается браузером');
        setCity(defaultCity);
        setIsLoading(false);
      }
    };

    detectLocation();
  }, [defaultCity]);

  return { city, error, isLoading, coordinates };
};