import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './Footer'
import Navbar from '../../components/NavBar'
import GoogleAnalytics from '../../components/GoogleAnalytics'
import WhatsAppButton from '../../components/WhatsAppButton'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IntegrAI - AI Integration Solutions for SMEs',
  description: 'Transform your business with cutting-edge AI integration solutions tailored for small and medium-sized enterprises.',
  icons: {
    icon: '/integrai-logo.jpeg'
  }
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
    <html lang={locale} style={{ scrollBehavior: 'smooth' }}>
      <head>
        <GoogleAnalytics measurementId='G-MEZSQPPVF1' />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <WhatsAppButton 
            phoneNumber='525663879864'
            floating={true}
            size="md"
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 