import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import logInReducer from './slices/logInSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import favoriteReducer from './slices/favoriteSlice';
import authFormReducer from './slices/authFormSlice';
import backgroundReducer from './slices/backgroundSlice';

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    logIn: logInReducer,
    products: productsReducer,
    categories: categoriesReducer,
    favorite: favoriteReducer,
    authForm: authFormReducer,
    background: backgroundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;