import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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

