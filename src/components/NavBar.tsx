"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSelector from './LanguageSelector';
import { useParams } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

interface Translations {
    navbar: {
        home: string;
        services: string;
        about: string;
        contact: string;
    };
}

export default function Navbar() {
    const pathname = usePathname();
    const params = useParams();
    const locale = params.locale || 'es'; // default to 'en' if no locale
    const [translations, setTranslations] = useState<Translations | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        async function loadTranslations() {
            try {
                const response = await fetch(`/locales/${locale}/common.json`);
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error("Error loading translations:", error);
                // Handle the error appropriately, perhaps display a fallback message.
                setTranslations(null);  // Set to an empty object to prevent crashes
            }
        }

        loadTranslations();
    }, [locale]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    if (!translations) {
        return <div>Loading translations...</div>; // Or some other loading indicator
    }
    
    return (
        <nav className="absolute top-0 left-0 w-full z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="text-xl md:text-2xl text-white tracking-tight font-light">IntegrAI</div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-10 items-center">
                        <a href="#home" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.home}</a>
                        <a href="#services" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.services}</a>
                        <a href="#about" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.about}</a>
                        <a href="#contact" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.contact}</a>
                        {/* <LanguageSelector /> */}
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
                                {translations.navbar.home}
                            </a>
                            <a 
                                href="#services" 
                                className="text-white text-lg font-light hover:opacity-80 transition py-2"
                                onClick={closeMobileMenu}
                            >
                                {translations.navbar.services}
                            </a>
                            <a 
                                href="#about" 
                                className="text-white text-lg font-light hover:opacity-80 transition py-2"
                                onClick={closeMobileMenu}
                            >
                                {translations.navbar.about}
                            </a>
                            <a 
                                href="#contact" 
                                className="text-white text-lg font-light hover:opacity-80 transition py-2"
                                onClick={closeMobileMenu}
                            >
                                {translations.navbar.contact}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 