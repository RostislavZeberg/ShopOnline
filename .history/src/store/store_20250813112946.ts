// import { configureStore } from '@reduxjs/toolkit';
// import burgerReducer from './slices/burgerSlice';
// import logInReducer from './slices/logInSlice';
// import productsReducer from './slices/productsSlice';
// import categoriesReducer from './slices/categoriesSlice';
// import authFormReducer from './slices/authFormSlice';
// import backgroundReducer from './slices/backgroundSlice';
// import favoriteReducer from './slices/favoriteSlice'
// import filterReducer from './slices/filterSlice'

// export const store = configureStore({
//   reducer: {
//     burger: burgerReducer,
//     logIn: logInReducer,
//     products: productsReducer,
//     categories: categoriesReducer,
//     authForm: authFormReducer,
//     background: backgroundReducer,
//     favorite: favoriteReducer,
//     filter: filterReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, combineSlices } from '@reduxjs/toolkit';
import burgerSlice from './slices/burgerSlice';
import logInSlice from './slices/logInSlice';
import productsSlice from './slices/productsSlice';
import filterSlice from './slices/filterSlice';
import categoriesSlice from './slices/categoriesSlice';
import authFormSlice from './slices/authFormSlice';
import backgroundSlice from './slices/backgroundSlice';
import favoriteSlice from './slices/favoriteSlice';

// Объединяем все слайсы
const rootReducer = combineSlices({
  burgerSlice,
  logInSlice,
  productsSlice,
  filterSlice,
  categoriesSlice,
  authFormSlice,
  backgroundSlice,
  favoriteSlice
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;