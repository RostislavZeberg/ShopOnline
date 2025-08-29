import { FilterState } from "@/types/filterTypes";
import { IProductWithCategory } from "@/types/productsTypes";

export const filterProducts = (
  products: IProductWithCategory[],
  filters: FilterState
): IProductWithCategory[] => {
  if (!filters) return products;

  return products.filter(product => {
    // Фильтрация по названию
    const titleMatch = filters.title 
      ? product.title.toLowerCase().includes(filters.title.toLowerCase())
      : true;
    
    // Фильтрация по цене
    const priceMatch = 
      product.price >= (filters.price?.min || 0) && 
      product.price <= (filters.price?.max || Infinity);
    
    // Фильтрация по цвету
    const colorMatch = !filters.colors?.length || 
      (product.colors && product.colors.some(color => 
        filters.colors.includes(color.title.toLowerCase())));
    
    // Фильтрация по категории (используем categoryId)
    const categoryMatch = !filters.categories?.length || 
      (product.categoryId && filters.categories.includes(product.categoryId.toString()));
    
    return titleMatch && priceMatch && colorMatch && categoryMatch;
  });
};