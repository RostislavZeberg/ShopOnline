import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Currency = {
  code: string;
  name: string;
  symbol: string;
  rate: number;
};

interface CurrencyState {
  currentCurrency: Currency;
}

const initialState: CurrencyState = {
  currentCurrency: {
    code: 'RUB',
    name: 'Российский рубль',
    symbol: '₽',
    rate: 1
  }
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currentCurrency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;