import styles from '@/styles/header.module.scss'
import { useState } from 'react';

export const SearchForm = () => {
  const [values, setValues] = useState({
    field1: '',
    field2: '',
    field3: ''
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className={styles['search-detailed']}>
      {[1, 2, 3].map((num) => (
        <label key={num} htmlFor={`search-field-${num}`} className={styles.label}>
          <span className={styles.labelText}>Поле {num}</span>
          <input
            id={`search-field-${num}`}
            name={`field${num}`}
            type="text"
            value={values[`field${num}`]}
            onChange={handleChange}
            className={styles.input}
            placeholder={`Введите данные ${num}`}
          />
        </label>
      ))}
    </form>
  );
};