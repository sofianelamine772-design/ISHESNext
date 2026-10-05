'use client';
import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

export function AnalyticsTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href) {
        if (target.href.includes('wa.me')) {
          sendGAEvent('event', 'whatsapp_click', {
            link_url: target.href,
          });
        }
        if (target.href.startsWith('mailto:') || target.href.startsWith('tel:')) {
          sendGAEvent('event', 'contact_request', {
            link_url: target.href,
          });
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  return null;
}
