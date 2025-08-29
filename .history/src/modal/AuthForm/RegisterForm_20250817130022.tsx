import React, { type FC } from 'react';
import { IMaskInput } from 'react-imask';

import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useRegisterLocalStorage } from '@/hooks/useRegisterLocalStorage';
import { RegistrationFormData, registrationSchema } from '@/utils/validationRegisterSchema';




interface RegisterFormProps {
  setIsAutorisieren: (isAutorisieren: boolean) => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ setIsAutorisieren }) => {
  const { formData, errors, handleChange, validateForm } = useRegisterForm<RegistrationFormData>(
    {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    registrationSchema
  );

  const [, setUserData] = useRegisterLocalStorage<RegistrationFormData>('userData', {
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
    }
  };

  const handleIsAutorisieren = () => {
    setIsAutorisieren(false);
  };

  return (
    <form className="autorisieren__block autorisieren__registration registration" onSubmit={handleSubmit}>
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
          onChange={handleChange}
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
          autoComplete="email" // Исправлено
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
      <div className="autorisieren__btn-block">
        <button type="submit">Зарегистрироваться</button>
        <button onClick={handleIsAutorisieren} type="button" className="btn-reset">
          У меня есть аккаунт
        </button>
      </div>
    </form>
  );
}