import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './Footer'
import Navbar from '../../components/NavBar'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'integrAI - AI Integration Solutions for SMEs',
  description: 'Transform your business with cutting-edge AI integration solutions tailored for small and medium-sized enterprises.',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={messages}>
      <html lang="en" style={{ scrollBehavior: 'smooth' }}>
        <body className={inter.className}>
          <Navbar />

          {children}

        </body>
      </html>
    </NextIntlClientProvider>
  )
} 