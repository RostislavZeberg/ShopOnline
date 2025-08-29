import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RootState } from '../../store/store';
import { toggleEnterLogIn } from '../../store/slices/logInSlice';
import { toggleBackground } from '../../store/slices/backgroundSlice';


export const HeaderNav = () => {
  const dispatch = useDispatch();
  const isEnterLogIn = useSelector((state: RootState) => state.logIn.isEnterLogIn);
  
  const toggleRegister = () => {
    dispatch(toggleEnterLogIn());
    dispatch(toggleBackground());
  }

  return (
    <nav className="header__nav nav">
      {isEnterLogIn &&
        <>
          <Link to="/" className="nav__link link">
            <span className="link__icon link__icon--favorites"></span>
            Избранные
          </Link>
          <Link to="/" className="nav__link link">
            <span className="link__icon link__icon--orders"></span>
            Заказы
          </Link>
        </>
      }
      <Link to="/" onClick={toggleRegister} className="nav__link link">
        <span className="link__icon link__icon--log-in"></span>
        {!isEnterLogIn ? 'Войти' : 'Профиль'}
      </Link>
      <Link to="/" className="nav__link link">
        <span className="link__icon link__icon--basket"></span>
        Корзина
      </Link>
    </nav>
  )
}