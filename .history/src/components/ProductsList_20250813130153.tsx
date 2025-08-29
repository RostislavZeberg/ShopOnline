"use client"
import { useSearchParams } from "next/navigation";

import { useLoadShopData } from "@/hooks/useLoadShopData";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Product } from "./Product";
import { useFavorites } from "@/hooks/useFavorites";
import { filterProducts } from "@/utils/filterProducts";
import styles from "@/styles/products-list.module.scss";

export const ProductsList = () => {
  useLoadShopData();
  useFavorites();
  
  const searchParams = useSearchParams();
  const filters = {
    name: searchParams.get('name') || '',
    category: searchParams.get('category') || '',
    color: searchParams.get('color') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  };
  
  const { 
    items: products, 
    loading: productsLoading, 
    error: productsError 
  } = useAppSelector((state) => state.productsSlice);
  
  const { 
    items: categories,
    loading: categoriesLoading, 
    error: categoriesError 
  } = useAppSelector((state) => state.categoriesSlice);

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;
  
  const filteredProducts = filterProducts(products, categories, filters);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ul className={`${styles['products-list']} list-reset`}>
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};