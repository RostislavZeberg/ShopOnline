"use client"
import { useLoadShopData } from "@/hooks/useLoadShopData";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Product } from "./Product";
import { useFavorites } from "@/hooks/useFavorites";
import styles from "@/styles/products-list.module.scss";
import { filterProducts } from "@/utils/filterProducts";
import { useEffect, useState } from "react";
import { IProductWithCategory } from "@/types/productsTypes";

export const ProductsList = () => {
  useLoadShopData();
  useFavorites();
  
  const { 
    items: products, 
    loading: productsLoading, 
    error: productsError 
  } = useAppSelector((state) => state.productsSlice);
  
  const { 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useAppSelector((state) => state.categoriesSlice);

  const filters = useAppSelector((state) => state.filterSlice);
  const [filteredProducts, setFilteredProducts] = useState<IProductWithCategory[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(filterProducts(products, filters));
    }
  }, [products, filters]);

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

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