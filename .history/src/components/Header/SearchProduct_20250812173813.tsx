"use client"
import { useState, useEffect, useCallback } from 'react'
import styles from '@/styles/header.module.scss'

export const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [displayValue, setDisplayValue] = useState('')

  // Debounce эффект для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== displayValue) {
        setDisplayValue(searchQuery)  
        console.log("Search for:", searchQuery)
      }
    }, 300) // 300ms задержка

    return () => clearTimeout(timer)
  }, [searchQuery, displayValue])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleClear = useCallback(() => {
    setSearchQuery('')
    setDisplayValue('')
  }, [])

  return (
    <div className={styles.search} role="search">
      <input
        onChange={handleInput}
        value={searchQuery}
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