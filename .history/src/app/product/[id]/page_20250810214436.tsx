import { notFound } from 'next/navigation';
import { getProductById } from '@/services/api';
import { use } from 'react';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = use(params);
  const productId = Number(id);
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

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