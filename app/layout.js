import React from 'react';
import { DM_Sans } from 'next/font/google';

import { getComponentData } from '../lib/strapi';

import { PromoBar, Navbar } from '../page-components';

import './_globals.scss';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Waba',
  description: 'Waba',
};

const dmSans = DM_Sans({
  variable: '--dmSans-font',
  subsets: ['latin'],
  display: 'swap',
  style: 'normal',
});

export default async function RootLayout({ children }) {
  const promobarData = await getComponentData('promobar');
  const navbarData = await getComponentData('navbar');

  return (
    <html lang="en">
      <body className={dmSans.className}>
        <div className="sticky top-0 z-50">
          <PromoBar promobarData={promobarData.attributes} />
          <Navbar navbarData={navbarData.attributes} />
        </div>
        {children}
      </body>
    </html>
  );
}
