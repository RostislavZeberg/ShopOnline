// src\types\profileTypes.ts
export interface UserData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  avatar?: string;
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
