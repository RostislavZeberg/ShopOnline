import styles from '@/styles/header.module.scss'
import { useState } from 'react';

type FormFields = 'field1' | 'field2' | 'field3';

export const SearchForm = () => {
  const [values, setValues] = useState({
    field1: '',
    field2: '',
    field3: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in values) { // Проверка типа
      setValues({
        ...values,
        [name]: value
      });
    }
  };

  return (
    <form className={styles['search-detailed']}>
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
    </form>
  );
};