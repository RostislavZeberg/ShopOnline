"use client"
import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleBurger } from '@/store/slices/burgerSlice';
import styles from '@/styles/header.module.scss'
import { setFilters } from '@/store/slices/filterSlice';

export const SearchProductDetailed = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: '',
    category: '',
    color: '',
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name.includes('Price') ? Number(value) : value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({
      title: values.title,
      categories: values.category ? [values.category] : [],
      colors: values.color ? [values.color] : [],
      price: {
        min: values.minPrice || 0,
        max: values.maxPrice || Infinity,
      }
    }));
  };

  const handleReset = () => {
    setValues({
      title: '',
      category: '',
      color: '',
      minPrice: 0,
      maxPrice: 0,
    });
    dispatch(setFilters({
      title: '',
      categories: [],
      colors: [],
      price: { min: 0, max: Infinity }
    }));
  };

  return (
    <form className={styles['search-detailed']} onSubmit={handleSubmit}>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--search-detailed']}`}
        onClick={() => dispatch(toggleBurger())}
        aria-label="Закрыть форму"
      ></button>

      <label htmlFor="search-field-title" className={styles.label}>
        <span className={styles.labelText}>Наименование</span>
        <input
          id="search-field-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="Введите наименование товара"
        />
      </label>

      <label htmlFor="search-field-category" className={styles.label}>
        <span className={styles.labelText}>Категория</span>
        <input
          id="search-field-category"
          name="category"
          type="text"
          value={values.category}
          onChange={handleChange}
          className={styles.input}
          placeholder="Введите категорию товара"
        />
      </label>

      <label htmlFor="search-field-color" className={styles.label}>
        <span className={styles.labelText}>Цвет</span>
        <input
          id="search-field-color"
          name="color"
          type="text"
          value={values.color}
          onChange={handleChange}
          className={styles.input}
          placeholder="Введите цвет товара"
        />
      </label>

      <div className={styles.priceRange}>
        <label htmlFor="price-min" className={styles.label}>
          <span className={styles.labelText}>Минимальная цена</span>
          <input
            id="price-min"
            name="minPrice"
            type="number"
            min="0"
            value={values.minPrice}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label htmlFor="price-max" className={styles.label}>
          <span className={styles.labelText}>Максимальная цена</span>
          <input
            id="price-max"
            name="maxPrice"
            type="number"
            min="0"
            value={values.maxPrice}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!values.title && !values.category && !values.color && !values.minPrice && !values.maxPrice}
          aria-label="Найти товар"
        >
          Поиск
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          disabled={!values.title && !values.category && !values.color && !values.minPrice && !values.maxPrice}
          aria-label="Очистить форму"
        >
          Очистить
        </button>
      </div>
    </form>
  );
};