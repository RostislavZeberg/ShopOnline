import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
