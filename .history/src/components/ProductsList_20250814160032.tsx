"use client"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Product } from "./Product";
import { useFavorites } from "@/hooks/useFavorites";
import styles from "@/styles/products-list.module.scss";
import { useEffect } from "react";
import { fetchProductsWithCategories } from "@/services/api";

export const ProductsList = () => {

  useFavorites();
  
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.productsSlice);

  useEffect(() => {
    dispatch(fetchProductsWithCategories());
  }, [dispatch]);

  if (status === 'loading') return <Loader/>;
  if (status === 'failed') return <ErrorMessage message={error}/>;

  return (
    <ul className={`${styles['products-list']} list-reset`}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};