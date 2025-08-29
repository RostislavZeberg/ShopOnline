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
    const colorMatch = filters.colors?.length === 0 || 
      (product.colors && product.colors.some(color => 
        filters.colors.includes(color.title.toLowerCase())));
    
    // Фильтрация по категории
    const categoryMatch = filters.categories?.length === 0 || 
      (product.category && filters.categories.includes(product.category.title.toLowerCase()));
    
    return titleMatch && priceMatch && colorMatch && categoryMatch;
  });
};