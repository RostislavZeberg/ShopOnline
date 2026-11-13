// src\components\Footer\Footer.tsx
"use client"; // Обязательно, так как используем useState

import { useState } from "react";
import styles from "./footer.module.scss";
import Link from "next/link";

export const Footer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const menuItems = [
    {
      title: "Покупателям",
      links: [
        "Частые вопросы",
        "Покупать как бизнес",
        "Юридическая информация",
        "Доставка по клику из пункта выдачи",
      ],
    },
    {
      title: "Продавцам и партнёрам",
      links: [
        "Продавать товары",
        "Открыть пункт выдачи",
        "Предложить помещение",
        "Развозить грузы",
        "Доставлять заказы",
      ],
    },
    {
      title: "Наши проекты",
      links: ["SO Guru", "SO Stream", "SO Track"],
    },
    {
      title: "Компания",
      links: [
        "О нас",
        "Пресс‑служба",
        "Контакты",
        "Вакансии",
        "Сообщить о мошенничестве",
        "Социальные сети",
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <ul className={`${styles["footer__top"]} list-reset`}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`${styles["footer__top-item"]} ${
                openIndex === index ? styles["footer__top-item--active"] : ""
              }`}
            >
              <h2
                className={styles["footer__top-item--title"]}
                onClick={() => toggleMenu(index)}
              >
                {item.title}
                {/* Стрелка */}
                <span className={styles["footer__top-item--arrow"]}>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="#242424"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </h2>

              <ul className={`${styles["footer__top-item--info"]} list-reset`}>
                {item.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className={styles["footer__top-item--descr"]}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className={styles["footer__bottom"]}>
          <p className={styles["footer__bottom-span"]}>
            <span>© ShopOnline 2004–2025.&nbsp;</span>
            <span>Все права защищены.</span>
          </p>
          <div className={styles.footer__social}>
            <div className={styles["footer__social-icon"]}>
              <Link
                href={"https://github.com/RostislavZeberg?tab=repositories"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer__social-icon--vk"]}
              ></Link>
            </div>
            <div className={styles["footer__social-icon"]}>
              <Link
                href={"https://github.com/RostislavZeberg?tab=repositories"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer__social-icon--ok"]}
              ></Link>
            </div>
            <div className={styles["footer__social-icon"]}>
              <Link
                href={"https://github.com/RostislavZeberg?tab=repositories"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer__social-icon--tg"]}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
