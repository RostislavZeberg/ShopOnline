"use client";
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';

import { getProductById } from '@/services/api';
import { useProductData } from '@/hooks/useProductData';
import { BtnFavorite } from '@/components/BtnFavorite';
import { IProduct } from '@/types/productsTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import styles from "./page.module.scss";
import Link from 'next/link';
import { setFilters } from '@/store/slices/filterSlice';
import { applyFilters } from '@/store/slices/productsSlice';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Извлекаем параметры маршрута
  const { id } = use(params);
  const productId = Number(id);

  // Состояния компонента
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentCurrency = useAppSelector((state) => state.currencySlice.currentCurrency);

  const nf = new Intl.NumberFormat();

  const convertPrice = (price: number) => {
    return nf.format(Number((price * currentCurrency.rate).toFixed(0)));
  };

  // Хук для работы с избранным
  const { checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(productId);

  // Загрузка данных товара
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);

        if (!productData) {
          notFound();
          return;
        }

        setProduct(productData);
      } catch (err) {
        setError('Не удалось загрузить товар');
        console.error('Ошибка загрузки товара:', err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    { product && dispatch(addToCart(product.id)); }
  };

  // Состояния загрузки
  if (loading) return <div className="p-4 text-center">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  if (!product) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href={'/'} className={styles.link}>Каталог</Link>
        <span>&gt;</span>
        <Link href={`/category/${product.category.title}`} className={styles.link}>{product.category.title}</Link>
        <span>&gt;</span>
        <span className={styles.link}>{product.title}</span>
      </div>

      <div className={styles.product}>
        <div className={styles.gallery}>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image.file.url}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
              quality={85}
              // Добавляем placeholder для плавной загрузки
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            />
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceSection}>
            <span className={styles.price}>
              {convertPrice(product.price)} {currentCurrency.symbol}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.addToCart}
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </button>
            <BtnFavorite isFavorite={isFavorite} id={product.id} />
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Категория:</span>
              <span className={styles.detailValue}>{product.category.title}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Цвет:</span>
              <div className={styles.colors}>
                {product.colors.map((color) => (
                  <span
                    key={color.id}
                    className={`${styles.color} ${color.title === "Белый" ? styles.white : ''}`}
                    style={{ backgroundColor: color.code }}
                    title={color.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import { notFound } from 'next/navigation';
// import { use, useEffect, useState } from 'react';
// import Image from 'next/image';
// import { getProductById } from '@/services/api';
// import { useProductData } from '@/hooks/useProductData';
// import { BtnFavorite } from '@/components/BtnFavorite';
// import { IProduct } from '@/types/productsTypes';

// export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
//   // Извлекаем параметры маршрута
//   const { id } = use(params);
//   const productId = Number(id);

//   // Состояния компонента
//   const [product, setProduct] = useState<IProduct | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Хук для работы с избранным
//   const { checkIsFavorite } = useProductData();
//   const isFavorite = checkIsFavorite(productId);

// // Загрузка данных товара
// useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const productData = await getProductById(productId);

//       if (!productData) {
//         notFound();
//         return;
//       }

//       setProduct(productData);
//     } catch (err) {
//       setError('Не удалось загрузить товар');
//       console.error('Ошибка загрузки товара:', err);
//       notFound();
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProduct();
// }, [productId]);

//   // Состояния загрузки
//   if (loading) return <div className="p-4 text-center">Загрузка...</div>;
//   if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
//   if (!product) notFound();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <article className="max-w-4xl mx-auto">
//         <header className="mb-6">
//           <h1 className="text-3xl font-bold">{product.title}</h1>
//           <BtnFavorite
//             isFavorite={isFavorite}
//             id={productId}
//           />
//         </header>

//         <section className="grid md:grid-cols-2 gap-8">
//           {/* Изображение товара */}
// <div className="bg-gray-100 rounded-lg overflow-hidden">
//   <Image
//     src={product.image.file.url}
//     alt={product.title}
//     width={600}
//     height={600}
//     className="w-full h-auto object-contain"
//     priority
//     quality={85}
//     // Добавляем placeholder для плавной загрузки
//     placeholder="blur"
//     blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
//   />
// </div>

//           {/* Информация о товаре */}
//           <div className="space-y-6">
//             {/* Описание */}
//             {product.content && (
//               <div>
//                 <h2 className="text-xl font-semibold">Описание</h2>
//                 <p className="mt-2 text-gray-700">{product.content}</p>
//               </div>
//             )}

//             {/* Цена и категория */}
//             <div className="space-y-4">
//               {product.price && (
//                 <p className="text-2xl">
//                   Цена: <strong>{product.price} ₽</strong>
//                 </p>
//               )}
//               {product.category && (
//                 <p className="text-gray-700">
//                   Категория: {product.category.title}
//                 </p>
//               )}
//             </div>

//             {/* Кнопка добавления в корзину */}
//             <button
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors"
//               aria-label="Добавить в корзину"
//             >
//               Добавить в корзину
//             </button>
//           </div>
//         </section>
//       </article>
//     </div>
//   );
// }
// 