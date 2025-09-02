import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { YourCity } from './YourCity';
import { CurrencySelection } from './CurrencySelection';
import { BtnBurger } from './BtnBurger';
import { SearchProduct } from './SearchProduct';
import { HeaderNav } from './HeaderNav';
import { SearchProductDetailed } from '@/modal/SearchProductDetailed/SearchProductDetailed';
import styles from './header.module.scss'

export const Header: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Принудительно сообщаем браузеру, что ресурс используется
    if (logoRef.current) {
      // Это помогает браузеру понять, что ресурс был использован
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Как только логотип в зоне видимости, отключаем наблюдение
            observer.disconnect();
          }
        });
      });
      
      observer.observe(logoRef.current);
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.top}>
          <YourCity />
          <CurrencySelection />
        </div>
        <div className={styles.bottom}>
          <Link href={'/'} className="header__logo">
            <Image
              ref={logoRef}
              src="/logo.svg"
              alt="Логотип"
              priority
              width={230}
              height={32}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Link>
          <BtnBurger />
          <SearchProduct />
          <HeaderNav />
        </div>
        <SearchProductDetailed />
      </div>
    </header>
  );
};