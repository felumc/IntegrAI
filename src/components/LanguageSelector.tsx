'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const locales = ['en', 'es'] as const
type Locale = typeof locales[number]

export default function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale
    
    // Get the current path without the locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?:\/|$)/, '/')
    
    // Set the locale cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    
    // Navigate to the new path
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  // Extract current locale from pathname
  const currentLocale = locales.find(locale => pathname.startsWith(`/${locale}`)) || 'en'

  return (
    <select
      onChange={handleLanguageChange}
      value={currentLocale}
      className="bg-transparent text-white text-lg font-light border border-white/20 rounded-lg px-2 py-1 focus:outline-none focus:border-white/40 cursor-pointer"
      aria-label="Select language"
    >
      <option value="en" className="bg-gray-900">English</option>
      <option value="es" className="bg-gray-900">Español</option>
    </select>
  )
} 