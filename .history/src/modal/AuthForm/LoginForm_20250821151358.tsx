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
  const [errorLogin, setErrorLogin] = useState(false)
  const [errorText, setErrorText] = useState('')
  const { formData, errors, handleChange, validateForm, resetForm } = useRegisterForm<LoginFormData>(
    initialFormData,
    loginSchema
  );

  const [userData] = useLocalStorageAccount<UserData | null>('userData', null);

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Проверяем существование пользователя и совпадение credentials
    if (!userData || formData.email !== userData.email || formData.password !== userData.password) {
      setErrorText('Неверный email или пароль');
      setErrorLogin(true);
      resetForm(); // Сбрасываем форму после ошибки
      setTimeout(() => setErrorLogin(false), 3000);
      return;
    }

    // Успешный вход
    dispatch(toggleAuthForm());
    dispatch(toggleBackground());
    dispatch(toggleEnterLogIn());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <div className={`${styles['form__item']} ${styles['form__btn-block']}`}>
        <button
          type="button"
          className="btn btn-reset"
        >
          Войти
        </button>
        <button
          onClick={() => setAuthType(false)}
          type="button"
          className="btn btn-reset"
        >
          Зарегистрироваться
        </button>
      </div>
      {errorLogin && <div className={styles.error}>{errorText}</div>}
    </form>
  )
}