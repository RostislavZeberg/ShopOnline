
import { FavoritesList } from '@/components/FavoritesList/FavoritesList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorites Products | Shop Online',
  robots: 'noindex', // Чтобы поисковики не индексировали корзины
}

export default function CartPage() {
  return (
    <FavoritesList />
  )
}