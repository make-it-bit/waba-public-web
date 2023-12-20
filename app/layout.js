import React from 'react';
import { DM_Sans } from 'next/font/google';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <div className="sticky top-0 z-50">
          <PromoBar />
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
