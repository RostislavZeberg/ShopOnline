import { useCallback } from 'react';

import { useAppSelector } from '../store/hooks';

export const useProductData = () => {
  const { items: categories } = useAppSelector((state) => state.categoriesSlice);
  const favoriteIds = useAppSelector((state) => state.favoriteSlice.favoriteIds);

  const getCategoryName = useCallback(
    (categoryId?: number) => {
      console.log("TEST:", categoryId)
      if (!categoryId) return 'No category';
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.title : 'Unknown category';
    },
    [categories]
  );

  const checkIsFavorite = useCallback(
    (productId: number) => favoriteIds.includes(productId),
    [favoriteIds]
  );

  return { getCategoryName, checkIsFavorite };
};
