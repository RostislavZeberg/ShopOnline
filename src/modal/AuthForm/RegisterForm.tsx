// src\modal\AuthForm\RegisterForm.tsx
import React, { useState, type FC, useEffect } from 'react';
import { IMaskInput } from 'react-imask';

import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useLocalStorageAccount } from '@/hooks/useLocalStorageAccount';
import { RegistrationFormData, registrationSchema } from '@/utils/validationAccountSchema';
import { useAppDispatch } from '@/store/hooks';
import { toggleAuthForm } from '@/store/slices/authFormSlice';
import { toggleBackground } from '@/store/slices/backgroundSlice';
import { toggleEnterLogIn } from '@/store/slices/logInSlice';
import styles from "./autorisation.module.scss"

interface RegisterFormProps {
  setAuthType: (authType: boolean) => void;
}

// Начальные значения формы
const initialFormData: RegistrationFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegisterForm: FC<RegisterFormProps> = ({ setAuthType }) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { formData, errors, setFieldValue, handleChange, validateForm, setFormData } = useRegisterForm<RegistrationFormData>(
    initialFormData,
    registrationSchema
  );

  const [userData, setUserData] = useLocalStorageAccount<RegistrationFormData>('userData', {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Добавляем проверку на клиентскую сторону
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlerShowForm = () => {
    setAuthType(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setUserData(formData);
      alert('Регистрация прошла успешно!');
      dispatch(toggleAuthForm())
      dispatch(toggleBackground())
      dispatch(toggleEnterLogIn())
    }
  };

  // Обработчик для телефона с использованием IMaskInput
  const handlePhoneAccept = (value: string) => {
    setFieldValue('phone', value);
  };

  // Добавляем проверку типа и структуры данных
  const existingEmail = userData && typeof userData === 'object' && 'email' in userData
    ? userData.email
    : null;

  // Проверяем, что email не пустой и действительно существует
  if (isClient && existingEmail && formData.email && formData.email === existingEmail) {
    return (
      <div className={styles['btn-account']}>
        <p className="">Аккаунт с E-mail {existingEmail} существует</p>
        <button 
        onClick={handlerShowForm}
        className='btn btn-reset'>Войти в аккаунт</button>
        <button 
        onClick={() => {
          setFormData(prev => ({ ...prev, email: '' }));
        }}
        className='btn btn-reset'>
          Вернуться к регистрации
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Cоздать профиль</h2>
      <div className={styles['form__item']}>
        <input
          className={styles['form__input']}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Имя"
        />
        {errors.firstName && <p className='error-text'>{errors.firstName}</p>}
      </div>
      <div className={styles['form__item']}>
        <input
          className={styles['form__input']}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Фамилия"
        />
        {errors.lastName && <p className='error-text'>{errors.lastName}</p>}
      </div>
      <div className={styles['form__item']}>
        <IMaskInput
          className={styles['form__input']}
          mask="+7-000-000-0000"
          name="phone"
          value={formData.phone}
          onAccept={handlePhoneAccept}
          placeholder="Телефон"
        />
        {errors.phone && <p className='error-text'>{errors.phone}</p>}
      </div>
      <div className={styles['form__item']}>
        <input
          className={styles['form__input']}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}
      </div>
      <div className={styles['form__item']}>
        <input
          className={styles['form__input']}
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
          autoComplete="new-password"
          style={{ paddingRight: '40px' }}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '🙈' : '👁'}
        </span>
        {errors.password && <p className='error-text'>{errors.password}</p>}
      </div>
      <div className={styles['form__item']}>
        <input
          className={styles['form__input']}
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Повторите пароль"
          autoComplete="new-password"
          style={{ paddingRight: '40px' }}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? '🙈' : '👁'}
        </span>
        {errors.confirmPassword && <p className='error-text'>{errors.confirmPassword}</p>}
      </div>
      <div className={`${styles['form__item']} ${styles['form__btn-block']}`}>
        <button
          type="submit"
          className="btn btn-reset"
        >
          Зарегистрироваться
        </button>
        <button
          onClick={() => setAuthType(true)}
          type="button"
          className="btn btn-reset"
        >
          У меня есть аккаунт
        </button>
      </div>
    </form>
  );
}