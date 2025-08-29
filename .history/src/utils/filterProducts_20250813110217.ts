import { FilterState } from "@/types/filterTypes";
import { IProduct } from "@/types/productsTypes";


export const filterProducts = (products: IProduct[], filters: FilterState): IProduct[] => {
  return products.filter(product => {
    // Фильтрация по названию
    const titleMatch = product.title.toLowerCase().includes(filters.title.toLowerCase());
    
    // Фильтрация по цене
    const priceMatch = product.price >= filters.price.min && product.price <= filters.price.max;
    
    // Фильтрация по цвету (если цвета выбраны)
    const colorMatch = filters.colors.length === 0 || 
      product.colors.some(color => filters.colors.includes(color.title));
    
    // Фильтрация по категории (если категории выбраны)
    const categoryMatch = filters.categories.length === 0 || 
      filters.categories.includes(product.category.title);
    
    return titleMatch && priceMatch && colorMatch && categoryMatch;
  });
};