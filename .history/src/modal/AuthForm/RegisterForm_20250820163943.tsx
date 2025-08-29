import React, { useState, type FC } from 'react';
import { IMaskInput } from 'react-imask';

import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useLocalStorageAccount } from '@/hooks/useLocalStorageAccount';
import { RegistrationFormData, registrationSchema } from '@/utils/validationRegisterSchema';
import { useAppDispatch } from '@/store/hooks';
import { toggleAuthForm } from '@/store/slices/authFormSlice';
import { toggleBackground } from '@/store/slices/backgroundSlice';
import { toggleEnterLogIn } from '@/store/slices/logInSlice';
import styles from "./registration.module.scss"

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
  const [showForm, setShowForm] = useState(false)

  const { formData, errors, setFieldValue, handleChange, validateForm } = useRegisterForm<RegistrationFormData>(
    initialFormData,
    registrationSchema
  );

  const [, setUserData] = useLocalStorageAccount<RegistrationFormData>('userData', {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  const userDataStr = window.localStorage.getItem('userData');
  let userData = null;

  if (userDataStr) {
    try {
      userData = JSON.parse(userDataStr);
    } catch (error) {
      console.error("Ошибка при парсинге данных из localStorage:", error);
    }
  }

  if (formData.email === userData?.email || showForm) {
    return (
      <div className="">
        <p className="">Аккаунт с E-mail {userData?.email} существует</p>
        <button onClick={() => setAuthType(false)}>Войти в аккаунт</button>
        <button>Выйти</button>
      </div>
    )
  }

  return (
    <form className="autorisation__block autorisation__registration registration" onSubmit={handleSubmit}>
      <div className='registration__item'>
        <input
          className='registration__input'
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Имя"
        />
        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
      </div>
      <div className='registration__item'>
        <input
          className='registration__input'
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Фамилия"
        />
        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
      </div>
      <div className='registration__item'>
        <IMaskInput
          className='registration__input'
          mask="+7-000-000-0000"
          name="phone"
          value={formData.phone}
          onAccept={handlePhoneAccept}
          placeholder="Телефон"
        />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
      </div>
      <div className='registration__item'>
        <input
          className='registration__input'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div className='registration__item'>
        <input
          className='registration__input'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
          autoComplete="new-password"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <div className='registration__item'>
        <input
          className='registration__input'
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Повторите пароль"
          autoComplete="new-password"
        />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
      </div>
      <div className="autorisation__btn-block">
        <button
          type="submit"
        >
          Зарегистрироваться
        </button>
        <button
          onClick={() => setAuthType(true)}
          type="button"
          className="btn-reset"
        >
          У меня есть аккаунт
        </button>
      </div>
    </form>
  );
}