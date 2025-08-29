

export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  return products.filter(product => {
    // Фильтрация по названию
    const titleMatch = product.title.toLowerCase().includes(filters.title.toLowerCase());
    
    // Фильтрация по цене
    const priceMatch = product.price >= filters.price.min && product.price <= filters.price.max;
    
    // Фильтрация по цвету (если цвета выбраны)
    const colorMatch = filters.colors.length === 0 || 
      product.colors.some(color => filters.colors.includes(color));
    
    // Фильтрация по категории (если категории выбраны)
    const categoryMatch = filters.categories.length === 0 || 
      filters.categories.includes(product.category);
    
    return titleMatch && priceMatch && colorMatch && categoryMatch;
  });
};