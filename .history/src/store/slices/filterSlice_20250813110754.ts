import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFilterState } from '../constants/filterConstants';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setPrice(state, action: PayloadAction<{ min: number; max: number }>) {
      state.price = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.price.min = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.price.max = action.payload;
    },
    toggleColor(state, action: PayloadAction<string>) {
      const color = action.payload;
      const index = state.colors.indexOf(color);
      
      if (index === -1) {
        state.colors.push(color);
      } else {
        state.colors.splice(index, 1);
      }
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      
      if (index === -1) {
        state.categories.push(category);
      } else {
        state.categories.splice(index, 1);
      }
    },
    resetFilters(state) {
      state.title = '';
      state.price = { min: 0, max: 10000 };
      state.colors = [];
      state.categories = [];
    },
  },
});

export const {
  setTitle,
  setPrice,
  setMinPrice,
  setMaxPrice,
  toggleColor,
  toggleCategory,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;