import { Inter } from 'next/font/google'
import { ReduxProvider } from './ReduxProvider';
import type { Metadata } from 'next'

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import '@/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <html lang="en" className={inter.className}>
      <body>
        <ReduxProvider> {/* Redux доступен везде */}
          <Header /> {/* Может использовать useSelector/useDispatch */}
          <>{children}</>
          <Footer /> {/* Может использовать useSelector/useDispatch */}
        </ReduxProvider>
      </body>
    </html>
  )
}
