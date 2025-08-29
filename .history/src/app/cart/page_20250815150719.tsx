import Cart from '@/components/Cart/Cart'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart | Shop Online',
  robots: 'noindex', // Чтобы поисковики не индексировали корзины
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <Cart />
    </div>
  )
}