"use client"
import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleBurger } from '@/store/slices/burgerSlice';
import { RootState } from '@/store/store';
import styles from '@/styles/header.module.scss'

type FormFields = 'field1' | 'field2' | 'field3';

export const SearchProductDetailed = () => {
  const dispatch = useDispatch();
  // const isOpenSearchDetailed = useSelector((state: RootState) => state.burgerSlice.isOpenSearchDetailed);
  const [values, setValues] = useState({
    field1: '',
    field2: '',
    field3: ''
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
      field1: '',
      field2: '',
      field3: ''
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

      {([1, 2, 3] as const).map((num) => {
        const fieldName = `field${num}` as FormFields;
        return (
          <label key={num} htmlFor={`search-field-${num}`} className={styles.label}>
            <span className={styles.labelText}>Поле {num}</span>
            <input
              id={`search-field-${num}`}
              name={fieldName}
              type="text"
              value={values[fieldName]}
              onChange={handleChange}
              className={styles.input}
              placeholder={`Введите данные ${num}`}
            />
          </label>
        );
      })}

      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!values.field1 && !values.field2 && !values.field3}
          aria-label="Найти товар"
        >
          Поиск
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          disabled={!values.field1 && !values.field2 && !values.field3}
          aria-label="Очистить форму"
        >
          Очистить
        </button>
      </div>
    </form>
  );
};