import { notFound } from 'next/navigation';
import { getProductById } from '@/services/api';
import Image from 'next/image';


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
    <div >
      <article >
        {/* Заголовок и основная информация */}
        <header >
          <h1 >{product.title}</h1>
          <p >Артикул: {params.id}</p>
        </header>

        {/* Контент товара */}
        <section >
          {/* Изображение товара */}
          <div >
            <Image
              src={product.image.file.url}
              alt={product.title}
              width={600}
              height={600}
              
              priority
              quality={85}
            />
          </div>

          {/* Описание и детали */}
          <div >
            {product.description && (
              <div >
                <h2 >Описание</h2>
                <p >{product.description}</p>
              </div>
            )}

            {/* Дополнительные характеристики */}
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