"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSelector from './LanguageSelector';
import { useParams } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

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
    
    return (
        <nav className="absolute top-0 left-0 w-full z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="text-xl md:text-2xl text-white tracking-tight font-light">IntegrAI</div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-10 items-center">
                        <a href="#home" className="text-white text-lg font-light hover:opacity-80 transition">{t('home')}</a>
                        <a href="#services" className="text-white text-lg font-light hover:opacity-80 transition">{t('services')}</a>
                        <a href="#about" className="text-white text-lg font-light hover:opacity-80 transition">{t('about')}</a>
                        <a href="#contact" className="text-white text-lg font-light hover:opacity-80 transition">{t('contact')}</a>
                        <LanguageSelector />
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
                    <div className="md:hidden bg-black/95 backdrop-blur-md absolute top-16 left-0 right-0 py-6 px-4 rounded-b-2xl shadow-lg">
                        <div className="flex flex-col space-y-4">
                            <a 
                                href="#home" 
                                className="text-white text-lg font-light hover:opacity-80 transition py-2"
                                onClick={closeMobileMenu}
                            >
                                {t('home')}
                            </a>
                            <a 
                                href="#services" 
                                className="text-white text-lg font-light hover:opacity-80 transition py-2"
                                onClick={closeMobileMenu}
                            >
                                {t('services')}
                            </a>
                            <a 
                                href="#about" 
                                className="text-white text-lg font-light hover:opacity-80 transition py-2"
                                onClick={closeMobileMenu}
                            >
                                {t('about')}
                            </a>
                            <a 
                                href="#contact" 
                                className="text-white text-lg font-light hover:opacity-80 transition py-2"
                                onClick={closeMobileMenu}
                            >
                                {t('contact')}
                            </a>
                            <div className="pt-4">
                                <LanguageSelector />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 