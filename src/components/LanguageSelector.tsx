'use client'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

const locales = ['en', 'es'] as const
type Locale = typeof locales[number]

export default function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale
    
    // Use the internationalized router for proper language switching
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <select
      onChange={handleLanguageChange}
      value={locale}
      className="bg-transparent text-white text-lg font-light border border-white/20 rounded-lg px-2 py-1 focus:outline-none focus:border-white/40 cursor-pointer"
      aria-label="Select language"
    >
      <option value="en" className="bg-gray-900">English</option>
      <option value="es" className="bg-gray-900">Español</option>
    </select>
  )
} 