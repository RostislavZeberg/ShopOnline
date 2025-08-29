"use client"
import { RootState } from "@/store/store";

import { useSelector } from "react-redux";
import styles from "./background.module.scss";

export const Background = () => {
  const isBackground = useSelector((state: RootState) => state.backgroundSlice.isBackground);

  if (!isBackground) return null;

  return (
    <div className="background"></div>
  )
}