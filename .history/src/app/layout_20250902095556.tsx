import { Inter } from 'next/font/google'
import { ReduxProvider } from './ReduxProvider';
import type { Metadata } from 'next'

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true, // Разрешаем предзагрузку шрифта
})

export const metadata: Metadata = {
  title: "Shop Online",
  description: "There is a huge selection of products in our Shop Online",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  other: {
    'theme-color': '#4b6cb7',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ReduxProvider> 
          <Header />
          <>{children}</>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
