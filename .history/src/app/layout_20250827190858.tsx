import { Inter } from 'next/font/google'
import { ReduxProvider } from './ReduxProvider';
import type { Metadata } from 'next'

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import '@/styles/globals.scss';
import { Scrollbar } from '@/components/Scrollbar';

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
        <ReduxProvider> {/* Redux доступен везде */}
          <Scrollbar />
          <Header /> {/* Может использовать useSelector/useDispatch */}
          <>{children}</>
          <Footer /> {/* Может использовать useSelector/useDispatch */}
        </ReduxProvider>
      </body>
    </html>
  )
}
