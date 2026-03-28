import { JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--code-font',
})

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
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { opacity: 0; }
              body.ready { opacity: 1; transition: opacity 0.15s; }
            `,
          }}
        />
      </head>
      <body className={jetbrainsMono.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.classList.add('ready')`,
          }}
        />
      </body>
    </html>
  )
}
