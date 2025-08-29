"use client"
import { useAppSelector } from "@/store/hooks";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Product } from "@/components/Product/Product";
import { useFavorites } from "@/hooks/useFavorites";
import { useLoadShopData } from "@/hooks/useLoadShopData";
import styles from "./favorites__list.module.scss"
import Link from "next/link";

export const FavoritesList = () => {
  useLoadShopData();
  useFavorites();

  const {
    filteredItems: products,
    loading: productsLoading,
    error: productsError
  } = useAppSelector((state) => state.productsSlice);

  const favoriteIds = useAppSelector((state) => state.favoriteSlice.favoriteIds);
  const productsFavorites = products.filter(product => favoriteIds.includes(product.id))

  const {
    loading: categoriesLoading,
    error: categoriesError
  } = useAppSelector((state) => state.categoriesSlice);

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <ul className={`${styles['products-list']} list-reset`}>
        {productsFavorites.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
      <Link href={'/'} className={`${styles['btn-favorite']} btn btn-reset`}>← Продолжить покупки</Link>
    </>
  )
}