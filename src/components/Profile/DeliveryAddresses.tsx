// src\components\Profile\DeliveryAddresses.tsx
"use client";

import { useState } from "react";
import styles from "./profile.module.scss";

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

interface DeliveryAddressesProps {
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onUpdateAddress: (id: string, address: Partial<Address>) => void;
  onDeleteAddress: (id: string) => void;
}

export const DeliveryAddresses = ({
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress
}: DeliveryAddressesProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    isDefault: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      onUpdateAddress(editingId, formData);
      setEditingId(null);
    } else {
      onAddAddress(formData);
    }
    
    setFormData({
      title: "",
      fullName: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      isDefault: false
    });
    setShowAddForm(false);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      title: address.title,
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      apartment: address.apartment || "",
      city: address.city,
      postalCode: address.postalCode,
      isDefault: address.isDefault
    });
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleSetDefault = (id: string) => {
    addresses.forEach(addr => {
      if (addr.id === id) {
        onUpdateAddress(id, { isDefault: true });
      } else if (addr.isDefault) {
        onUpdateAddress(addr.id, { isDefault: false });
      }
    });
  };

  return (
    <div className={styles.deliveryAddresses}>
      <div className={styles.sectionHeader}>
        <h2>Адреса доставки</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className={`btn-reset ${styles.btn} ${styles.addBtn}`}
        >
          + Добавить адрес
        </button>
      </div>

      {(showAddForm || editingId) && (
        <form className={styles.addressForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Название адреса (например: Дом, Работа)</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">ФИО</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Адрес</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Улица, дом"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="apartment">Квартира/Офис</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city">Город</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode">Индекс</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
              />
              Сделать адресом по умолчанию
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={`btn-reset ${styles.btn} ${styles.saveBtn}`}>
              {editingId ? "Обновить адрес" : "Сохранить адрес"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({
                  title: "",
                  fullName: "",
                  phone: "",
                  address: "",
                  apartment: "",
                  city: "",
                  postalCode: "",
                  isDefault: false
                });
              }}
              className={`btn-reset ${styles.btn} ${styles.cancelBtn}`}
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      <div className={styles.addressesList}>
        {addresses.length === 0 ? (
          <p className={styles.emptyMessage}>Нет сохраненных адресов</p>
        ) : (
          addresses.map(address => (
            <div key={address.id} className={`${styles.addressItem} ${address.isDefault ? styles.defaultAddress : ''}`}>
              <div className={styles.addressInfo}>
                <div className={styles.addressHeader}>
                  <h3>{address.title}</h3>
                  {address.isDefault && (
                    <span className={styles.defaultBadge}>По умолчанию</span>
                  )}
                </div>
                <p><strong>{address.fullName}</strong></p>
                <p>{address.phone}</p>
                <p>
                  {address.address}
                  {address.apartment && `, кв. ${address.apartment}`}
                </p>
                <p>{address.city}, {address.postalCode}</p>
              </div>
              <div className={styles.addressActions}>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className={`btn-reset ${styles.btn} ${styles.setDefaultBtn}`}
                  >
                    Сделать основным
                  </button>
                )}
                <button
                  onClick={() => handleEdit(address)}
                  className={`btn-reset ${styles.btn} ${styles.editBtn}`}
                >
                  Изменить
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Удалить этот адрес?")) {
                      onDeleteAddress(address.id);
                    }
                  }}
                  className={`btn-reset ${styles.btn} ${styles.deleteBtn}`}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};