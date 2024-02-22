import React from 'react';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { DM_Sans } from 'next/font/google';
import classNames from 'classnames';

import { getComponentData } from '@/lib/strapi';

import { CookieConsent } from '@/components';
import { PromoBar, Navbar } from '@/page-components';

import './_globals.scss';

const dmSans = DM_Sans({
  variable: '--dmSans-font',
  subsets: ['latin'],
  display: 'swap',
  style: 'normal',
  weight: ['400', '500', '700'],
});

export const dynamic = 'force-static';

export const metadata = {
  title: 'Discover Liberating Beauty',
  description: 'Innovative light-based device that is more than just a skincare.',
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_BASE_URL}/`),
};

export default async function RootLayout({ children }) {
  const promobarData = await getComponentData('promobar');
  const navbarData = await getComponentData('navbar');

  return (
    <html lang="en">
      <body className={classNames('min-h-screen flex flex-col', dmSans.className)}>
        {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
        <Script id="google-tag-manager-consent" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
            });
          `}
        </Script>
        <div className="sticky top-0 z-[500]">
          <PromoBar promobarData={promobarData.attributes} />
          <Navbar navbarData={navbarData.attributes} />
        </div>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
