'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { CustomRadioButton } from '@/gui-components/server';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthForm = () => {
  const [chosenButton, setChosenButton] = useState('sign-in');

  return (
    <div className="flex flex-col bg-supplementary-warm-gray h-624 my-128">
      <div className="flex">
        <div className="grid grid-cols-12 w-full">
          <div
            className={classNames(
              'col-span-6 py-24 text-center cursor-pointer',
              chosenButton === 'sign-in' ? 'border-x border-t border-black-100' : 'border-b border-black-100'
            )}
          >
            <CustomRadioButton
              CTA="Sign in"
              id="sign-in"
              name="sign-in"
              value="sign-in"
              checked={chosenButton === 'sign-in'}
              onChange={() => setChosenButton('sign-in')}
            />
          </div>
          <div
            className={classNames(
              'col-span-6 py-24 text-center cursor-pointer',
              chosenButton === 'sign-up' ? 'border-x border-t border-black-100' : 'border-b border-black-100'
            )}
          >
            <CustomRadioButton
              CTA="Sign up"
              id="sign-up"
              name="sign-up"
              value="sign-up"
              checked={chosenButton === 'sign-up'}
              onChange={() => setChosenButton('sign-up')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between px-112 pt-56 h-full border-x border-b border-black-100">
        {chosenButton === 'sign-in' ? <SignInForm /> : <SignUpForm />}
        <p className="text-sm leading-sm text-center mt-8 mb-24">
          By logging in or signing up, you agree with our{' '}
          <Link href="/terms" className="underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
