// app/product/[id]/page.tsx
import { notFound } from 'next/navigation';


import { getProductById } from '@/services/api';


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
    <div style={{ paddingTop: '150px' }}>
      <h1 className="product-title">{product.title}</h1>
      <p className="product-id">ID товара: {params.id}</p>
      {product.description && (
        <div className="product-description">
          <h2>Описание</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}