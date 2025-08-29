"use client"
import { useCityDetection } from "@/hooks/useCityDetection";

export const YourCity = () => {
  const { city, error, isLoading } = useCityDetection();

  return (
    <>
      {isLoading ? (
            <span>Определение...</span>
          ) : error ? (
            <span title={error}>{city}</span>
          ) : (
            <span className='top__item city'>{city}</span>
          )}
    </>
  )
}