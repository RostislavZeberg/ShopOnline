import { combineSlices } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import filterSlice from './filterSlice';

export const productsAndFiltersSlice = combineSlices(productsSlice, filterSlice, {
  // Опционально: можно задать кастомное имя для объединенного слайса
  reducerPath: 'productsAndFilters'
});