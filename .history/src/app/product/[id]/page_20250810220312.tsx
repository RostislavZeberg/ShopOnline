"use client"
import { notFound } from 'next/navigation';
import { getProductById } from '@/services/api';
import { use, useEffect, useState } from 'react';
import { useProductData } from '@/hooks/useProductData';
import { IProduct } from '@/types/interface';


export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Правильное извлечение параметров
  const { id } = use(params);
  const productId = Number(id);

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(productId);

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
        setError('Failed to load product');
        console.error('Error fetching product:', err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) notFound();

  return (
    <div >
      <article >
        <header >
          <h1 >{product.title}</h1>          
        </header>

        <section >

          <div >
            <img
              src={product.image.file.url}
              alt={product.title}
              width={600}
              height={600}
            />
          </div>

          <div >
            {product.content && (
              <div >
                <h2 >Описание</h2>
                <p >{product.content}</p>
              </div>
            )}

            <div >
              {product.price && (
                <p >
                  Цена: <strong>{product.price} ₽</strong>
                </p>
              )}
              {product.category && (
                <p >
                  Категория: {product.category.title}
                </p>
              )}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}