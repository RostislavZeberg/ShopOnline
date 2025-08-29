import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, PriceRange } from '@/types/filterTypes';

const initialState: FilterState = {
  title: '',
  price: {
    min: 0,
    max: Infinity,
  },
  colors: [],
  categories: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
      return { ...state, ...action.payload };
    },
    resetFilters(state) {
      return initialState;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setPrice(state, action: PayloadAction<PriceRange>) {
      state.price = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.price.min = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.price.max = action.payload;
    },
    toggleColor(state, action: PayloadAction<string>) {
      const color = action.payload.toLowerCase();
      const index = state.colors.indexOf(color);
      if (index === -1) {
        state.colors.push(color);
      } else {
        state.colors.splice(index, 1);
      }
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const category = action.payload.toLowerCase();
      const index = state.categories.indexOf(category);
      if (index === -1) {
        state.categories.push(category);
      } else {
        state.categories.splice(index, 1);
      }
    },
  },
});

export const { 
  setFilters, 
  resetFilters, 
  setTitle, 
  setPrice, 
  setMinPrice, 
  setMaxPrice, 
  toggleColor, 
  toggleCategory 
} = filterSlice.actions;

export default filterSlice.reducer;