"use client"
import { useLoadShopData } from "@/hooks/useLoadShopData";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Product } from "./Product";
import styles from "@/styles/products-list.module.scss";


export const ProductsList = () => {
  useLoadShopData();
  
  const { 
    items: products, 
    loading: productsLoading, 
    error: productsError 
  } = useAppSelector((state) => state.products);
  
  const { 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useAppSelector((state) => state.categories);

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