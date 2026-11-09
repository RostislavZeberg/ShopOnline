// src\components\Profile\PaymentMethods.tsx
"use client";

import { useState } from "react";
import styles from "./profile.module.scss";

interface PaymentCard {
  id: string;
  lastFourDigits: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

interface PaymentMethodsProps {
  cards: PaymentCard[];
  onAddCard: (card: Omit<PaymentCard, 'id'>) => void;
  onDeleteCard: (id: string) => void;
  onSetDefaultCard: (id: string) => void;
}

export const PaymentMethods = ({ 
  cards, 
  onAddCard, 
  onDeleteCard,
  onSetDefaultCard 
}: PaymentMethodsProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Очистка ошибки при изменении
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCardNumber = (number: string) => {
    // Упрощенная валидация Luhn algorithm
    const cleaned = number.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleaned)) return "Номер карты должен содержать 16 цифр";
    return "";
  };

  const validateExpiryDate = (date: string) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) return "Формат: ММ/ГГ";
    
    const [month, year] = date.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) return "Неверный месяц";
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Карта просрочена";
    }
    
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      cardNumber: validateCardNumber(formData.cardNumber),
      expiryDate: validateExpiryDate(formData.expiryDate),
      cvv: formData.cvv.length === 3 ? "" : "CVV должен содержать 3 цифры",
      cardHolder: formData.cardHolder.trim() ? "" : "Введите имя владельца"
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    // Форматирование номера карты для хранения
    const lastFourDigits = formData.cardNumber.slice(-4);
    const brand = detectCardBrand(formData.cardNumber);
    
    onAddCard({
      lastFourDigits,
      brand,
      expiryDate: formData.expiryDate,
      isDefault: formData.isDefault || cards.length === 0
    });
    
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false
    });
    setShowAddForm(false);
  };

  const detectCardBrand = (cardNumber: string): string => {
    const firstTwo = cardNumber.slice(0, 2);
    const firstFour = cardNumber.slice(0, 4);
    
    if (/^4/.test(cardNumber)) return "Visa";
    if (/^5[1-5]/.test(cardNumber)) return "MasterCard";
    if (/^2/.test(cardNumber)) return "Mir";
    if (firstTwo === "34" || firstTwo === "37") return "American Express";
    if (firstFour === "6011") return "Discover";
    
    return "Card";
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  return (
    <div className={styles.paymentMethods}>
      <div className={styles.sectionHeader}>
        <h2>Способы оплаты</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className={`btn-reset ${styles.btn} ${styles.addBtn}`}
        >
          + Добавить карту
        </button>
      </div>

      {showAddForm && (
        <form className={styles.cardForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Номер карты</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formatCardNumber(formData.cardNumber)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\s+/g, '');
                  setFormData(prev => ({ ...prev, cardNumber: raw }));
                }}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
              />
              {errors.cardNumber && (
                <span className={styles.error}>{errors.cardNumber}</span>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="cardHolder">Имя владельца</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder="IVAN IVANOV"
              />
              {errors.cardHolder && (
                <span className={styles.error}>{errors.cardHolder}</span>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="expiryDate">Срок действия</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length === 2 && !value.includes('/')) {
                    value += '/';
                  }
                  setFormData(prev => ({ ...prev, expiryDate: value }));
                }}
                placeholder="ММ/ГГ"
                maxLength={5}
              />
              {errors.expiryDate && (
                <span className={styles.error}>{errors.expiryDate}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={3}
              />
              {errors.cvv && (
                <span className={styles.error}>{errors.cvv}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
              />
              Сделать картой по умолчанию
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={`btn-reset ${styles.btn} ${styles.saveBtn}`}>
              Сохранить карту
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className={`btn-reset ${styles.btn} ${styles.cancelBtn}`}
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      <div className={styles.cardsList}>
        {cards.length === 0 ? (
          <p className={styles.emptyMessage}>Нет сохраненных карт</p>
        ) : (
          cards.map(card => (
            <div key={card.id} className={`${styles.cardItem} ${card.isDefault ? styles.defaultCard : ''}`}>
              <div className={styles.cardInfo}>
                <div className={styles.cardBrand}>{card.brand}</div>
                <div className={styles.cardNumber}>•••• {card.lastFourDigits}</div>
                <div className={styles.cardExpiry}>Срок: {card.expiryDate}</div>
                {card.isDefault && (
                  <span className={styles.defaultBadge}>По умолчанию</span>
                )}
              </div>
              <div className={styles.cardActions}>
                {!card.isDefault && (
                  <button
                    onClick={() => onSetDefaultCard(card.id)}
                    className={`btn-reset ${styles.btn} ${styles.setDefaultBtn}`}
                  >
                    Сделать основной
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm("Удалить эту карту?")) {
                      onDeleteCard(card.id);
                    }
                  }}
                  className={`btn-reset ${styles.btn} ${styles.deleteBtn}`}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};