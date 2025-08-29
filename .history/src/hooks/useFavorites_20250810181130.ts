"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeFavorites } from '@/store/slices/favoriteSlice';

export const useFavorites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = () => {
      try {
        if (typeof window !== 'undefined') {
          const favorites = localStorage.getItem('favorites');
          const parsedFavorites = favorites ? JSON.parse(favorites) : [];
          dispatch(initializeFavorites(parsedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, [dispatch]);
};