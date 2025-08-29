"use client"
import { notFound } from 'next/navigation';
import { getProductById } from '@/services/api';
import { use, useEffect, useState } from 'react';
import { useProductData } from '@/hooks/useProductData';

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
  const { id } = use(params);
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        
        // Если продукт не получен, вызываем notFound
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

  return (
    <div >
      <article >
        <header >
          <h1 >{product.title}</h1>
          <p >Артикул: {params.id}</p>
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
            {product.description && (
              <div >
                <h2 >Описание</h2>
                <p >{product.description}</p>
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