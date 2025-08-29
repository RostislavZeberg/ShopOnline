import { IMaskInput } from 'react-imask';

import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useRegisterLocalStorage } from "@/hooks/useRegisterLocalStorage";
import { RegistrationFormData, registrationSchema } from "@/utils/validationRegisterSchema";
import { FC } from 'react';

interface RegisterFormProps {
  setIsAutorisieren: (isAutorisieren: boolean) => void;
}

export const LoginForm: FC<RegisterFormProps> = ({ setIsAutorisieren }) => {
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

  return (
    <form className="autorisieren__block autorisieren__registration registration" onSubmit={handleSubmit}>
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
    </form>
  )
}