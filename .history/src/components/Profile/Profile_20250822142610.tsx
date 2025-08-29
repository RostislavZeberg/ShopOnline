"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";
import styles from "./profile.module.scss";

interface UserData {
  email: string;
  password: string;
}

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isEnterLogIn = useAppSelector((state) => state.logInSlice.isEnterLogIn);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");

  // Получаем данные пользователя из localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        setFormData({
          email: parsedData.email,
          password: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    }
  }, []);

  // Если пользователь не авторизован, перенаправляем на главную
  useEffect(() => {
    if (!isEnterLogIn) {
      router.push("/");
    }
  }, [isEnterLogIn, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка на совпадение нового пароля и подтверждения
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Новый пароль и подтверждение не совпадают");
      return;
    }

    // Проверка текущего пароля
    if (formData.password !== userData?.password) {
      setMessage("Текущий пароль неверен");
      return;
    }

    // Обновляем данные пользователя
    const updatedUserData = {
      email: formData.email,
      password: formData.newPassword || formData.password
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    setIsEditing(false);
    setMessage("Данные успешно обновлены");
    
    // Сбрасываем сообщение через 3 секунды
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    dispatch(toggleEnterLogIn());
    router.push("/");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Вы уверены, что хотите удалить свой профиль? Это действие нельзя отменить.")) {
      localStorage.removeItem("userData");
      dispatch(toggleEnterLogIn());
      router.push("/");
    }
  };

  if (!isEnterLogIn) {
    return null; // или компонент загрузки
  }

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <h1 className={styles.title}>Профиль пользователя</h1>
        
        {message && <div className={styles.message}>{message}</div>}
        
        {!isEditing ? (
          <div className={styles.profileInfo}>
            <p><strong>Email:</strong> {userData?.email}</p>
            <div className={styles.actions}>
              <button 
                onClick={() => setIsEditing(true)}
                className={`btn-reset ${styles.btn} ${styles.editBtn}`}
              >
                Редактировать профиль
              </button>
              <button 
                onClick={handleLogout}
                className={`btn-reset ${styles.btn} ${styles.logoutBtn}`}
              >
                Выйти из профиля
              </button>
              <button 
                onClick={handleDeleteAccount}
                className={`btn-reset ${styles.btn} ${styles.deleteBtn}`}
              >
                Удалить профиль
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.editForm} onSubmit={handleSaveChanges}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password">Текущий пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">Новый пароль (оставьте пустым, если не хотите менять):</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Подтверждение нового пароля:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="submit"
                className={`btn-reset ${styles.btn} ${styles.saveBtn}`}
              >
                Сохранить изменения
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className={`btn-reset ${styles.btn} ${styles.cancelBtn}`}
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}