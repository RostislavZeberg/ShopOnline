import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

interface BurgerState {
  isOpenSearchDetailed: boolean;
}

const initialState: BurgerState = {
  isOpenSearchDetailed: false,
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    toggleBurger: (state) => {
      state.isOpenSearchDetailed = !state.isOpenSearchDetailed;
    },
    setBurgerState: (state, action: PayloadAction<boolean>) => {
      state.isOpenSearchDetailed = action.payload;
    },
  },
});

export const { toggleBurger, setBurgerState } = burgerSlice.actions;
export default burgerSlice.reducer;