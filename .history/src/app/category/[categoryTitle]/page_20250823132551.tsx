"use client";
import { useLoadShopData } from "@/hooks/useLoadShopData";
import { useAppSelector } from "@/store/hooks";
import { filterProducts } from "@/utils/filterProducts";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import styles from "./page.module.scss";
import { Product } from "@/components/Product/Product";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader/Loader";

export default function CategoryPage() {
  useLoadShopData();
  const params = useParams();
  const categorySlug = params.slug as string;

  const { items: allProducts } = useAppSelector(state => state.productsSlice);
  const filters = useAppSelector(state => state.filterSlice);

  const categoryProducts = useMemo(() => {
    // Фильтруем товары по категории
    const filteredByCategory = allProducts.filter(product =>
      product.category.title === categorySlug
    );

    // Применяем дополнительные фильтры
    return filterProducts(filteredByCategory, filters);
  }, [allProducts, categorySlug, filters]);

  const {
    filteredItems: productsFromState,
    loading: productsLoading,
    error: productsError
  } = useAppSelector((state) => state.productsSlice);

  const {
    loading: categoriesLoading,
    error: categoriesError
  } = useAppSelector((state) => state.categoriesSlice);

  const products = categoryProducts ?? productsFromState;
  const isLoading = categoryProducts ? false : productsLoading || categoriesLoading;
  const error = categoryProducts ? null : productsError || categoriesError;

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  console.log("TEST:", params)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Назад к каталогу
        </Link>
        <h1 className={styles.title}>
          Категория: {categoryProducts[0]?.category.title || categorySlug}
        </h1>
      </div>

      <ul className={`${styles['products-list']} list-reset`}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}