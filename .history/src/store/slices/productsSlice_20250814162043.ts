import { getProductById, getProducts } from '@/services/api';
import { IProductBase, IProductTotal } from '@/types/productsTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface ProductsState {
  products: IProductTotal[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProductsWithCategories = createAsyncThunk(
  'products/fetchProductsWithCategories',
  async (): Promise<IProductTotal[]> => {
    const products = await getProducts();

    const productsWithCategories = await Promise.all(
      products.map(async (product: IProductBase) => {
        const fullProduct = await getProductById(product.id);
        return {
          ...product,
          categoryId: fullProduct.category.title,
        };
      })
    );

    return productsWithCategories;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsWithCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Сбрасываем ошибку при новом запросе
      })
      .addCase(fetchProductsWithCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsWithCategories.rejected, (state, action) => {
        state.status = 'failed';
        // Используем fallback строку если error.message undefined
        state.error = action.error.message ?? 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;