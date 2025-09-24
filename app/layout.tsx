import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GeoProp AI - Decentralized Esports Betting',
  description: 'AI-powered geo-localized esports prop betting on IoTeX blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="neural-grid min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}