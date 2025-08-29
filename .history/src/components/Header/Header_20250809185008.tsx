import React from 'react';

import Link from 'next/link';
import { YourCity } from './YourCity';
import { CurrencySelection } from './CurrencySelection';
import { BtnBurger } from './BtnBurger';
import { SearchProduct } from './SearchProduct';

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
          <BtnBurger />
          <SearchProduct />
          <HeaderNav />
        </div>
        {/* {isOpenSearchDetailed && <SearchProductDetailed />} */}
      </div>
    </header>
  );
};