"use client"
import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { toggleBurger } from '@/store/slices/burgerSlice';
import styles from '@/styles/header.module.scss'

export const SearchProductDetailed = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Здесь будет логика применения фильтров
    console.log('Применены фильтры:', filters);
  };

  const handleReset = () => {
    setFilters({
      name: '',
      category: '',
      color: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  const isFormEmpty = !filters.name && !filters.category && 
                     !filters.color && !filters.minPrice && !filters.maxPrice;

  return (
    <form className={styles['search-detailed']} onSubmit={handleSubmit}>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--search-detailed']}`}
        onClick={() => dispatch(toggleBurger())}
        aria-label="Закрыть форму"
      />

      <label htmlFor="search-field-name" className={styles.label}>
        <span className={styles.labelText}>Наименование</span>
        <input
          id="search-field-name"
          name="name"
          type="text"
          value={filters.name}
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
          value={filters.category}
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
          value={filters.color}
          onChange={handleChange}
          className={styles.input}
          placeholder="Введите цвет товара"
        />
      </label>

      <div className={styles.priceRange}>
        <label htmlFor="price-min" className={styles.label}>
          <span className={styles.labelText}>Цена от</span>
          <input
            id="price-min"
            name="minPrice"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        
        <label htmlFor="price-max" className={styles.label}>
          <span className={styles.labelText}>Цена до</span>
          <input
            id="price-max"
            name="maxPrice"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isFormEmpty}
          aria-label="Найти товар"
        >
          Поиск
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          disabled={isFormEmpty}
          aria-label="Очистить форму"
        >
          Очистить
        </button>
      </div>
    </form>
  );
};