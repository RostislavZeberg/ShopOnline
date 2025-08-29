import { FilterState } from "@/types/filterTypes";
import { IProductWithCategory } from "@/types/productsTypes";

export const filterProducts = (
  products: IProductWithCategory[],
  filters: FilterState
): IProductWithCategory[] => {
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
    const categoryMatch = !filters.categories?.length ||
      (typeof product.categoryId !== 'undefined' &&
        filters.categories.some(filterCategory => {
          // Приводим оба значения к строке и сравниваем без учета регистра
          const productCategoryStr = product.categoryId.toString().toLowerCase();
          const filterCategoryStr = filterCategory.toLowerCase();
          return productCategoryStr === filterCategoryStr;
        }));

    return titleMatch && priceMatch && colorMatch && categoryMatch;
  });
};