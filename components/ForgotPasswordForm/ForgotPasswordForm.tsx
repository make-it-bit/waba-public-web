'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { handleSendPasswordResetEmail } from '@/lib/auth';
import { regex } from '@/utils/authValidation';

import { TextInput, Button } from '@/gui-components/client';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    try {
      setSending(true);
      if (email === '') {
        setSending(false);
        return setErrorMessage('Please enter your email.');
      } else if (!regex.test(email)) {
        setSending(false);
        return setErrorMessage('Please enter a valid email.');
      } else {
        await handleSendPasswordResetEmail(email);
        setSending(false);
        setSent(true);
      }
    } catch (error) {
      console.log('error: ', error);
      setSending(false);
      if (error.code === 'auth/invalid-credential') return setErrorMessage('Invalid email or password. Try again.');
      else if (error.code === 'auth/user-not-found') return setErrorMessage('User not found. Try again.');
      else setErrorMessage('Failed to sign in. Try again later.');
      return;
    }
  };

  return (
    <div className="flex flex-col bg-supplementary-warm-gray justify-center text-center my-168 p-32">
      {sent ? (
        <>
          <h1 className="font-rufina text-4xl leading-4xl">Check your email!</h1>
          <Link href="/auth" className="underline">
            <p className="text-xl leading-xl mt-16">Back to signing in!</p>
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-rufina text-4xl leading-4xl cursor-pointer">Reset your password:</h1>
          <p className="text-sm leading-sm text-black-60 mt-8 mb-32">
            Please enter your email address. If you have a registered account, we will send you an authorization link by
            email: click on the authorization link and get a new password. Please note that the authorization link
            expires after 1h!
          </p>
          <TextInput
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => {
              setErrorMessage('');
              setEmail(e.target.value);
            }}
          />
          <div className="mt-16"></div>
          <div className="contents w-full justify-center">
            <Button CTA={sending ? 'SENDING...' : 'SEND'} onClick={handleClick} disabled={sending} svg />
          </div>
          {errorMessage && <p className="text-signal-red-100 text-sm leading-sm text-center mt-16">{errorMessage}</p>}
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
