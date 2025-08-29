export type FacebookPixelEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function isFacebookPixelEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_FB_PIXEL_ID);
}

export function initFacebookPixel(): void {
  if (typeof window === 'undefined') return;
  if (!isFacebookPixelEnabled()) return;
  if (typeof window.fbq !== 'function') return; // base snippet bootstraps fbq
  window.fbq('init', process.env.NEXT_PUBLIC_FB_PIXEL_ID as string);
}

export function trackFacebookEvent(event: FacebookPixelEventName, params?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;
  if (params) {
    window.fbq('track', event, params);
  } else {
    window.fbq('track', event);
  }
}

export function trackPageView(): void {
  trackFacebookEvent('PageView');
}


