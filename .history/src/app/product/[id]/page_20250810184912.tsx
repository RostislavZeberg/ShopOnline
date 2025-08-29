import { notFound } from 'next/navigation';
import { IProductWithCategory } from '@/types/interface';
import { BtnFavorite } from '@/components/BtnFavorite';
// import { ProductGallery } from '@/components/ProductGallery';
// import { ProductInfo } from '@/components/ProductInfo';
// import { ProductActions } from '@/components/ProductActions';
import styles from './page.module.scss';
import Link from 'next/link';
import { getProductById } from '@/services/api';

async function getProduct(id: string): Promise<IProductWithCategory | null> {
  try {
    const res = await getProductById(Number(id));
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs}>
          <Link href="/">Главная</Link>
          <span> / </span>
          <Link href={`/category/${product.categoryId}`}>
            {product.categoryId}
          </Link>
          <span> / </span>
          <span>{product.title}</span>
        </nav>

        {/* Основная информация */}
        <div className={styles.grid}>
          {/* Галерея изображений */}
          <ProductGallery images={product.images} />

          {/* Информация о товаре */}
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.article}>Арт: {product.article}</span>
              <span className={styles.rating}>
                Рейтинг: {product.rating} / 5
              </span>
            </div>

            <ProductInfo 
              description={product.description}
              characteristics={product.characteristics}
            />

            <div className={styles.price_block}>
              <div className={styles.price}>
                {product.discountPrice ? (
                  <>
                    <span className={styles.price_current}>
                      {product.discountPrice} ₽
                    </span>
                    <span className={styles.price_old}>{product.price} ₽</span>
                  </>
                ) : (
                  <span className={styles.price_current}>{product.price} ₽</span>
                )}
              </div>

              <BtnFavorite 
                isFavorite={product.isFavorite} 
                id={product.id} 
                className={styles.favorite}
              />
            </div>

            <ProductActions 
              productId={product.id}
              available={product.inStock > 0}
            />
          </div>
        </div>

        {/* Дополнительные секции */}
        {product.relatedProducts && (
          <section className={styles.related}>
            <h2>С этим товаром покупают</h2>
            <div className={styles.related_grid}>
              {product.relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}