import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IProductsState, IProductWithCategory } from '@/types/productsTypes';
import { fetchProductsWithCategories } from '@/services/api';
import { FilterState } from '@/types/filterTypes';

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
  reducers: {
    filterProducts(state, action: PayloadAction<FilterState>) {
      const { title, price, colors, categories } = action.payload;
      
      state.filteredItems = state.items.filter(product => {
        const titleMatch = title 
          ? product.title.toLowerCase().includes(title.toLowerCase())
          : true;
        
        const priceMatch = 
          product.price >= (price?.min || 0) && 
          product.price <= (price?.max || Infinity);
        
        const colorMatch = colors?.length === 0 || 
          (product.colors && product.colors.some(color => 
            colors.includes(color.title.toLowerCase())));
        
        // Используем categoryId вместо category
        const categoryMatch = categories?.length === 0 || 
          (product.categoryId && categories.includes(product.categoryId.toString()));
        
        return titleMatch && priceMatch && colorMatch && categoryMatch;
      });
    },
    resetFilteredProducts(state) {
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

export const { filterProducts, resetFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;