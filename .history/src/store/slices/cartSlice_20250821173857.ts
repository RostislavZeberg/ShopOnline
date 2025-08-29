"use client"
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: {
    [productId: number]: number;
  };
}

const initialState: CartState = {
  cartItems: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавление или увеличение количества товара
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.cartItems[productId]) {
        state.cartItems[productId] += 1;
      } else {
        state.cartItems[productId] = 1;
      }
      saveCartToLocalStorage(state.cartItems);
    },
    // Уменьшение количества или удаление товара
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.cartItems[productId] && state.cartItems[productId] > 1) {
        state.cartItems[productId] -= 1;
      } else {
        delete state.cartItems[productId];
      }
      saveCartToLocalStorage(state.cartItems);
    },
    // Полное удаление товара из корзины
    removeAllOfItem: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      delete state.cartItems[productId];
      saveCartToLocalStorage(state.cartItems);
    },
    // Инициализация корзины из localStorage
    initializeCart: (state, action: PayloadAction<CartState['cartItems']>) => {
      state.cartItems = action.payload;
    },
  },
});

// Функция для сохранения корзины в localStorage
const saveCartToLocalStorage = (cartItems: CartState['cartItems']) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }
};

export const { addToCart, removeFromCart, removeAllOfItem, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;