"use client";
import { notFound } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { BtnFavorite } from '@/components/BtnFavorite';
import { useProductData } from '@/hooks/useProductData';
import styles from './ProductPage.module.scss';
import { getProductById } from '@/services/api';

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: {
    id: number;
    name: string;
  };
  image: {
    file: {
      url: string;
    };
  };
  colors: Array<{
    id: string;
    title: string;
    code: string;
  }>;
  rating?: number;
  status?: 'active' | 'inactive';
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // Распаковываем параметры
  const { id } = use(params);
  const productId = Number(id);

  // Состояния компонента
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Хук для работы с данными товара
  const { checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(productId);

  // Загрузка данных товара
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Состояния загрузки и ошибки
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) notFound();

  return (
    <main className={styles.container}>
      {/* Хлебные крошки */}
      <nav className={styles.breadcrumbs}>
        <a href="/">Home</a>
        <span> / </span>
        <a href={`/category/${product.category?.id}`}>
          {product.category?.name || 'Category'}
        </a>
        <span> / </span>
        <span>{product.title}</span>
      </nav>

      {/* Основное содержимое */}
      <div className={styles.productGrid}>
        {/* Галерея изображений */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image
              src={product.image.file.url}
              alt={product.title}
              width={600}
              height={600}
              priority
              quality={85}
              className={styles.image}
            />
          </div>
        </div>

        {/* Информация о товаре */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          
          {/* Рейтинг и артикул */}
          <div className={styles.meta}>
            {product.rating && (
              <span className={styles.rating}>
                Rating: {product.rating}/5
              </span>
            )}
            <span className={styles.id}>SKU: {product.id}</span>
          </div>

          {/* Цена */}
          <div className={styles.priceSection}>
            <span className={styles.price}>{product.price} ₽</span>
            <BtnFavorite isFavorite={isFavorite} id={product.id} />
          </div>

          {/* Описание */}
          {product.description && (
            <div className={styles.description}>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
          )}

          {/* Цвета */}
          {product.colors?.length > 0 && (
            <div className={styles.colorSection}>
              <h3>Available Colors:</h3>
              <div className={styles.colorOptions}>
                {product.colors.map(color => (
                  <div key={color.id} className={styles.colorOption}>
                    <span 
                      className={`${styles.colorSwatch} ${color.title === 'White' ? styles.white : ''}`}
                      style={{ backgroundColor: color.code }}
                      title={color.title}
                      aria-label={color.title}
                    />
                    <span className={styles.colorName}>{color.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Кнопка заказа */}
          <button 
            className={styles.orderButton}
            disabled={product.status !== 'active'}
            aria-label="Add to cart"
          >
            {product.status === 'active' ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </main>
  );
}