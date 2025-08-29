"use client"
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import type { RootState } from '../../store/store';
import { toggleEnterLogIn } from '../../store/slices/logInSlice';
import { toggleBackground } from '../../store/slices/backgroundSlice';
import styles from '@/styles/header.module.scss'

export const HeaderNav = () => {
  const dispatch = useDispatch();
  const isEnterLogIn = useSelector((state: RootState) => state.logIn.isEnterLogIn);
  
  const toggleRegister = () => {
    dispatch(toggleEnterLogIn());
    dispatch(toggleBackground());
  }

  return (
    <nav className={styles.nav}>
      {isEnterLogIn &&
        <>
          <Link href="/" className={styles.link}>
            <span className="link__icon link__icon--favorites"></span>
            Избранные
          </Link>
          <Link href="/" className={styles.link}>
            <span className="link__icon link__icon--orders"></span>
            Заказы
          </Link>
        </>
      }
      <Link href="/" onClick={toggleRegister} className="nav__link link">
        <span className="link__icon link__icon--log-in"></span>
        {!isEnterLogIn ? 'Войти' : 'Профиль'}
      </Link>
      <Link href="/" className="nav__link link">
        <span className="link__icon link__icon--basket"></span>
        Корзина
      </Link>
    </nav>
  )
}