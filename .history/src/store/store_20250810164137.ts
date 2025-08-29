import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import logInReducer from './slices/logInSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import authFormReducer from './slices/authFormSlice';
import backgroundReducer from './slices/backgroundSlice';
import favoriteReducer from './slices/favoriteSlice'

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    logIn: logInReducer,
    products: productsReducer,
    categories: categoriesReducer,
    authForm: authFormReducer,
    background: backgroundReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;