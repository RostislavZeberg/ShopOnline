import { configureStore, combineSlices } from '@reduxjs/toolkit';
import burgerSlice from './slices/burgerSlice';
import logInSlice from './slices/logInSlice';
import productsSlice from './slices/productsSlice';
import filterSlice from './slices/filterSlice';
import categoriesSlice from './slices/categoriesSlice';
import authFormSlice from './slices/authFormSlice';
import backgroundSlice from './slices/backgroundSlice';
import favoriteSlice from './slices/favoriteSlice';
import cartSlice from './slices/cartSlice';
import currencySlice from './slices/currencySlice';

const rootReducer = combineSlices({
  burgerSlice,
  logInSlice,
  productsSlice,
  filterSlice,
  categoriesSlice,
  authFormSlice,
  backgroundSlice,
  favoriteSlice,
  cartSlice,
  currencySlice,
  ordersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;