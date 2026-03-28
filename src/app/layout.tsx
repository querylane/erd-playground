import { JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import type React from 'react'
import '@liam-hq/ui/src/styles/globals.css'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
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

const fontFamily = [
  "'JetBrains Mono'",
  'Monaco',
  'Menlo',
  "'Ubuntu Mono'",
  'Consolas',
  'monospace',
].join(', ')

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --main-font: ${fontFamily} !important;
                --code-font: ${fontFamily} !important;
                --font-size-1: 12px !important;
                --font-size-2: 13px !important;
                --font-size-3: 13px !important;
                --font-size-4: 14px !important;
              }
            `,
          }}
        />
      </head>
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}
