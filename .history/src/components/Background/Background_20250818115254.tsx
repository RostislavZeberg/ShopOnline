"use client"
import { RootState } from "@/store/store";

import { useSelector } from "react-redux";
import styles from "./background.module.scss";

  useEffect(() => {
    // Сохраняем исходное значение overflow
    const originalOverflow = document.body.style.overflow;
    if (isBackground) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isBackground]);

export const Background = () => {
  const isBackground = useSelector((state: RootState) => state.backgroundSlice.isBackground);

  if (!isBackground) return null;

  return (
    <div className={styles.background}></div>
  )
}