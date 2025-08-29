"use client"
import { useSelector } from 'react-redux';
import Link from 'next/link';

import type { RootState } from '../../store/store';
import { toggleBackground } from '../../store/slices/backgroundSlice';
import { useAppDispatch } from '@/store/hooks';
import { toggleAuthForm } from '@/store/slices/authFormSlice';
import styles from './header.module.scss';

export const HeaderNav = () => {
  const dispatch = useAppDispatch();
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice.isEnterLogIn);

  const toggleRegister = () => {
    dispatch(toggleAuthForm())
    dispatch(toggleBackground());
  }

  return (
    <nav className={styles.nav}>
      {isEnterLogIn &&
        <>
          <Link href="/favorites" className={styles.link}>
            <span className={`${styles.link__icon} ${styles['link__icon--favorites']}`}></span>
            Избранные
          </Link>
          <Link href="/" className={styles.link}>
            <span className={`${styles.link__icon} ${styles['link__icon--orders']}`}></span>
            Заказы
          </Link>
        </>
      }
      {!isEnterLogIn ?
        <button onClick={toggleRegister} className={`${styles.link} btn-reset`}>
          <span className={`${styles.link__icon} ${styles['link__icon--log-in']}`}></span>
          Войти
        </button>
        :
        <Link href="/" className={styles.link}>
          <span className={`${styles.link__icon} ${styles['link__icon--log-in']}`}></span>
          Профиль
        </Link>
      }
      <Link href="/cart" className={styles.link}>
        <span className={`${styles.link__icon} ${styles['link__icon--basket']}`}>
          <span className={styles['count-products']}>2</span>
        </span>
        Корзина
      </Link>
    </nav>
  )
}