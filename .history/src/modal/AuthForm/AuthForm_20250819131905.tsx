"use client"
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { RegisterForm } from "./RegisterForm";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";
import { useAppDispatch } from "@/store/hooks";
import { toggleAuthForm } from "@/store/slices/authFormSlice";
import styles from "./autorisieren.module.scss"
import { toggleBackground } from "@/store/slices/backgroundSlice";
import { LoginForm } from "./LoginForm";
import { Button } from "@/components/Button/Button";
import { boolean } from "zod";

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const isAuthForm = useSelector((state: RootState) => state.authFormSlice.isAuthForm);
  const [isAutorisieren, setIsAutorisieren] = useState(false)
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice.isEnterLogIn);

  const [authType, setAuthType] = useState(false);

  const handleAuthForm = () => {
    dispatch(toggleEnterLogIn())
  }

  const handleIsAutorisieren = () => {
    setIsAutorisieren(false);
  };

  if (!isAuthForm) return null;

  return (
    <div className={styles.autorisieren}>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--autorisieren']}`}
        onClick={() => {
          dispatch(toggleAuthForm())
          dispatch(toggleBackground())
        }}
        aria-label="Закрыть форму">
      </button>
      <div className={styles['logo-modal']}></div>
      {authType ? (
        <LoginForm setIsAutorisieren={setIsAutorisieren} />
      ) : (
        <RegisterForm setIsAutorisieren={setAuthType} />
      )}
      <div className="autorisieren__btn-block">

      </div>
    </div>
  )
}