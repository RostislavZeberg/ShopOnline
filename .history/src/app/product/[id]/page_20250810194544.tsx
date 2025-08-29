// app/product/[id]/page.tsx
import { notFound } from 'next/navigation';
import { IProductWithCategory } from '@/types/interface';

import ProductClient from './ProductClient';
import { getProductById } from '@/services/api';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(Number(params.id));
  
  if (!product) {
    return {
      title: 'Товар не найден',
    };
  }

  return {
    title: `${product.title} | Магазин`,
    description: product.description,
    openGraph: {
      images: [product.image.file.url],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(Number(params.id));

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}