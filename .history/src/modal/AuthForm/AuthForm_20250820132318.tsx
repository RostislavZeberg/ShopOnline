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
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFormChange = () => {
    // Запускаем анимацию переворота
    setIsFlipping(true);
    
    // После завершения анимации меняем форму
    // setTimeout(() => {
    //   setAuthType(!authType);
    //   setIsFlipping(false);
    // }, 500); // Длительность должна совпадать с длительностью анимации CSS
  };

  const closeForm = () => {
    dispatch(toggleAuthForm());
    dispatch(toggleBackground());
  };

  if (!isAuthForm) return null;

  return (
    <div className={`${styles.autorisation} ${isFlipping ? styles.flipping : ''}`}>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--autorisation']}`}
        onClick={closeForm}
        aria-label="Закрыть форму">
      </button>
      <div className={styles['logo-modal']}></div>
      
      <div className={styles['form-container']}>
        <div className={`${styles['form-inner']} ${authType ? styles.flipped : ''}`}>
          <div className={styles.front}>
            <RegisterForm setAuthType={handleFormChange} />
          </div>
          <div className={styles.back}>
            <LoginForm setAuthType={handleFormChange} />
          </div>
        </div>
      </div>
    </div>
  )
}