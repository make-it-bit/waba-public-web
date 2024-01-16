'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/gui-components/client';

const CookieConsent = () => {
  const [useHasAgreedToCookies, setHasAgreedToCookies] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('hasAgreedToCookies')) setHasAgreedToCookies(true);
  }, []);

  if (useHasAgreedToCookies) return;

  return (
    <div className="w-full flex items-center justify-center fixed bottom-0 m-auto bg-black-100 z-[420]">
      <div className="container">
        <div className="flex justify-between items-center py-12">
          <p className="text-neutral-100 m-0">
            This site uses cookies – please read more from our{' '}
            <Link className="underline" href="/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
          </p>
          <Button
            CTA="OK"
            style="tertiary"
            onClick={() => {
              localStorage.setItem('hasAgreedToCookies', 'true');
              setHasAgreedToCookies(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
