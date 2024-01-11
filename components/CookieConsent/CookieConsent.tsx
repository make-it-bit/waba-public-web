import { Button } from '@/gui-components/client';
import React from 'react';
import Link from 'next/link';

const CookieConsent = () => {
  return (
    <div className="w-full flex items-center justify-center fixed bottom-0 m-auto bg-black-100">
      <div className="container">
        <div className="flex justify-between items-center py-12">
          <p className="text-neutral-100 m-0">
            This site uses cookies – please read more from our{' '}
            <Link className="underline" href="/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
          </p>
          <Button CTA="OK" style="tertiary" />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
