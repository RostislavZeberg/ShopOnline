"use client"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

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
  const authFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthForm && authFormRef.current) {
      gsap.from(authFormRef.current, {
        delay: 0.2,
        duration: 1,
        opacity: 0,
        scale: 0.5,
      });
    }
  }, [isAuthForm]);

  if (!isAuthForm) return null;

  return (
      <div ref={authFormRef} className={styles.autorisation}>
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
        {authType ? (
          <LoginForm setAuthType={setAuthType} />
        ) : (
          <RegisterForm setAuthType={setAuthType} />
        )}
      </div>
  //   <div className="auth-wrapper">
  //   </div>
  )
}