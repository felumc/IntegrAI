'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: any
    ) => void;
  }
}

interface AnalyticsEventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((params: AnalyticsEventParams) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', params.action, {
        event_category: params.category,
        event_label: params.label,
        value: params.value,
        ...params.custom_parameters,
      });
    }
  }, []);

  const trackPageView = useCallback((url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_location: url,
        page_title: title || document.title,
      });
    }
  }, []);

  const trackPurchase = useCallback((transactionId: string, value: number, currency: string = 'USD', items?: any[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items,
      });
    }
  }, []);

  const trackCustomEvent = useCallback((eventName: string, parameters: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackPurchase,
    trackCustomEvent,
  };
}; 