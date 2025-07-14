"use client"
import React, { useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import LanguageSelector from './LanguageSelector';
import BlogLanguageSelector from './BlogLanguageSelector';
import { useParams } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const params = useParams();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const t = useTranslations('common.navbar');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Check if we're on a blog page
    const isBlogPage = pathname.startsWith('/blog');
    const isBlogPostPage = pathname.startsWith('/blog/') && pathname !== '/blog';
    const currentSlug = isBlogPostPage ? params.slug as string : undefined;

    // Choose the appropriate language selector
    const LanguageSelectorComponent = isBlogPage ? 
        <BlogLanguageSelector currentSlug={currentSlug} /> : 
        <LanguageSelector />;
    
    return (
        <nav className="absolute top-0 left-0 w-full z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="text-xl md:text-2xl text-white tracking-tight font-light">IntegrAI</div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-10 items-center">
                        <Link href="/#home" className="text-white text-lg font-light hover:opacity-80 transition">{t('home')}</Link>
                        <Link href="/#services" className="text-white text-lg font-light hover:opacity-80 transition">{t('services')}</Link>
                        <Link href="/#about" className="text-white text-lg font-light hover:opacity-80 transition">{t('about')}</Link>
                        <Link href="/blog" className="text-white text-lg font-light hover:opacity-80 transition">{t('blog')}</Link>
                        <Link href="/#contact" className="text-white text-lg font-light hover:opacity-80 transition">{t('contact')}</Link>
                        {LanguageSelectorComponent}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-white text-2xl focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm">
                        <div className="flex flex-col space-y-4 p-4">
                            <Link href="/#home" className="text-white text-lg font-light hover:opacity-80 transition" onClick={closeMobileMenu}>{t('home')}</Link>
                            <Link href="/#services" className="text-white text-lg font-light hover:opacity-80 transition" onClick={closeMobileMenu}>{t('services')}</Link>
                            <Link href="/#about" className="text-white text-lg font-light hover:opacity-80 transition" onClick={closeMobileMenu}>{t('about')}</Link>
                            <Link href="/blog" className="text-white text-lg font-light hover:opacity-80 transition" onClick={closeMobileMenu}>{t('blog')}</Link>
                            <Link href="/#contact" className="text-white text-lg font-light hover:opacity-80 transition" onClick={closeMobileMenu}>{t('contact')}</Link>
                            <div className="pt-2">
                                {LanguageSelectorComponent}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 