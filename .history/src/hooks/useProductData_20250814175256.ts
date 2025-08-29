import { useCallback } from 'react';

import { useAppSelector } from '../store/hooks';

export const useProductData = () => {
  const { items: products } = useAppSelector((state) => state.productsSlice);
  const favoriteIds = useAppSelector((state) => state.favoriteSlice.favoriteIds);

  const getCategoryName = useCallback(
    (categoryId?: number) => {
      if (!categoryId) return 'No category';
      const product = products.find(p => p.category.id === categoryId);
      return product ? product.category.title : 'Unknown category';
    },
    [products]
  );

  const checkIsFavorite = useCallback(
    (productId: number) => favoriteIds.includes(productId),
    [favoriteIds]
  );

  return { getCategoryName, checkIsFavorite };
};
