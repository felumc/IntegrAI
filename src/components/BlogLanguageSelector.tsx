'use client'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { findCorrespondingPost } from '@/data/blog'

const locales = ['en', 'es'] as const
type Locale = typeof locales[number]

interface BlogLanguageSelectorProps {
  currentSlug?: string;
}

export default function BlogLanguageSelector({ currentSlug }: BlogLanguageSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const params = useParams()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale
    
    // If we're on a specific blog post page, find the corresponding post in the target language
    if (currentSlug) {
      const correspondingSlug = findCorrespondingPost(currentSlug, locale, newLocale)
      if (correspondingSlug) {
        // Navigate to the corresponding post in the target language
        router.push(`/blog/${correspondingSlug}`, { locale: newLocale })
      } else {
        // If no corresponding post exists, go to the blog listing page
        router.push('/blog', { locale: newLocale })
      }
    } else {
      // For blog listing or other pages, use normal navigation
      router.replace(pathname, { locale: newLocale })
    }
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