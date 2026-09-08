import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin', 'vietnamese'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin', 'vietnamese'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Pathfinder — Khám phá hướng đi của riêng bạn',
  description: 'Hiểu tính cách, khám phá điểm mạnh và tìm những hướng nghề nghiệp có thể phù hợp với bạn.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f5ef',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className={`${geist.variable} ${geistMono.variable} bg-[#f6f5ef]`}><body className="font-sans antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
