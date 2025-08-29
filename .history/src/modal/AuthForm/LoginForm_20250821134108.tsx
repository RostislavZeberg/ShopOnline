import { FC, useState } from 'react';

import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useLocalStorageAccount } from "@/hooks/useLocalStorageAccount";
import { LoginFormData, loginSchema } from "@/utils/validationAccountSchema";
import { useAppDispatch } from '@/store/hooks';
import { toggleAuthForm } from '@/store/slices/authFormSlice';
import { toggleBackground } from '@/store/slices/backgroundSlice';
import { toggleEnterLogIn } from '@/store/slices/logInSlice';
import styles from "./autorisation.module.scss"

interface LoginFormProps {
  setAuthType: (authType: boolean) => void;
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

interface UserData {
  email: string;
  password: string;
}

export const LoginForm: FC<LoginFormProps> = ({ setAuthType }) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { formData, errors, handleChange, validateForm } = useRegisterForm<LoginFormData>(
    initialFormData,
    loginSchema
  );

  const [userData] = useLocalStorageAccount<UserData | null>('userData', null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (userData && formData.email === userData.email && formData.password === userData.password) {
        dispatch(toggleAuthForm())
        dispatch(toggleBackground())
        dispatch(toggleEnterLogIn())
      }
    }
  };

  return (
    <form className={`${styles.login} ${styles['autorisation__form']}`} onSubmit={handleSubmit}>
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
      <div className='registration__item' style={{ position: 'relative' }}>
        <input
          className='registration__input'
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
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <div className="autorisieren__btn-block">
        <button
          type="submit"
          className="btn btn-reset"
        >
          Войти
        </button>
        <button
          onClick={() => setAuthType(false)}
          type="submit"
          className="btn btn-reset"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  )
}