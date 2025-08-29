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
    <>
      {product}
    </>
  );
}