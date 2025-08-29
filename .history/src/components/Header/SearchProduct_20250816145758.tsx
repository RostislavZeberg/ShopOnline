"use client"
import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '@/store/slices/filterSlice'
import { applyFilters } from '@/store/slices/productsSlice'
import { RootState } from '@/store/store'

export const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const dispatch = useDispatch()
  // Получаем текущие фильтры из хранилища
  const filters = useSelector((state: RootState) => state.filterSlice)

  useEffect(() => {
    // Обновляем только поле title в фильтрах
    const newFilters = { ...filters, title: debouncedSearchQuery }
    dispatch(setFilters(newFilters))
    dispatch(applyFilters(newFilters))
  }, [debouncedSearchQuery, dispatch, filters])
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleClear = useCallback(() => {
    setSearchQuery('')
    // При очистке создаем новый объект фильтров, где title = '', но остальные поля как были
    const newFilters = { ...filters, title: '' }
    dispatch(setFilters(newFilters))
    dispatch(applyFilters(newFilters))
  }, [dispatch, filters])

  return (
    <div className={styles.search} role="search">
      <input
        onChange={handleInput}
        value={searchQuery}
        name="title"
        type="text"
        className={styles.search__input}
        placeholder="Найти на ShopOnline"
        aria-label="Поиск товаров"
      />
      <svg
        className={styles.search__icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {searchQuery && (
        <button
          onClick={handleClear}
          className={`btn-closed btn-reset ${styles['btn-closed--search']}`}
          aria-label="Очистить поиск"
        >
        </button>
      )}
    </div>
  )
}