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
    Цвет: '',
    от: 0,
    до: 0,
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
      Цвет: '',
      от: 0,
      до: 0,
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

      <div className="">
        <label key='price-min' htmlFor='price-min' className={styles.label}>
          <span className={styles.labelText}>от</span>
          <input
            id='price-min'
            name='price-min'
            type="number"
            value={values['от']}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label key='price-min' htmlFor='price-min' className={styles.label}>
          <span className={styles.labelText}>от</span>
          <input
            id='price-min'
            name='price-min'
            type="number"
            value={values['до']}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
      </div>


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