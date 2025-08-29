import { combineSlices, configureStore } from '@reduxjs/toolkit';

import burgerReducer from './slices/burgerSlice';
import logInReducer from './slices/logInSlice';
// import productsReducer from './slices/productsSlice';
// import filterReducer from './slices/filterSlice'
import categoriesReducer from './slices/categoriesSlice';
import authFormReducer from './slices/authFormSlice';
import backgroundReducer from './slices/backgroundSlice';
import favoriteReducer from './slices/favoriteSlice'
import productsSlice from './slices/productsSlice';
import filterSlice from './slices/filterSlice';

export const productsAndFiltersReducer = combineSlices(productsSlice, filterSlice);

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    logIn: logInReducer,
    // products: productsReducer,
    // filter: filterReducer,
    categories: categoriesReducer,
    authForm: authFormReducer,
    background: backgroundReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;