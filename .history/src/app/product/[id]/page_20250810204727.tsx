import { notFound } from 'next/navigation';
import { getProductById } from '@/services/api';
import { useProductData } from '@/hooks/useProductData';
import { Key } from 'react';
import { BtnFavorite } from '@/components/BtnFavorite';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(Number(params.id));

  const { getCategoryName, checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(product.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div>
        <img
          src={product.image.file.url}
          alt={product.title}
          loading="lazy"
          width={300}
          height={300}
        />
      </div>
      <div>
        <div>
          <h2>{product.title}</h2>
          <p>Цена: {product.price} ₽</p>
          <p>
            Категория: {getCategoryName(product.categoryId)}
          </p>
          <div className='item__color color'>
            <p className="color__title">Цвет:</p>
            {product.colors.map((color: { id: Key | null | undefined; title: string | undefined; code: any; }) => (
              <span
                key={color.id}
                className={`color__mark ${color.title === "Белый" ? "color__mark--white" : ""}`}
                style={{ backgroundColor: color.code }}
                title={color.title}
                aria-label={`Цвет: ${color.title}`}
              />
            ))}
          </div>
        </div>
        <button className="btn-order btn btn-reset" aria-label="Заказать">
          <span className="btn-order__icon" />
          <span>Заказать</span>
        </button>
      </div>
      <BtnFavorite isFavorite={isFavorite} id={product.id} />
    </div>
  );
}