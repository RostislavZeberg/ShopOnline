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

  const [authType, setAuthType] = useState<string>("register");
  const [vestibuleView, setVestibuleView] = useState(false);

  const handlerBtnCloseModal = () => {
    setModalActive(false);
    setAuthType("register");
  };

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register"
    );
  };

  const handlerVestibule = () => {
    setAuthType("register");
    setVestibuleView(false);
  };

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
      <div className="auth-form" style={{ width: "fit-content" }}>
        <div className="logo-modal"></div>
        {authType === "register" ? (
          <LoginForm />
        ) : (
          <RegisterForm setVestibuleView={setVestibuleView} />
        )}
        <div className="auth-form__info">
          <button className="btn-reset btn-change" onClick={handleClick}>
            {authType === "register" ? "Регистрация" : "У меня есть пароль"}
          </button>
        </div>
        <div
          className={
            vestibuleView ? "auth-form__vestibule vestibule" : "vestibule-none"
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
        <button
          onClick={handlerBtnCloseModal}
          className="modal__close btn-reset"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}