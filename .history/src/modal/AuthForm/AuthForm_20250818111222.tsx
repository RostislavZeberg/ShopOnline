"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { RegisterForm } from "./RegisterForm";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";
import styles from "./autorisieren.module.scss"

export const AuthForm = () => {
  const isAuthForm = useSelector((state: RootState) => state.authFormSlice.isAuthForm);
  const dispatch = useDispatch();
  const [isAutorisieren, setIsAutorisieren] = useState(false)
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice.isEnterLogIn);

  const handleAuthForm = () => {
    dispatch(toggleEnterLogIn())
  }

  return (
    { isAuthForm &&
    <div className={styles.autorisieren}>
      <RegisterForm setIsAutorisieren={setIsAutorisieren} />
      <button onClick={handleAuthForm} type="submit" className={styles["autorisieren__btn"]}>
        BUTTON
      </button>
    </div>
    }
  )
}