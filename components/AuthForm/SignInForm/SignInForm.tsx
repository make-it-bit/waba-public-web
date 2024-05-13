'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { signInValidation } from '@/utils/authValidation';

import { TextInput, Button } from '@/gui-components/client';
import { handleSignIn } from '@/lib/auth';

const SignInForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    try {
      setSigningIn(true);
      const formCheck = signInValidation(form, setErrorMessage);
      if (formCheck) {
        await handleSignIn(form.email, form.password);
        router.push('/profile');
      } else {
        setSigningIn(false);
        return;
      }
    } catch (error) {
      console.log('error: ', error);
      setSigningIn(false);
      if (error.code === 'auth/invalid-credential') return setErrorMessage('Invalid email or password. Try again.');
      else if (error.code === 'auth/user-not-found') return setErrorMessage('User not found. Try again.');
      else setErrorMessage('Failed to sign in. Try again later.');
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-16 w-full">
        <TextInput
          name="email"
          value={form.email}
          placeholder="Enter your email"
          onChange={(e) => {
            setErrorMessage('');
            setForm({ ...form, email: e.target.value });
          }}
        />
        <TextInput
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter your password"
          onChange={(e) => {
            setErrorMessage('');
            setForm({ ...form, password: e.target.value });
          }}
        />
      </div>
      <div className="inline-flex justify-end">
        <Link href="/forgot-password" className="mt-8 mb-32">
          <p className="text-sm leading-sm font-bold text-right">Forgot your password?</p>
        </Link>
      </div>
      <div className="contents w-full justify-center">
        <Button CTA={signingIn ? 'SIGNING IN...' : 'SIGN IN'} onClick={handleClick} disabled={signingIn} svg />
      </div>
      {errorMessage && <p className="text-signal-red-100 text-sm leading-sm text-center mt-8">{errorMessage}</p>}
    </div>
  );
};

export default SignInForm;
