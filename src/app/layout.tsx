import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './Footer'

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
    <html lang="en">
      <body className={inter.className}>
        <nav className="absolute top-0 left-0 w-full z-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <div className="text-2xl text-white tracking-tight font-light">IntegrAI</div>
              <div className="hidden md:flex space-x-10">
                <a href="#" className="text-white text-lg font-light hover:opacity-80 transition">Home</a>
                <a href="#services" className="text-white text-lg font-light hover:opacity-80 transition">Services</a>
                <a href="#about" className="text-white text-lg font-light hover:opacity-80 transition">About</a>
                <a href="#contact" className="text-white text-lg font-light hover:opacity-80 transition">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {children}

      </body>
    </html>
  )
} 