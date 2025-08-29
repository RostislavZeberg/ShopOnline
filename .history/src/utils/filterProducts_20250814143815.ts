import { FilterState } from "@/types/filterTypes";
import { IProductTotal, IProductWithCategory } from "@/types/productsTypes";

export const filterProducts = (
  products: IProductTotal[],
  filters: FilterState
): IProductTotal[] => {
  if (!filters || Object.keys(filters).length === 0) return products;  

  return products.filter(product => {
    // Фильтрация по названию
    const titleMatch = !filters.title || 
      product.title.toLowerCase().includes(filters.title.toLowerCase());
    
    // Фильтрация по цене
    const minPrice = filters.price?.min || 0;
    const maxPrice = filters.price?.max || Infinity;
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    
    // Фильтрация по цвету
    const colorMatch = !filters.colors?.length || 
      product.colors?.some(color => 
        filters.colors.some(filterColor => 
          color.title.toLowerCase().includes(filterColor.toLowerCase())
        )
      );
    
    // Фильтрация по категории
    console.log("TEST:", product.category.title)
    const categoryMatch = !filters.categories?.length || 
      (product.category.title && filters.categories.some(filterCategory => 
        product.category.title.toString().includes(filterCategory.toLowerCase())
      ));
    
    return titleMatch && priceMatch && colorMatch && categoryMatch;
  });
};