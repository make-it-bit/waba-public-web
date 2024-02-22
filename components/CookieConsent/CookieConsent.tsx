'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/gui-components/client';

const CookieConsent = () => {
  const [displayCookieConsent, setDisplayCookieConsent] = useState(true);
  const [displayReadMore, setDisplayReadMore] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('gtaConsent') === 'granted') setDisplayCookieConsent(false);
  }, []);

  const setCookieConsent = (status) => {
    if (status === 'granted') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      localStorage.setItem('gtaConsent', 'granted');
    } else {
      localStorage.setItem('gtaConsent', 'denied');
    }
    setDisplayCookieConsent(false);
  };

  return (
    displayCookieConsent && (
      <div className="w-full flex items-center justify-center fixed bottom-0 m-auto bg-black-100 z-[420]">
        <div className="container">
          <div className="flex flex-col">
            <div className="flex justify-between items-center py-12">
              <p className="text-neutral-100 m-0">
                This site uses cookies. Please read more from our{' '}
                <Link className="underline" href="/privacy-policy" target="_blank">
                  Privacy Policy.
                </Link>
              </p>
              <div className="flex gap-16">
                <Button
                  CTA="Accept all"
                  style="tertiary"
                  onClick={() => {
                    setCookieConsent('granted');
                  }}
                />
                <Button
                  CTA="Accept necessary"
                  style="quaternary"
                  onClick={() => {
                    setCookieConsent('denied');
                  }}
                />
                <Button
                  CTA={displayReadMore ? 'Show less' : 'Read more'}
                  style="quaternary"
                  onClick={() => {
                    setDisplayReadMore(!displayReadMore);
                  }}
                />
              </div>
            </div>
            {displayReadMore && (
              <div className="w-full">
                <p className="text-neutral-100 my-12">
                  Waba uses Google Tag Manager and Google Analytics to analyse the usage of content and user actions
                  with essential interface components. Waba never shares your personal data with advertisers or 3rd
                  parties. Please read more from our{' '}
                  <Link className="underline" href="/privacy-policy" target="_blank">
                    Privacy Policy!
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
