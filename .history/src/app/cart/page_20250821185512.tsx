import Cart from '@/components/CartPage/CartPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart | Shop Online',
  robots: 'noindex', // Чтобы поисковики не индексировали корзины
}

export default function CartPage() {
  return (
    <Cart />
  )
}