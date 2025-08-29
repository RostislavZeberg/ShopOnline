"use client";
import { useLoadShopData } from "@/hooks/useLoadShopData";
import { useAppSelector } from "@/store/hooks";
import { filterProducts } from "@/utils/filterProducts";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ProductsList } from "@/components/ProductsList/ProductsList";
import styles from "./page.module.scss";

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
      
      <ProductsList externalProducts={categoryProducts} />
    </div>
  );
}