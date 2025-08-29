import React from 'react';
import Link from 'next/link';

import { YourCity } from './YourCity';
import { CurrencySelection } from './CurrencySelection';
import { BtnBurger } from './BtnBurger';
import { SearchProduct } from './SearchProduct';
import { HeaderNav } from './HeaderNav';
import styles from '@/styles/header.module.scss'
import { useSelector } from 'react-redux';
import { SearchProductDetailed } from '@/modal/SearchProductDetailed';
import { RootState } from '@/store/store';

export const Header: React.FC = () => {

  const isOpenSearchDetailed = useSelector((state: RootState) => state.burger.isOpenSearchDetailed);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.top}>
          <YourCity />
          <CurrencySelection />
        </div>
        <div className={styles.bottom}>
          <Link href={'/'} className="header__logo">
            <img src="/logo.svg" alt="Логотип" className="logo" />
          </Link>
          <BtnBurger />
          <SearchProduct />
          <HeaderNav />
        </div>
        {isOpenSearchDetailed && <SearchProductDetailed />}
      </div>
    </header>
  );
};