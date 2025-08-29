"use client"
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { RegisterForm } from "./RegisterForm";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";
import { useAppDispatch } from "@/store/hooks";
import { toggleAuthForm } from "@/store/slices/authFormSlice";
import styles from "./autorisieren.module.scss"
import { backgroundSlice, toggleBackground } from "@/store/slices/backgroundSlice";

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const isAuthForm = useSelector((state: RootState) => state.authFormSlice.isAuthForm);
  const [isAutorisieren, setIsAutorisieren] = useState(false)
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice.isEnterLogIn);

  const handleAuthForm = () => {
    dispatch(toggleEnterLogIn())
  }

  if (!isAuthForm) return null;

  return (
    <div className={styles.autorisieren}>
      <RegisterForm setIsAutorisieren={setIsAutorisieren} />
      <button onClick={handleAuthForm} type="submit" className={styles["autorisieren__btn"]}>
        BUTTON
      </button>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--search-detailed']}`}
        onClick={() => {
          dispatch(toggleAuthForm())
          dispatch(toggleBackground())
        }}
        aria-label="Закрыть форму"
      ></button>
    </div>
  )
}