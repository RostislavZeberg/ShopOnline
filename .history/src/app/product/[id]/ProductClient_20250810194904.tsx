'use client';

import { ProductGallery } from '@/components/ProductGallery';
import { ProductActions } from '@/components/ProductActions';
import { BtnFavorite } from '@/components/BtnFavorite';
import styles from './page.module.scss';
import { IProductWithCategory } from '@/types/interface';
import { useProductData } from '@/hooks/useProductData';

export default function ProductClient({ 
  product 
}: { 
  product: IProductWithCategory 
}) {
    const { getCategoryName, checkIsFavorite } = useProductData();
    const isFavorite = checkIsFavorite(product.id);
  return (
    <div className={styles.product}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs}>
          <a href="/">Главная</a>
          <span> / </span>
          <a href={`/category/${product.categoryId}`}>
            {product.categoryId}
          </a>
          <span> / </span>
          <span>{product.title}</span>
        </nav>

        {/* Основная информация */}
        <div className={styles.grid}>
          <ProductGallery images={[product.image]} />
          
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.article}>Арт: {product.id}</span>
              {/* {product.rating && (
                <span className={styles.rating}>
                  Рейтинг: {product.rating} / 5
                </span>
              )} */}
            </div>

            <div className={styles.description}>
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.price_block}>
              <div className={styles.price}>
                {product.price} ₽
              </div>

              <BtnFavorite isFavorite={isFavorite} id={product.id} />
            </div>

            <ProductActions 
              productId={product.id}
              available={product.status === 'active'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}