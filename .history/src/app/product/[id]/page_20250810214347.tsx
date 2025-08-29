"use client";
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/api';

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        const data = await response.json();
        if (!data) notFound();
        setProduct(data);
      } catch (error) {
        console.error(error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) notFound();

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