"use client"
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { toggleAuthForm } from "@/store/slices/authFormSlice";
import { toggleBackground } from "@/store/slices/backgroundSlice";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import styles from "./autorisation.module.scss"

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const isAuthForm = useSelector((state: RootState) => state.authFormSlice.isAuthForm);
  const [authType, setAuthType] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFormChange = () => {
    // Запускаем анимацию переворота
    setIsFlipped(true);
    
    // После завершения анимации меняем форму
    setTimeout(() => {
      setAuthType(!authType);
      setIsFlipped(false);
    }, 300); // Длительность должна совпадать с длительностью анимации CSS
  };

  if (!isAuthForm) return null;

  return (
    <div className={styles.autorisation}>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--autorisation']}`}
        onClick={() => {
          dispatch(toggleAuthForm())
          dispatch(toggleBackground())
        }}
        aria-label="Закрыть форму">
      </button>
      <div className={styles['logo-modal']}></div>
      
      <div className={`${styles['form-container']} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles['form-inner']}>
          {authType ? (
            <LoginForm setAuthType={handleFormChange} />
          ) : (
            <RegisterForm setAuthType={handleFormChange} />
          )}
        </div>
      </div>
    </div>
  )
}