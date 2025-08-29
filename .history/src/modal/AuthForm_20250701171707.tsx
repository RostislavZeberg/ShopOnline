import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import { toggleEnterLogIn } from "../../store/slices/logInSlice";
import { RegisterForm } from "../RegisterForm";

export const AuthForm = () => {
  const dispatch = useDispatch();

  const isEnterLogIn = useSelector((state: RootState) => state.logIn.isEnterLogIn);

  const handleAuthForm = () => {
    dispatch(toggleEnterLogIn())
  }
  return (
    <form className="autorisieren">
      <RegisterForm />
      <button onClick={handleAuthForm} type="submit" className="autorisieren__btn">
      </button>
    </form>
  )
}