'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { GetAuthenticatedUser } from '@/lib/auth';

import { TextInput, Button } from '@/gui-components/client';

const ProfileSettingsForm = () => {
  const user = GetAuthenticatedUser();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    street: '',
    postalCode: '',
  });
  const [updated, setUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await fetch(`/api/users/${user.uid}`);
        const { data } = await response.json();
        if (data) {
          setForm({
            ...form,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || '',
            country: data.country || '',
            city: data.city || '',
            street: data.street || '',
            postalCode: data.postalCode || '',
          });
        }
      }
    };

    fetchData();
  }, [user !== null && user !== false]);

  const handleClick = async () => {
    if (user) {
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const response = await fetch(`/api/users/${user.uid}`, {
        method: 'PUT',
        body: formData,
      });
      // TODO: if name or email changes, it should change in the authentication section as well
      if (response.status === 200) {
        setUpdated(true);
        setErrorMessage('');
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      } else {
        setErrorMessage('Something went wrong when updating profile settings. Please try again later.');
      }
    }
  };

  // TODO: add password change functionality

  return (
    <div className="flex flex-col gap-64">
      <div className="flex flex-col gap-24">
        <div className="flex gap-24">
          <TextInput
            name="firstName"
            value={form.firstName}
            placeholder="First name..."
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <TextInput
            name="lastName"
            value={form.lastName}
            placeholder="Last name..."
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="flex gap-24">
          <TextInput
            name="email"
            value={form.email}
            placeholder="Email..."
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextInput
            name="phoneNumber"
            value={form.phoneNumber}
            placeholder="Phone number..."
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-24">
        <div className="flex gap-24">
          <TextInput
            name="country"
            value={form.country}
            placeholder="Country..."
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
          <TextInput
            name="city"
            value={form.city}
            placeholder="City..."
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <div className="flex gap-24">
          <TextInput
            name="street"
            value={form.street}
            placeholder="Street..."
            onChange={(e) => setForm({ ...form, street: e.target.value })}
          />
          <TextInput
            name="postalCode"
            value={form.postalCode}
            placeholder="Postal code..."
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          />
        </div>
      </div>
      {updated ? (
        <div className="flex justify-center items-center bg-signal-green-30 text-center gap-8 px-24 py-8">
          <Image src="/icons/check.svg" alt="check" width={16} height={16} />
          <p className="text-base leading-base text-black-100">Profile settings updated successfully!</p>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <Button CTA="Update profile settings" onClick={handleClick} />
          {errorMessage && (
            <p className="text-base leading-base text-center text-signal-red-100 mt-8">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsForm;
