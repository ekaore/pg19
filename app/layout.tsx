import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'ПЖ19',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}

