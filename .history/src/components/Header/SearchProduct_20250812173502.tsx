"use client"
import { useState } from 'react'

import styles from '@/styles/header.module.scss'

export const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    console.log("searchQuery:", searchQuery)
  }

  const handleClear = () => {
    setSearchQuery('')
  }
  return (
    <div className={styles.search}>
      <input
        onChange={handleInput}
        value={searchQuery}
        type="text"
        className={styles.search__input}
        placeholder="Найти на ShopOnline"
      />
      <svg className={styles.search__icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="#a9a8b0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
          </path>
        </g>
      </svg>
      <button
        onClick={handleClear}
        className={`btn-closed btn-reset ${styles['btn-closed--search']}`}>
      </button>
    </div>
  )
}

