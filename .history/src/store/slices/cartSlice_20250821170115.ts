"use client"
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartIds: number[];
}

const initialState: CartState = {
  cartIds: [], 
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.cartIds.indexOf(productId);
      
      if (index === -1) {
        state.cartIds.push(productId);
      } else {
        state.cartIds.splice(index, 1);
      }
      
      // Сохраняем только на клиенте
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('cart', JSON.stringify(state.cartIds));
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    },
    initializeCart: (state, action: PayloadAction<number[]>) => {
      state.cartIds = action.payload;
    },
  },
});

export const { toggleCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;