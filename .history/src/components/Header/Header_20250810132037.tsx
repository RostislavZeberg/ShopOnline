import React from 'react';
import Link from 'next/link';

import { YourCity } from './YourCity';
import { CurrencySelection } from './CurrencySelection';
import { BtnBurger } from './BtnBurger';
import { SearchProduct } from './SearchProduct';
import { HeaderNav } from './HeaderNav';
import styles from '@/styles/header.module.scss'
import { OpenSearchDetailed } from './OpenSearchDetailed';

export const Header: React.FC = () => {

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
        <OpenSearchDetailed />
      </div>
    </header>
  );
};