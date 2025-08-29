"use client"
import { useCityDetection } from "@/hooks/useCityDetection";
import styles from '@/styles/header.module.scss'

export const YourCity = () => {
  const { city, error, isLoading } = useCityDetection();

  return (
    <>
      {isLoading ? (
        <span>Определение...</span>
      ) : error ? (
        <span title={error}>{city}</span>
      ) : (
        <span className={styles.city}>{city}</span>
      )}
    </>
  )
}