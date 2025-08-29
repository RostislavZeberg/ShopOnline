"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { RegisterForm } from "./RegisterForm";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";
import styles from "./autorisieren.module.scss"

export const AuthForm = () => {  
  const dispatch = useDispatch();
  const [isAutorisieren, setIsAutorisieren] = useState(false)
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice);

  const handleAuthForm = () => {
    dispatch(toggleEnterLogIn())
  }

  return (
    <div className={styles.autorisieren}>
      <RegisterForm setIsAutorisieren={setIsAutorisieren} />
      <button onClick={handleAuthForm} type="submit" className={styles["autorisieren__btn"]}>
        BUTTON
      </button>
    </div>
  )
}