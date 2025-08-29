import { notFound } from 'next/navigation';
import { IProductWithCategory } from '@/types/interface';
import { BtnFavorite } from '@/components/BtnFavorite';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductActions } from '@/components/ProductActions';
import { getProductById } from '@/services/api';
import styles from './page.module.scss';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(Number(params.id));
  
  if (!product) {
    return {
      title: 'Товар не найден',
    };
  }

  return {
    title: `${product.title} | Магазин`,
    description: product.description,
    openGraph: {
      images: [product.image.file.url],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(Number(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs}>
          <a href="/">Главная</a>
          <span> / </span>
          <a href={`/category/${product.category.id}`}>
            {product.category.title}
          </a>
          <span> / </span>
          <span>{product.title}</span>
        </nav>

        {/* Основная информация */}
        <div className={styles.grid}>
          {/* Галерея изображений */}
          <ProductGallery images={[product.image]} />

          {/* Информация о товаре */}
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.article}>Арт: {product.id}</span>
              {product.rating && (
                <span className={styles.rating}>
                  Рейтинг: {product.rating} / 5
                </span>
              )}
            </div>

            <div className={styles.description}>
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>

            {product.material && (
              <div className={styles.material}>
                <h3>Материал</h3>
                <p>{product.material}</p>
              </div>
            )}

            <div className={styles.price_block}>
              <div className={styles.price}>
                {product.price} ₽
              </div>

              <BtnFavorite 
                productId={product.id}
                className={styles.favorite}
              />
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