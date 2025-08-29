"use client"
import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleBurger } from '@/store/slices/burgerSlice';
import { RootState } from '@/store/store';
import styles from '@/styles/header.module.scss'

type FormFields = 'Наименование' | 'Категория' | 'Цвет';

export const SearchProductDetailed = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    Наименование: '',
    Категория: '',
    Цвет: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in values) {
      setValues({
        ...values,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    console.log('Форма отправлена:', values);
  };

  const handleReset = () => {
    setValues({
      Наименование: '',
      Категория: '',
      Цвет: ''
    });
  };

  return (
    <form
      className={styles['search-detailed']}
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--search-detailed']}`}
        onClick={() => dispatch(toggleBurger())}
        aria-label="Закрыть форму"
      >
      </button>

      {(['Наименование', 'Категория', 'Цвет'] as const).map((title) => {
        const fieldName = `field${title}` as FormFields;
        return (
          <label key={title} htmlFor={`search-field-${title}`} className={styles.label}>
            <span className={styles.labelText}>{title}</span>
            <input
              id={`search-field-${title}`}
              name={fieldName}
              type="text"
              value={values[fieldName]}
              onChange={handleChange}
              className={styles.input}
              placeholder={`Введите ${title.toLowerCase()} товара`}
            />
          </label>
        );
      })}

      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!values.Наименование && !values.Категория && !values.Цвет}
          aria-label="Найти товар"
        >
          Поиск
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          disabled={!values.Наименование && !values.Категория && !values.Цвет}
          aria-label="Очистить форму"
        >
          Очистить
        </button>
      </div>
    </form>
  );
};