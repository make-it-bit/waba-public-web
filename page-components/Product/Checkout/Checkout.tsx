'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { TextInput, NumberInput } from '@/gui-components/client';
import { CheckoutButton } from '@/components';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const Checkout = ({ mainInfoData }) => {
  const [paymentForm, setPaymentForm] = useState({
    quantity: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postalCode: '',
  });
  const [inputErrors, setInputErrors] = useState({
    quantity: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postalCode: '',
  });
  const [initCheckoutError, setInitCheckoutError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) : value }));
  };

  return (
    <>
      <NumberInput
        label="Quantity"
        name="quantity"
        value={paymentForm.quantity}
        minValue={0}
        onChange={(e) => handleChange(e)}
        errorMessage={inputErrors.quantity}
      />
      <div className="flex flex-col gap-8 mt-24">
        <TextInput
          name="firstName"
          value={paymentForm.firstName}
          placeholder="First name"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.firstName}
        />
        <TextInput
          name="lastName"
          value={paymentForm.lastName}
          placeholder="Last name"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.lastName}
        />
        <TextInput
          name="email"
          value={paymentForm.email}
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.email}
        />
        <TextInput
          name="address"
          value={paymentForm.address}
          placeholder="Address"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.address}
        />
        <TextInput
          name="city"
          value={paymentForm.city}
          placeholder="Locality"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.city}
        />
        <TextInput
          name="region"
          value={paymentForm.region}
          placeholder="Region"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.region}
        />
        <TextInput
          name="country"
          value={paymentForm.country}
          placeholder="Country"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.country}
        />
        <TextInput
          name="postalCode"
          value={paymentForm.postalCode}
          placeholder="Postal code"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.postalCode}
        />
      </div>
      <div className="flex flex-wrap gap-16 mt-16">
        <div className="flex flex-col items-center gap-8 grow-1">
          <CheckoutButton
            CTA={mainInfoData.button_1.href_text}
            paymentForm={paymentForm}
            setInputErrors={setInputErrors}
            setInitCheckoutError={setInitCheckoutError}
          />
          <div className="flex justify-center items-center gap-2 lg:w-auto w-full">
            <p className="text-xs leading-xs">powered by</p>
            <Image
              src={getImageFullUrl_client(mainInfoData.powered_by_logos.data[0])}
              width={35}
              height={21}
              quality={100}
              alt="stripe"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 grow-1">
          <CheckoutButton
            CTA={mainInfoData.button_2.href_text}
            style="tertiary"
            paymentForm={paymentForm}
            setInputErrors={setInputErrors}
            setInitCheckoutError={setInitCheckoutError}
          />
          <div className="flex justify-center items-center gap-2 lg:w-auto w-full">
            <p className="text-xs leading-xs">powered by</p>
            <Image
              src={getImageFullUrl_client(mainInfoData.powered_by_logos.data[1])}
              width={45}
              height={13}
              quality={100}
              alt="klarna"
            />
          </div>
        </div>
      </div>
      {initCheckoutError && (
        <>
          <p className="text-xs text-center leading-xs text-signal-red-100 mt-8">
            {initCheckoutError} Please contact us via{' '}
            <a className="underline" href="mailto:info@wabaskin.com">
              info@wabaskin.com
            </a>
          </p>
        </>
      )}
    </>
  );
};

export default Checkout;
