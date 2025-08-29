



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

//   // Загрузка данных товара
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productData = await getProductById(productId);

//         if (!productData) {
//           notFound();
//           return;
//         }

//         setProduct(productData);
//       } catch (err) {
//         setError('Не удалось загрузить товар');
//         console.error('Ошибка загрузки товара:', err);
//         notFound();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

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
//           <div className="bg-gray-100 rounded-lg overflow-hidden">
//             <Image
//               src={product.image.file.url}
//               alt={product.title}
//               width={600}
//               height={600}
//               className="w-full h-auto object-contain"
//               priority
//               quality={85}
//               // Добавляем placeholder для плавной загрузки
//               placeholder="blur"
//               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
//             />
//           </div>

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