"use client";
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BtnFavorite } from '@/components/BtnFavorite';
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
  const { checkIsFavorite } = useProductData();
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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!product) notFound();

  return (
    <main>
      <section>
        {/* Галерея изображений */}
        <div>
          <div>
            <Image
              src={product.image.file.url}
              alt={product.title}
              width={600}
              height={600}
              quality={85}
              priority
            />
          </div>
        </div>

        {/* Информация о товаре */}
        <div>
          <h1>{product.title}</h1>

          <div>
            <span>{product.price} ₽</span>
            <BtnFavorite isFavorite={isFavorite} id={product.id} />
          </div>

          {product.category && (
            <p>
              Категория: <span>{product.category.name}</span>
            </p>
          )}

          {product.description && (
            <div>
              <h2>Описание</h2>
              <p>{product.description}</p>
            </div>
          )}

          {/* Цвета */}
          {product.colors?.length > 0 && (
            <div>
              <h3>Доступные цвета:</h3>
              <div>
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    title={color.title}
                    aria-label={`Цвет: ${color.title}`}
                  >
                    <span>{color.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            aria-label="Добавить в корзину"
          >
            <span>Добавить в корзину</span>
          </button>
        </div>
      </section>
    </main>
  );
}

