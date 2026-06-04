import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quencha — Product Catalog',
  description: 'Sip, Savor & Go. Complete Quencha product lineup.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
