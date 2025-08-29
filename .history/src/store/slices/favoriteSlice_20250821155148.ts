"use client"
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  favoriteIds: number[];
}

const initialState: FavoriteState = {
  favoriteIds: [], 
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.favoriteIds.indexOf(productId);
      
      if (index === -1) {
        state.favoriteIds.push(productId);
      } else {
        state.favoriteIds.splice(index, 1);
      }
      
      // Сохраняем только на клиенте
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('favorites', JSON.stringify(state.favoriteIds));
        } catch (error) {
          console.error('Error saving favorites:', error);
        }
      }
    },
    initializeFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteIds = action.payload;
    },
  },
});

export const { toggleFavorite, initializeFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;