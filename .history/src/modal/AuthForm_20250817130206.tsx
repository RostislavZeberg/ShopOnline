import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { RegisterForm } from "./RegisterForm";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";
import { useState } from "react";

export const AuthForm = () => {
  const dispatch = useDispatch();
  const [isAutorisieren, setIsAutorisieren] = useState(false)
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice);

  const handleAuthForm = () => {
    dispatch(toggleEnterLogIn())
  }
  return (
    <form className="">
      <RegisterForm setIsAutorisieren={setIsAutorisieren} />
      <button onClick={handleAuthForm} type="submit" className="">
        BUTTON
      </button>
    </form>
  )
}