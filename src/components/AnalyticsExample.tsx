'use client';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function AnalyticsExample() {
  const { trackEvent, trackCustomEvent, trackPageView } = useAnalytics();

  const handleButtonClick = () => {
    trackEvent({
      action: 'click',
      category: 'button',
      label: 'hero_cta_button',
      value: 1,
    });
  };

  const handleNewsletterSignup = () => {
    trackEvent({
      action: 'signup',
      category: 'newsletter',
      label: 'footer_newsletter',
      custom_parameters: {
        method: 'email',
        source: 'footer',
      },
    });
  };

  const handleContactForm = () => {
    trackCustomEvent('contact_form_submit', {
      form_type: 'contact',
      page_location: window.location.href,
      user_type: 'prospect',
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Track Button Click
      </button>
      
      <button
        onClick={handleNewsletterSignup}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Track Newsletter Signup
      </button>
      
      <button
        onClick={handleContactForm}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Track Contact Form
      </button>
    </div>
  );
} 