import React from 'react';
import { useSelector } from 'react-redux';

import Logo from '/public/logo.svg';
// import { BtnBurger } from '../BtnBurger';
// import { SearchProduct } from '../SearchProduct';
// import { HeaderNav } from '../HeaderNav';
// import type { RootState } from '../../store/store';
// import { SearchProductDetailed } from '../../modal/SearchProductDetailed';
import Link from 'next/link';
import { YourCity } from './YourCity';
import { CurrencySelection } from './CurrencySelection';

export const Header: React.FC = () => {

  // const isOpenSearchDetailed = useSelector((state: RootState) => state.burger.isOpenSearchDetailed);

  return (
    <header className="header">
      <div className="container">
        <div className="header__top top">
          <YourCity />
          <CurrencySelection />
        </div>
        <div className="header__bottom bottom">
          <Link href={'/'} className="header__logo">
            <img src="/logo.svg" alt="Логотип" className="logo" />
          </Link>
          {/* <BtnBurger />
          <SearchProduct />
          <HeaderNav /> */}
        </div>
        {/* {isOpenSearchDetailed && <SearchProductDetailed />} */}
      </div>
    </header>
  );
};