"use client"
import { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleBurger } from '@/store/slices/burgerSlice';
import { setFilters } from '@/store/slices/filterSlice';
import { applyFilters } from '@/store/slices/productsSlice';
import { RootState } from '@/store/store';
import { getColors } from '@/services/api';
import { IColor } from '@/types/productsTypes';
import styles from './SearchProductDetailed.module.scss';

export const SearchProductDetailed = () => {
  const isOpenSearchDetailed = useSelector((state: RootState) => state.burgerSlice.isOpenSearchDetailed);
  const [colors, setColors] = useState<IColor[]>([]);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: '',
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleColorSelect = (selectedColor: string) => {
    setValues({
      ...values,
      color: values.color === selectedColor ? '' : selectedColor // Тогглим выбор
    });
  };
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const colorsList = await getColors();
        setColors(colorsList);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, [dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const filters = {
      title: values.title,
      categories: values.category ? [values.category] : [],
      colors: values.color ? [values.color] : [],
      price: {
        min: values.minPrice ? Number(values.minPrice) : 0,
        max: values.maxPrice ? Number(values.maxPrice) : Infinity,
      }
    };

    dispatch(setFilters(filters));
    dispatch(applyFilters(filters));
  };

  const handleReset = () => {
    setValues({
      title: '',
      category: '',
      color: '',
      minPrice: '',
      maxPrice: '',
    });

    const resetFilters = {
      title: '',
      categories: [],
      colors: [],
      price: { min: 0, max: Infinity }
    };

    dispatch(setFilters(resetFilters));
    dispatch(applyFilters(resetFilters));
  };

  return (
    <form
      className={
        !isOpenSearchDetailed ?
          styles['search-detailed'] :
          styles['search-detailed--active']}
      onSubmit={handleSubmit}
    >
      <h2 className={styles['search-detailed__title']}>Детальный поиск товара</h2>
      <button
        type="button"
        className={`btn-closed btn-reset ${styles['btn-closed--search-detailed']}`}
        onClick={() => dispatch(toggleBurger())}
        aria-label="Закрыть форму"
      ></button>

      <label htmlFor="search-field-title" className={styles['search-detailed__label']}>
        <span className={styles['search-detailed__title--label']}>Наименование:</span>
        <input
          id="search-field-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          className={styles['search-detailed__input']}
          placeholder="Введите наименование товара"
        />
      </label>

      <label htmlFor="search-field-category" className={styles['search-detailed__label']}>
        <span className={styles['search-detailed__title--label']}>Категория:</span>
        <input
          id="search-field-category"
          name="category"
          type="text"
          value={values.category}
          onChange={handleChange}
          className={styles['search-detailed__input']}
          placeholder="Введите категорию товара"
        />
      </label>

      <div className={styles['search-detailed__label']}>
        <span className={styles['search-detailed__title--label']}>Цвет:</span>
        <div className={`${styles['search-detailed__colors']} color`}>
          {colors.map(color => (
            <button
              key={color.id}
              type="button"
              className={`${styles['color-box']} color__mark btn-reset ${values.color === color.title ? styles['selected'] : ''
                }`}
              style={{ backgroundColor: color.code }}
              onClick={() => handleColorSelect(color.title)}
              title={color.title}
              aria-label={`Выбрать цвет ${color.title}`}
            />
          ))}
        </div>
      </div>

      <div className={styles['search-detailed__price']}>
        <h3 className={styles['search-detailed__title--label']}>Цена товара</h3>
        <label htmlFor="price-min" className={styles['search-detailed__label']}>
          <span className={styles['search-detailed__title--label']}>Минимальная:</span>
          <input
            id="price-min"
            name="minPrice"
            type="number"
            min="0"
            value={values.minPrice}
            onChange={handleChange}
            className={styles['search-detailed__input--price']}
            placeholder="От"
          />
        </label>
        <label htmlFor="price-max" className={styles['search-detailed__label']}>
          <span className={styles['search-detailed__title--label']}>Максимальная:</span>
          <input
            id="price-max"
            name="maxPrice"
            type="number"
            min="0"
            value={values.maxPrice}
            onChange={handleChange}
            className={styles['search-detailed__input--price']}
            placeholder="До"
          />
        </label>
      </div>

      <div className={styles['search-detailed__btn']}>
        <button
          type="submit"
          className='btn btn-reset'
          aria-label="Найти товар"
          onClick={() => dispatch(toggleBurger())}
        >
          Поиск
        </button>
        <button
          type="button"
          className='btn btn-reset'
          onClick={handleReset}
          aria-label="Очистить форму"
        >
          Очистить
        </button>
        <button
          type="button"
          className={`${styles['btn-clean-out']} btn btn-reset`}
          onClick={handleReset}
          aria-label="Очистить форму"
        >
          Очистить
        </button>
      </div>
    </form>
  );
};