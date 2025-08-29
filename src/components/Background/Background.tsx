"use client"
import { RootState } from "@/store/store";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import styles from "./background.module.scss";

export const Background = () => {
  const isBackground = useSelector((state: RootState) => state.backgroundSlice.isBackground);

  useEffect(() => {
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

  if (!isBackground) return null;

  return (
    <div className={styles.background}></div>
  )
}