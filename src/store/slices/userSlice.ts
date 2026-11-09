// src\store\slices\userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Address, PaymentCard, UserPreferences } from '@/types';

interface UserState {
  user: User | null;
  addresses: Address[];
  paymentCards: PaymentCard[];
  preferences: UserPreferences;
  isLoading: boolean;
}

const initialPreferences: UserPreferences = {
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: false,
  language: 'ru',
  currency: 'RUB',
  theme: 'light'
};

const initialState: UserState = {
  user: null,
  addresses: [],
  paymentCards: [],
  preferences: initialPreferences,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<{ id: string; address: Partial<Address> }>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = { ...state.addresses[index], ...action.payload.address };
      }
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    setPaymentCards: (state, action: PayloadAction<PaymentCard[]>) => {
      state.paymentCards = action.payload;
    },
    addPaymentCard: (state, action: PayloadAction<PaymentCard>) => {
      state.paymentCards.push(action.payload);
    },
    deletePaymentCard: (state, action: PayloadAction<string>) => {
      state.paymentCards = state.paymentCards.filter(card => card.id !== action.payload);
    },
    setDefaultCard: (state, action: PayloadAction<string>) => {
      state.paymentCards = state.paymentCards.map(card => ({
        ...card,
        isDefault: card.id === action.payload
      }));
    },
    setPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.addresses = [];
      state.paymentCards = [];
      state.preferences = initialPreferences;
    }
  }
});

export const {
  setUser,
  updateUser,
  setAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setPaymentCards,
  addPaymentCard,
  deletePaymentCard,
  setDefaultCard,
  setPreferences,
  logout
} = userSlice.actions;

export default userSlice.reducer;