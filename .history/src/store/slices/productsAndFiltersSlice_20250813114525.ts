import { combineSlices } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import filterSlice from './filterSlice';

export const productsAndFiltersReducer = combineSlices(
  productsSlice,
  filterSlice
);