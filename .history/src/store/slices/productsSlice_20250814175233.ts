import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProductsState, IProductTotal, IProductWithCategory } from '@/types/productsTypes';
import { fetchProductsWithCategories } from '@/services/api';
import { FilterState } from '@/types/filterTypes';
import { filterProducts } from '@/utils/filterProducts';

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
  initialState: {
    items: [] as IProductTotal[],
    filteredItems: [] as IProductTotal[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    applyFilters(state, action: PayloadAction<FilterState>) {
      if (state.items.length > 0) {
        state.filteredItems = filterProducts(state.items, action.payload);
      }
    },
    resetFilters(state) {
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductsWithCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadProductsWithCategories.fulfilled,
        (state, action: PayloadAction<IProductTotal[]>) => {
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