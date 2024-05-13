'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { handleSignUp } from '@/lib/auth';
import { signUpValidation } from '@/utils/authValidation';

import { TextInput, Button } from '@/gui-components/client';

const SignUpForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [signingUp, setSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    try {
      setSigningUp(true);
      const formCheck = signUpValidation(form, setErrorMessage);
      if (formCheck) {
        const {
          user: { uid },
        } = await handleSignUp(form.email, form.password);
        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('email', form.email);
        formData.append('phoneNumber', form.phoneNumber);
        await fetch('/api/users', {
          method: 'POST',
          body: formData,
        });
        router.push('/profile');
        return;
      } else {
        setSigningUp(false);
        return;
      }
    } catch (error) {
      setSigningUp(false);
      if (error.code === 'auth/invalid-email') return setErrorMessage('Invalid email address.');
      else if (error.code === 'auth/email-already-in-use') return setErrorMessage('Invalid email address.');
      else if (error.code === 'auth/weak-password') return setErrorMessage('Password should be at least 6 characters.');
      else setErrorMessage('Failed to sign up. Try again later.');
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-16 w-full mb-32">
        <TextInput
          name="firstName"
          value={form.firstName}
          placeholder="Enter your first name *"
          onChange={(e) => {
            setErrorMessage('');
            setForm({ ...form, firstName: e.target.value });
          }}
        />
        <TextInput
          name="lastName"
          value={form.lastName}
          placeholder="Enter your last name *"
          onChange={(e) => {
            setErrorMessage('');
            setForm({ ...form, lastName: e.target.value });
          }}
        />
        <TextInput
          name="email"
          value={form.email}
          placeholder="Enter your email *"
          onChange={(e) => {
            setErrorMessage('');
            setForm({ ...form, email: e.target.value });
          }}
        />
        <TextInput
          name="phoneNumber"
          value={form.phoneNumber}
          placeholder="Enter your phone number"
          onChange={(e) => {
            setErrorMessage('');
            setForm({ ...form, phoneNumber: e.target.value });
          }}
        />
        <TextInput
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter your password *"
          onChange={(e) => {
            setErrorMessage('');
            setForm({ ...form, password: e.target.value });
          }}
        />
      </div>
      <div className="contents w-full justify-center">
        <Button CTA={signingUp ? 'SIGNING UP...' : 'SIGN UP'} onClick={handleClick} disabled={signingUp} svg />
      </div>
      {errorMessage && <p className="text-signal-red-100 text-sm leading-sm text-center mt-8">{errorMessage}</p>}
    </div>
  );
};

export default SignUpForm;
