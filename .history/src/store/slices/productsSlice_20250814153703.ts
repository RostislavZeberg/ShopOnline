import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProductsState, IProductWithCategory } from '@/types/productsTypes';
import { fetchProductsWithCategories } from '@/services/api';


export const loadProductsWithCategories = createAsyncThunk(
  'products/loadProductsWithCategories',
  async () => {
    const response = await fetchProductsWithCategories();
    return response;
  }
);

const initialState: IProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: (builder) => {
    builder
      .addCase(loadProductsWithCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadProductsWithCategories.fulfilled,
        (state, action: PayloadAction<IProductWithCategory[]>) => {
          state.items = action.payload;
          state.filteredItems = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadProductsWithCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

export const { applyFilters, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;