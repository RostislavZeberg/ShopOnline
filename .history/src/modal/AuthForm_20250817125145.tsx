import { useDispatch, useSelector } from "react-redux";


import { RootState } from "@/store/store";
import { RegisterForm } from "./RegisterForm";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";

export const AuthForm = () => {
  const dispatch = useDispatch();

  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice);

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