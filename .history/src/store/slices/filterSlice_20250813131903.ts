import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types/filterTypes';

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
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;