"use client"
import Image from 'next/image';

import { useCurrencySelect } from '@/hooks/useCurrencySelect ';
import styles from './header.module.scss'

export const CurrencySelection = () => {
  const {
    selectedCurrency,
    isOpenCurrency,
    setIsOpenCurrency,
    handleSelect,
    currencies,
  } = useCurrencySelect();

  return (
    <div className={`${styles.top__item} ${styles.country}`}>
      <div
        className={styles.show}
        onMouseEnter={() => setIsOpenCurrency(true)}
      >
        <Image
          className={styles.show__icon}
          src={`/icon_country-${selectedCurrency.code}.svg`}
          alt="Флаг страны"
          width={24}
          height={24}
        />
        <span className={styles.show__code}>{selectedCurrency.code}</span>
      </div>

      {isOpenCurrency && (
        <div
          className={styles.list}
          onMouseEnter={() => setIsOpenCurrency(true)}
          onMouseLeave={() => setIsOpenCurrency(false)}
        >
          <h2 className={styles.list__title}>Валюта</h2>
          {currencies.map((currency) => (
            <div
              onClick={() => handleSelect(currency)}
              className={`${styles.item} ${selectedCurrency.code === currency.code ? styles.item__active : ''}`}
              key={currency.code}
            >
              <div className={styles.item__block}>
                <Image
                  className={styles.item__icon}
                  src={`/icon_country-${currency.code}.svg`}
                  alt="Флаг страны"
                  width={24}
                  height={24}
                />
                <span className={styles.item__code}>{currency.code}</span>
                <span className={styles.item__name}>{currency.name}</span>
              </div>
              <div className={selectedCurrency.code === currency.code ?
                `${styles.item__mark}` : `${styles['item__mark-none']}`}>✓</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}