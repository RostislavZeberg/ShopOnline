import { useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';
import { loadProductsWithCategories } from '../store/slices/productsSlice';
import { loadCategories } from '../store/slices/categoriesSlice';


export const useLoadShopData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(loadProductsWithCategories()),
          dispatch(loadCategories())
        ]);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, [dispatch]);
};