"use client"
import { useLoadShopData } from "@/hooks/useLoadShopData";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Product } from "./Product";
import { useFavorites } from "@/hooks/useFavorites";
import styles from "@/styles/products-list.module.scss";
import { fetchProductsWithCategories, getProductById } from "@/services/api";

export const ProductsList = () => {
  useLoadShopData();
  useFavorites();
  console.log("fetchProductsWithCategories:", fetchProductsWithCategories())
  console.log("getProductById:", getProductById(1))
  const { 
    filteredItems: products,
    loading: productsLoading, 
    error: productsError 
  } = useAppSelector((state) => state.productsSlice);
  
  const { 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useAppSelector((state) => state.categoriesSlice);

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ul className={`${styles['products-list']} list-reset`}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};