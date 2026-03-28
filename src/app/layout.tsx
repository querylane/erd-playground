import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'ERD Playground — Paste SQL, See Your Schema',
  description:
    'Paste PostgreSQL DDL and instantly visualize your database schema as an ER diagram. No signup, no install — runs entirely in your browser.',
  openGraph: {
    siteName: 'ERD Playground',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
