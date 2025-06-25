import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AWI',
  description: 'Warehouse Management system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
