// src\components\Profile\UserPreferences.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./profile.module.scss";

export const UserPreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    language: "ru",
    currency: "RUB",
    theme: "light"
  });

  useEffect(() => {
    const saved = localStorage.getItem("userPreferences");
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key: keyof typeof preferences) => {
    if (typeof preferences[key] === "boolean") {
      const updated = { ...preferences, [key]: !preferences[key] };
      setPreferences(updated);
      localStorage.setItem("userPreferences", JSON.stringify(updated));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...preferences, [name]: value };
    setPreferences(updated);
    localStorage.setItem("userPreferences", JSON.stringify(updated));
  };

  return (
    <div className={styles.userPreferences}>
      <h2>Настройки</h2>
      
      <div className={styles.preferencesSection}>
        <h3>Уведомления</h3>
        
        <div className={styles.preferenceItem}>
          <div>
            <h4>Email уведомления</h4>
            <p>Получать уведомления о заказах на email</p>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        
        <div className={styles.preferenceItem}>
          <div>
            <h4>SMS уведомления</h4>
            <p>Получать SMS о статусе доставки</p>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={preferences.smsNotifications}
              onChange={() => handleToggle("smsNotifications")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        
        <div className={styles.preferenceItem}>
          <div>
            <h4>Рекламные рассылки</h4>
            <p>Получать информацию о скидках и акциях</p>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={preferences.marketingEmails}
              onChange={() => handleToggle("marketingEmails")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
      
      <div className={styles.preferencesSection}>
        <h3>Язык и валюта</h3>
        
        <div className={styles.formGroup}>
          <label htmlFor="language">Язык интерфейса</label>
          <select
            id="language"
            name="language"
            value={preferences.language}
            onChange={handleSelectChange}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="currency">Валюта</label>
          <select
            id="currency"
            name="currency"
            value={preferences.currency}
            onChange={handleSelectChange}
          >
            <option value="RUB">Рубли (₽)</option>
            <option value="USD">Доллары ($)</option>
            <option value="EUR">Евро (€)</option>
          </select>
        </div>
      </div>
      
      <div className={styles.preferencesSection}>
        <h3>Внешний вид</h3>
        
        <div className={styles.themeSelector}>
          <button
            className={`${styles.themeOption} ${preferences.theme === "light" ? styles.active : ""}`}
            onClick={() => {
              const updated = { ...preferences, theme: "light" };
              setPreferences(updated);
              localStorage.setItem("userPreferences", JSON.stringify(updated));
            }}
          >
            <div className={styles.themeIcon}>☀️</div>
            <span>Светлая</span>
          </button>
          
          <button
            className={`${styles.themeOption} ${preferences.theme === "dark" ? styles.active : ""}`}
            onClick={() => {
              const updated = { ...preferences, theme: "dark" };
              setPreferences(updated);
              localStorage.setItem("userPreferences", JSON.stringify(updated));
            }}
          >
            <div className={styles.themeIcon}>🌙</div>
            <span>Темная</span>
          </button>
          
          <button
            className={`${styles.themeOption} ${preferences.theme === "auto" ? styles.active : ""}`}
            onClick={() => {
              const updated = { ...preferences, theme: "auto" };
              setPreferences(updated);
              localStorage.setItem("userPreferences", JSON.stringify(updated));
            }}
          >
            <div className={styles.themeIcon}>⚙️</div>
            <span>Авто</span>
          </button>
        </div>
      </div>
    </div>
  );
};