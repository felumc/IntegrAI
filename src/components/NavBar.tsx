"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSelector from './LanguageSelector';
import { useParams } from 'next/navigation';

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

    if (!translations) {
        return <div>Loading translations...</div>; // Or some other loading indicator
    }
    return (
        <nav className="absolute top-0 left-0 w-full z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="text-2xl text-white tracking-tight font-light">IntegrAI</div>
                    <div className="hidden md:flex space-x-10 items-center">
                        <a href="#home" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.home}</a>
                        <a href="#services" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.services}</a>
                        <a href="#about" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.about}</a>
                        <a href="#contact" className="text-white text-lg font-light hover:opacity-80 transition">{translations.navbar.contact}</a>
                        {/* <LanguageSelector /> */}
                    </div>
                </div>
            </div>
        </nav>
    );
} 