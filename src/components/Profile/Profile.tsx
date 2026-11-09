// src\components\Profile\Profile.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleEnterLogIn } from "@/store/slices/logInSlice";
import styles from "./profile.module.scss";
import { DeliveryAddresses } from "./DeliveryAddresses";
import { OrderHistory } from "./OrderHistory";
import { PaymentMethods } from "./PaymentMethods";
import { UserPreferences } from "./UserPreferences";

interface UserData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  avatar?: string;
}

interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface PaymentCard {
  id: string;
  lastFourDigits: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

export const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isEnterLogIn = useAppSelector((state) => state.logInSlice.isEnterLogIn);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  
  // Состояния для новых функций
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Получаем данные пользователя из localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      const storedAddresses = localStorage.getItem("userAddresses");
      const storedCards = localStorage.getItem("userPaymentCards");
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        setFormData({
          email: parsedData.email || "",
          password: "",
          name: parsedData.name || "",
          phone: parsedData.phone || "",
          newPassword: "",
          confirmPassword: ""
        });
      }
      
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      }
      
      if (storedCards) {
        setPaymentCards(JSON.parse(storedCards));
      }
      
      setIsLoading(false);
    }
  }, []);

  // Если пользователь не авторизован, перенаправляем на главную
  useEffect(() => {
    if (!isEnterLogIn && !isLoading) {
      router.push("/");
    }
  }, [isEnterLogIn, router, isLoading]);

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
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage("Новый пароль и подтверждение не совпадают");
      return;
    }

    // Проверка текущего пароля (если меняем пароль)
    if (formData.newPassword && formData.password !== userData?.password) {
      setMessage("Текущий пароль неверен");
      return;
    }

    // Обновляем данные пользователя
    const updatedUserData = {
      ...userData,
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
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
      localStorage.removeItem("userAddresses");
      localStorage.removeItem("userPaymentCards");
      dispatch(toggleEnterLogIn());
      router.push("/");
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = {
      ...address,
      id: Date.now().toString()
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
  };

  const updateAddress = (id: string, updatedAddress: Partial<Address>) => {
    const updatedAddresses = addresses.map(addr =>
      addr.id === id ? { ...addr, ...updatedAddress } : addr
    );
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
  };

  const deleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
  };

  const addPaymentCard = (card: Omit<PaymentCard, 'id'>) => {
    const newCard = {
      ...card,
      id: Date.now().toString()
    };
    const updatedCards = [...paymentCards, newCard];
    setPaymentCards(updatedCards);
    localStorage.setItem("userPaymentCards", JSON.stringify(updatedCards));
  };

  const deletePaymentCard = (id: string) => {
    const updatedCards = paymentCards.filter(card => card.id !== id);
    setPaymentCards(updatedCards);
    localStorage.setItem("userPaymentCards", JSON.stringify(updatedCards));
  };

  const setDefaultCard = (id: string) => {
    const updatedCards = paymentCards.map(card => ({
      ...card,
      isDefault: card.id === id
    }));
    setPaymentCards(updatedCards);
    localStorage.setItem("userPaymentCards", JSON.stringify(updatedCards));
  };

  if (!isEnterLogIn || isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return !isEditing ? (
          <div className={styles.profileInfo}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                {userData?.avatar ? (
                  <img src={userData.avatar} alt="Avatar" />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {userData?.name?.charAt(0) || userData?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2>{userData?.name || "Пользователь"}</h2>
                <p className={styles.email}>{userData?.email}</p>
              </div>
            </div>
            
            <div className={styles.profileDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Имя:</span>
                <span>{userData?.name || "Не указано"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email:</span>
                <span>{userData?.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Телефон:</span>
                <span>{userData?.phone || "Не указан"}</span>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button
                onClick={() => setIsEditing(true)}
                className={`btn-reset ${styles.btn} ${styles.editBtn}`}
              >
                Редактировать профиль
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.editForm} onSubmit={handleSaveChanges}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

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
              <label htmlFor="phone">Телефон:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Текущий пароль (требуется для изменений):</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword">Новый пароль:</label>
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
        );
        
      case "addresses":
        return (
          <DeliveryAddresses
            addresses={addresses}
            onAddAddress={addAddress}
            onUpdateAddress={updateAddress}
            onDeleteAddress={deleteAddress}
          />
        );
        
      case "payments":
        return (
          <PaymentMethods
            cards={paymentCards}
            onAddCard={addPaymentCard}
            onDeleteCard={deletePaymentCard}
            onSetDefaultCard={setDefaultCard}
          />
        );
        
      case "orders":
        return <OrderHistory />;
        
      case "preferences":
        return <UserPreferences />;
        
      default:
        return null;
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <h1 className={styles.title}>Личный кабинет</h1>

        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.profileLayout}>
          <div className={styles.sidebar}>
            <nav className={styles.nav}>
              <button
                className={`${styles.navButton} ${activeTab === "profile" ? styles.active : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <span className={styles.navIcon}>👤</span>
                Личные данные
              </button>
              
              <button
                className={`${styles.navButton} ${activeTab === "addresses" ? styles.active : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <span className={styles.navIcon}>📍</span>
                Адреса доставки
              </button>
              
              <button
                className={`${styles.navButton} ${activeTab === "payments" ? styles.active : ""}`}
                onClick={() => setActiveTab("payments")}
              >
                <span className={styles.navIcon}>💳</span>
                Способы оплаты
              </button>
              
              <button
                className={`${styles.navButton} ${activeTab === "orders" ? styles.active : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <span className={styles.navIcon}>📦</span>
                История заказов
              </button>
              
              <button
                className={`${styles.navButton} ${activeTab === "preferences" ? styles.active : ""}`}
                onClick={() => setActiveTab("preferences")}
              >
                <span className={styles.navIcon}>⚙️</span>
                Настройки
              </button>
              
              <div className={styles.navDivider}></div>
              
              <button
                className={`${styles.navButton} ${styles.logoutButton}`}
                onClick={handleLogout}
              >
                <span className={styles.navIcon}>🚪</span>
                Выйти
              </button>
              
              <button
                className={`${styles.navButton} ${styles.deleteButton}`}
                onClick={handleDeleteAccount}
              >
                <span className={styles.navIcon}>🗑️</span>
                Удалить аккаунт
              </button>
            </nav>
          </div>
          
          <div className={styles.content}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}