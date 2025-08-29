"use client";
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BtnFavorite } from '@/components/BtnFavorite';
import styles from './ProductPage.module.scss';
import { useProductData } from '@/hooks/useProductData';
import { getProductById } from '@/services/api';

interface Color {
  id: string;
  title: string;
  code: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  categoryId: number;
  image: {
    file: {
      url: string;
    };
  };
  colors: Color[];
  category?: {
    name: string;
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCategoryName, checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(Number(params.id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(params.id));
        setProduct(data);
      } catch (err) {
        setError('Не удалось загрузить товар');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) notFound();

  return (
    <main className={styles.productPage}>
      <section className={styles.productContainer}>
        {/* Галерея изображений */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image
              src={product.image.file.url}
              alt={product.title}
              width={600}
              height={600}
              quality={85}
              priority
              className={styles.productImage}
            />
          </div>
        </div>

        {/* Информация о товаре */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.title}</h1>

          <div className={styles.priceSection}>
            <span className={styles.price}>{product.price} ₽</span>
            <BtnFavorite isFavorite={isFavorite} id={product.id} />
          </div>

          {product.category && (
            <p className={styles.category}>
              Категория: <span>{product.category.name}</span>
            </p>
          )}

          {product.description && (
            <div className={styles.description}>
              <h2>Описание</h2>
              <p>{product.description}</p>
            </div>
          )}

          {/* Цвета */}
          {product.colors?.length > 0 && (
            <div className={styles.colorSelection}>
              <h3>Доступные цвета:</h3>
              <div className={styles.colorOptions}>
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className={styles.colorOption}
                    title={color.title}
                    aria-label={`Цвет: ${color.title}`}
                  >
                    <span
                      className={`${styles.colorMarker} ${color.title === "Белый" ? styles.white : ''}`}
                      style={{ backgroundColor: color.code }}
                    />
                    <span className={styles.colorName}>{color.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className={styles.orderButton}
            aria-label="Добавить в корзину"
          >
            <span>Добавить в корзину</span>
          </button>
        </div>
      </section>
    </main>
  );
}

