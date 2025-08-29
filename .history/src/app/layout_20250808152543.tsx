import { Inter } from 'next/font/google'
import { ReduxProvider } from './ReduxProvider';
import type { Metadata } from 'next'

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Shop Online",
  description: "There is a huge selection of products in our Shop Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider> {/* Теперь Redux доступен везде */}
          <Header /> {/* Может использовать useSelector/useDispatch */}
          <main>{children}</main>
          <Footer /> {/* Может использовать useSelector/useDispatch */}
        </ReduxProvider>
      </body>
    </html>
  )
}
