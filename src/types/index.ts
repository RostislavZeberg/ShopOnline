// src/types/index.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  language: 'ru' | 'en';
  currency: 'RUB' | 'USD' | 'EUR';
  theme: 'light' | 'dark' | 'auto';
}

export interface Address {
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

export interface PaymentCard {
  id: string;
  lastFourDigits: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}