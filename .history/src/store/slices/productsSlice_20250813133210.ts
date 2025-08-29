import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IProductsState, IProductWithCategory } from '@/types/productsTypes';
import { fetchProductsWithCategories } from '@/services/api';
import { FilterState } from '@/types/filterTypes';

// Создаем асинхронный thunk
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
    // Добавляем редьюсер для фильтрации продуктов
    filterProducts(state, action: PayloadAction<FilterState>) {
      const { title, price, colors, categories } = action.payload;
      
      state.filteredItems = state.items.filter(product => {
        // Фильтрация по названию
        const titleMatch = title 
          ? product.title.toLowerCase().includes(title.toLowerCase())
          : true;
        
        // Фильтрация по цене
        const priceMatch = 
          product.price >= (price?.min || 0) && 
          product.price <= (price?.max || Infinity);
        
        // Фильтрация по цвету
        const colorMatch = colors?.length === 0 || 
          (product.colors && product.colors.some(color => 
            colors.includes(color.title.toLowerCase())));
        
        // Фильтрация по категории
        const categoryMatch = categories?.length === 0 || 
          (product.category && categories.includes(product.category.title.toLowerCase()));
        
        return titleMatch && priceMatch && colorMatch && categoryMatch;
      });
    },
    // Сбрасываем фильтрацию
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
          state.filteredItems = action.payload; // Изначально отображаем все товары
          state.loading = false;
        }
      )
      .addCase(loadProductsWithCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

// Экспортируем экшены
export const { filterProducts, resetFilteredProducts } = productsSlice.actions;

export default productsSlice.reducer;