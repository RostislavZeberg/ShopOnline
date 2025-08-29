import { IProductWithCategory, ICategory } from "@/types/productsTypes";

interface FilterParams {
  name: string;
  category: string;
  color: string;
  minPrice: string;
  maxPrice: string;
}

export const filterProducts = (
  products: IProductWithCategory[],
  categories: ICategory[],
  filters: FilterParams
): IProductWithCategory[] => {
  return products.filter(product => {
    // Находим категорию товара
    const productCategory = categories.find(c => c.id === product.categoryId);
    
    // Фильтрация по названию
    const nameMatch = filters.name 
      ? product.title.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    
    // Фильтрация по категории
    const categoryMatch = filters.category && productCategory
      ? productCategory.title.toLowerCase().includes(filters.category.toLowerCase())
      : !filters.category;
    
    // Фильтрация по цвету
    const colorMatch = filters.color
      ? product.colors.some(c => c.title.toLowerCase().includes(filters.color.toLowerCase()))
      : true;
    
    // Фильтрация по цене
    const minPrice = filters.minPrice ? Number(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    
    return nameMatch && categoryMatch && colorMatch && priceMatch;
  });
};