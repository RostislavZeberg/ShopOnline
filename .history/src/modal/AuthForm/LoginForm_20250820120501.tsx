import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useLocalStorageAccount } from "@/hooks/useLocalStorageAccount";
import { RegistrationFormData, registrationSchema } from "@/utils/validationRegisterSchema";
import { FC } from 'react';

interface RegisterFormProps {
  setAuthType: (authType: boolean) => void;
}

export const LoginForm: FC<RegisterFormProps> = ({ setAuthType }) => {
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