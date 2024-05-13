'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { regex } from '@/utils/authValidation';

import { TextInput, Button } from '@/gui-components/client';

const Discounts = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = () => {
    try {
      if (email === '') {
        return setErrorMessage('Please enter your email.');
      }
      if (!regex.test(email)) {
        return setErrorMessage('Please enter a valid email.');
      }
      setSubscribed(true);
      setErrorMessage('');
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } catch (error) {
      console.log('error: ', error);
      setErrorMessage('Failed to subscribe. Try again later.');
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-12">
        <p className="font-rufina text-2xl leading-2xl">You have no discount codes yet.</p>
        <p className="text-base leading-base mb-24">Subscribe to our newsletter to receive updates.</p>
        <div className="flex flex-col gap-16 w-full">
          <TextInput
            name="footer-email"
            value={email}
            placeholder="Enter your email address..."
            onChange={(e) => setEmail(e.target.value)}
          />
          {subscribed ? (
            <div className="flex justify-center items-center bg-signal-green-30 text-center gap-8 px-24 py-8">
              <Image src="/icons/check.svg" alt="check" width={16} height={16} />
              <p className="text-base leading-base text-black-100">Subscribed to newsletter successfully!</p>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <Button CTA="Subscribe" style="tertiary" disabled={subscribed} onClick={handleClick} svg />
              {errorMessage && (
                <p className="text-base leading-base text-center text-signal-red-100 mt-8">{errorMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Discounts;
