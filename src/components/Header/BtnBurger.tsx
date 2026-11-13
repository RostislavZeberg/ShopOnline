// src/components/Header/BtnBurger.tsx
import React from 'react';
import styles from './header.module.scss';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export const BtnBurger: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <button
      type="button"
      className={styles.burger}
      onClick={onClick}
      aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={isOpen}
      aria-controls="header-nav"
      data-active={isOpen}
    >
      <span className={styles.burger__line} />
      <span className={styles.burger__line} />
      <span className={styles.burger__line} />
    </button>
  );
};