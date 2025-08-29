import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// import type { ICategoriesState, ICategory } from '../../utils/interface';
import { getCategories } from '@/services/api';

// Создаем асинхронный thunk
export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  async () => {
    const response = await getCategories();
    return response;
  }
);

const initialState: ICategoriesState = {
  items: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load categories';
      });
  },
});

export default categoriesSlice.reducer;