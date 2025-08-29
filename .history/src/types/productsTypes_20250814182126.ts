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
  slug: string;
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

// Тип товара с категорией для хранения в хранилище
export interface IProductWithCategory extends IProductBase {
  // status: string;
  categoryId?: number; // Будем добавлять после загрузки полных данных
}

export interface IProductTotal extends Omit<IProductBase, 'categoryId'> {
  category: ICategory;
}

// Тип состояния для товаров
export interface IProductsState {
  items: IProductWithCategory[];
  loading: boolean;
  error: string | null;
}

// Тип состояния для категорий
export interface ICategoriesState {
  items: ICategory[];
  loading: boolean;
  error: string | null;
}

export interface IProductDetail extends IProductWithCategory {
  category?: {
    id: number;
    title: string;
  };
  specifications?: Array<{
    name: string;
    value: string;
  }>;
}

// Тип состояния для товаров
export interface IProductsState {
  items: IProductWithCategory[];
  filteredItems: IProductWithCategory[]; // Добавляем поле для отфильтрованных товаров
  loading: boolean;
  error: string | null;
}

