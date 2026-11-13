// src/components/Header/Header.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { YourCity } from "./YourCity";
import { CurrencySelection } from "./CurrencySelection";
import { BtnBurger } from "./BtnBurger";
import { SearchProduct } from "./SearchProduct";
import { HeaderNav } from "./HeaderNav";
import { SearchProductDetailed } from "@/modal/SearchProductDetailed/SearchProductDetailed";
import styles from "./header.module.scss";
import { BtnBurgerSearch } from "./BtnBurgerSearch";

export const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNavOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (bottomRef.current && !bottomRef.current.contains(e.target as Node)) {
        setIsNavOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsNavOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isNavOpen]);

  const closeNav = useCallback(() => setIsNavOpen(false), []);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.top}>
          <YourCity />
          <CurrencySelection />
        </div>
        <div className={styles.bottom} ref={bottomRef}>
          <Link href="/" className={styles["header__logo"]}>
            <Image
              src="/logo.svg"
              alt="Логотип"
              priority
              fill
              style={{ objectFit: "contain" }}
            />
          </Link>
          <BtnBurgerSearch/>
          <SearchProduct />
          <HeaderNav isOpen={isNavOpen} onClose={closeNav} />
          <BtnBurger
            isOpen={isNavOpen}
            onClick={() => setIsNavOpen((v) => !v)}
          />
        </div>
        <SearchProductDetailed />
      </div>
    </header>
  );
};
