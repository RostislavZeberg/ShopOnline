import { FC } from 'react';

import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useLocalStorageAccount } from "@/hooks/useLocalStorageAccount";
import { RegistrationFormData, registrationSchema } from "@/utils/validationRegisterSchema";
import styles from "./registration.module.scss"

interface LoginFormProps {
  setAuthType: (authType: boolean) => void;
}

const initialFormData: RegistrationFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',

};

export const LoginForm: FC<LoginFormProps> = ({ setAuthType }) => {
    const { formData, errors, setFieldValue, handleChange, validateForm, setFormData } = useRegisterForm<RegistrationFormData>(
      initialFormData,
      registrationSchema
    );
  
  const [userData] = useLocalStorageAccount<RegistrationFormData>('userData', null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      <div className="autorisieren__btn-block">
        <button
          type="submit"
          className="btn-reset"
        >
          Войти
        </button>
        <button
          onClick={() => setAuthType(false)}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  )
}