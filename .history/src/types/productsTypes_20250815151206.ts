import { ReactNode } from "react";

// Тип для цвета товара
export interface IColor {
  id: number;
  title: string;
  code: string;
}

// Тип для изображения товара
export interface IProductImage {
  file: {
    url: string;
    name: string;
    originalName: string;
    extension: string;
    size: string;
  };
}

// Тип для категории
export interface ICategory {
  id: number;
  title: string;
}

// Базовый тип товара (из списка)
export interface IProductBase {
  id: number;
  title: string;
  content: string;
  slug: string;
  image: IProductImage;
  price: number;
  colors: IColor[];
}

// Полный тип товара (при запросе по ID)
export interface IProduct extends IProductBase {
  category: ICategory;
}

export interface IProductTotal extends Omit<IProductBase, 'categoryId'> {
  category: ICategory;
}

// Тип состояния для товаров
export interface IProductsState {
  items: IProductTotal[];
  filteredItems: IProductTotal[];
  loading: boolean;
  error: string | null;
}

// Тип состояния для категорий
export interface ICategoriesState {  items: ICategory[];
  
  loading: boolean;
  error: string | null;
}

