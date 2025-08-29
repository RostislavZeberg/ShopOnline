"use client"
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Функция для загрузки избранного из localStorage
const loadFavoritesFromLocalStorage = (): number[] => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

// Функция для сохранения избранного в localStorage
const saveFavoritesToLocalStorage = (favorites: number[]) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

interface FavoriteState {
  favoriteIds: number[];
}

const initialState: FavoriteState = {
  favoriteIds: loadFavoritesFromLocalStorage(),
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
      
      // Сохраняем изменения в localStorage
      saveFavoritesToLocalStorage(state.favoriteIds);
    },
    // Добавим редюсер для инициализации избранного
    initializeFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteIds = action.payload;
    },
  },
});

export const { toggleFavorite, initializeFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;