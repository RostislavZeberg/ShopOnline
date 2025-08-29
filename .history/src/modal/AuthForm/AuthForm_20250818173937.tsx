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

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const isAuthForm = useSelector((state: RootState) => state.authFormSlice.isAuthForm);
  const [isAutorisieren, setIsAutorisieren] = useState(false)
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice.isEnterLogIn);

  const [authType, setAuthType] = useState<string>("register");


  const handlerBtnCloseModal = () => {
    setAuthType("register");
  };

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register"
    );
  };

  const handlerVestibule = () => {
    setAuthType("register");
    setIsAutorisieren(false);
  };

  const handleAuthForm = () => {
    dispatch(toggleEnterLogIn())
  }

  if (!isAuthForm) return null;

  return (
    <div className={styles.autorisieren}>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--autorisieren']}`}
        onClick={() => {
          dispatch(toggleAuthForm())
          dispatch(toggleBackground())
          handlerBtnCloseModal()
        }}
        aria-label="Закрыть форму">
      </button>
      <div className={styles['logo-modal']}></div>
      {authType === "register" ? (
        <LoginForm />
      ) : (
        <RegisterForm setIsAutorisieren={setIsAutorisieren} />
      )}
      <div className="auth-form__info">
        <button className="btn-reset btn-change" onClick={handleClick}>
          {authType === "register" ? "Регистрация" : "У меня есть пароль"}
        </button>
      </div>
      <div
        className={
          isAutorisieren ? "auth-form__vestibule vestibule" : "vestibule-none"
        }
      >
        <h4 className="vestibule__title">Регистрация завершена</h4>
        <p className="vestibule__descr">
          Используйте вашу электронную почту для входа
        </p>
        <Button
          className="auth-form__button btn-reset"
          onClick={handlerVestibule}
        >
          Войти
        </Button>
      </div>
      {/* <div className="auth-form" style={{ width: "fit-content" }}>
      </div> */}
    </div>
  )
}