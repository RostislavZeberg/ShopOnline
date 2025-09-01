export const getCityFromCoordinates = async (lat: number, lon: number, defaultCity: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village || defaultCity;
  } catch (err) {
    console.error('Ошибка при получении города:', err);
    return defaultCity;
  }
};