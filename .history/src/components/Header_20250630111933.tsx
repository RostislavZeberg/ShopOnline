import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../assets/images/logo.svg';
import { useCityDetection } from '../../hooks/useCityDetection';
import { useCurrencySelect } from '../../hooks/useCurrencySelect ';
import { BtnBurger } from '../BtnBurger';
import { SearchProduct } from '../SearchProduct';
import { HeaderNav } from '../HeaderNav';
import type { RootState } from '../../store/store';
import { SearchProductDetailed } from '../../modal/SearchProductDetailed';

export const Header: React.FC = () => {

  const { city, error, isLoading } = useCityDetection();
  const {
    selectedCurrency,
    isOpenCurrency,
    setIsOpenCurrency,
    handleSelect,
    currencies,
  } = useCurrencySelect('RUB');

  const isOpenSearchDetailed = useSelector((state: RootState) => state.burger.isOpenSearchDetailed);

  return (
    <div className="header">
      <div className="container">
        <div className="header__top top">
          {isLoading ? (
            <span>Определение...</span>
          ) : error ? (
            <span title={error}>{city}</span>
          ) : (
            <span className='top__item city'>{city}</span>
          )}
          <div className="top__item country">
            <div
              className="country__show show"
              onMouseEnter={() => setIsOpenCurrency(true)}
            >
              <img className='show__icon' src={`/images/icon_country-${selectedCurrency.code}.svg`} alt="Флаг страны" />
              <span className="show__code">{selectedCurrency.code}</span>
            </div>

            {isOpenCurrency && (
              <div
                className="country__list list"
                onMouseEnter={() => setIsOpenCurrency(true)}
                onMouseLeave={() => setIsOpenCurrency(false)}
              >
                <h2 className='list__title'>Валюта</h2>
                {currencies.map((currency) => (
                  <div
                    onClick={() => handleSelect(currency)}
                    className='list__item item'
                    key={currency.code}
                  >
                    <div className="item__block">
                      <img className='item__icon' src={`/images/icon_country-${currency.code}.svg`} alt="Флаг страны" />
                      <span className="item__code">{currency.code}</span>
                      <span className="item__name">{currency.name}</span>
                    </div>
                    <div className={selectedCurrency.code === currency.code ? "item__mark" : "item__mark-none"}>✓</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="header__bottom bottom">
          <Link to={'/'} className="header__logo">
            <img className="logo" src={logo} alt="Логотип" />
          </Link>
          <BtnBurger />
          <SearchProduct />
          <HeaderNav />
        </div>
        {isOpenSearchDetailed && <SearchProductDetailed />}
      </div>
    </div>
  );
};