'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { Button } from '@/gui-components/client';

const CookieConsent = ({ cookiesConsentData }) => {
  const [displayCookieConsent, setDisplayCookieConsent] = useState(true);
  const [displayReadMore, setDisplayReadMore] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem('gtaConsent')) setDisplayCookieConsent(true);
  }, []);

  const setCookieConsent = (status) => {
    if (status === 'granted') {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      window.localStorage.setItem('gtaConsent', 'granted');
    } else {
      window.localStorage.setItem('gtaConsent', 'denied');
    }
    setDisplayCookieConsent(false);
  };

  return (
    displayCookieConsent && (
      <div className="w-full flex items-center justify-center fixed bottom-0 m-auto bg-black-100 z-[420]">
        <div className="container">
          <div className="flex flex-col">
            <div className="flex flex-wrap sm:justify-between justify-center items-center gap-x-32 gap-y-16 py-12">
              <div className="text-base leading-base text-neutral-100 sm:text-justify text-center m-0">
                {cookiesConsentData.read_less_text && (
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{cookiesConsentData.read_less_text}</ReactMarkdown>
                )}
              </div>
              <div className="flex sm:flex-row flex-col gap-16 sm:w-auto w-full">
                <Button
                  CTA={cookiesConsentData.accept_all_button_text}
                  style="tertiary"
                  onClick={() => setCookieConsent('granted')}
                />
                <Button
                  CTA={cookiesConsentData.accept_necessary_button_text}
                  style="quaternary"
                  onClick={() => {
                    setCookieConsent('denied');
                  }}
                />
                <Button
                  CTA={
                    displayReadMore
                      ? cookiesConsentData.read_less_button_text
                      : cookiesConsentData.read_more_button_text
                  }
                  style="quaternary"
                  onClick={() => setDisplayReadMore(!displayReadMore)}
                />
              </div>
            </div>
            {displayReadMore && (
              <div className="w-full">
                <div className="text-base leading-base text-neutral-100 sm:text-justify text-center my-12">
                  {cookiesConsentData.read_more_text && (
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{cookiesConsentData.read_more_text}</ReactMarkdown>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
