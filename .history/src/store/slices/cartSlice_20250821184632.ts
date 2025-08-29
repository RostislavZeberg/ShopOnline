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
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.cartItems[productId]) {
        state.cartItems[productId] += 1;
      } else {
        state.cartItems[productId] = 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.cartItems[productId] && state.cartItems[productId] > 1) {
        state.cartItems[productId] -= 1;
      } else {
        delete state.cartItems[productId];
      }
    },
    removeAllOfItem: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      delete state.cartItems[productId];
    },
    clearCart: (state) => {
      state.cartItems = {};
    },
    initializeCart: (state, action: PayloadAction<CartState['cartItems']>) => {
      state.cartItems = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, removeAllOfItem, clearCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;