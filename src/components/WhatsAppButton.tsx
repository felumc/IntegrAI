'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useTranslations } from 'next-intl';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  floating?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function WhatsAppButton({ 
  phoneNumber, 
  message = '', 
  className = '',
  floating = false,
  size = 'md'
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { trackEvent } = useAnalytics();
  const t = useTranslations('common.whatsapp');

  const defaultMessage = message || t('defaultMessage');
  
  const handleWhatsAppClick = () => {
    // Track the WhatsApp click event
    trackEvent({
      action: 'click',
      category: 'whatsapp',
      label: floating ? 'floating_button' : 'inline_button',
      value: 1,
      custom_parameters: {
        phone_number: phoneNumber,
        message_sent: defaultMessage ? 'yes' : 'no',
        button_location: floating ? 'floating' : 'inline'
      }
    });

    // Format phone number (remove any non-digits and add country code if needed)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}${defaultMessage ? `?text=${encodeURIComponent(defaultMessage)}` : ''}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (floating) {
    return (
      <div className="fixed bottom-6 right-6 z-50 md:mb-2">
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${sizeClasses[size]} bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group ${className}`}
          title={t('tooltip')}
        >
          <FaWhatsapp className="transition-transform group-hover:scale-110" />
        </button>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-90">
            {t('tooltip')}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1ea952] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${textSizeClasses[size]} ${className}`}
    >
      <FaWhatsapp className="text-xl" />
      <span>{t('contactUs')}</span>
    </button>
  );
} 