import { useState } from 'react';

import { getCityFromCoordinates } from '@/utils/getCityFromCoordinates';

export const useCityDetection = (defaultCity = 'Москва') => {
  const [city, setCity] = useState<string>(defaultCity);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const detectCity = async () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается браузером');
      setIsLoading(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const detectedCity = await getCityFromCoordinates(latitude, longitude, defaultCity);

      setCity(detectedCity);
      setCoordinates([longitude, latitude]);
    } catch (err) {
      console.error('Ошибка геолокации:', err);
      let errorMessage = 'Не удалось определить местоположение';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setError(errorMessage);
      setCity(defaultCity);
    } finally {
      setIsLoading(false);
    }
  };

  return { city, error, isLoading, coordinates, detectCity };
};
