import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './Footer'
import Navbar from '../components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'integrAI - AI Integration Solutions for SMEs',
  description: 'Transform your business with cutting-edge AI integration solutions tailored for small and medium-sized enterprises.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={inter.className}>
        <Navbar />

        {children}

      </body>
    </html>
  )
} 